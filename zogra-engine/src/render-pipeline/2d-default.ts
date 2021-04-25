import { ZograRenderPipeline, RenderContext, MaterialReplacer } from "./render-pipeline";
import { Camera, Projection, Scene } from "../engine/engine";
import { FilterMode, mat4, RenderBuffer, TextureFormat } from "zogra-renderer";
import { ZograRenderer, Material, Mesh, MSAASamples } from "zogra-renderer";
import { RenderObject } from "../engine/engine";
import { Entity } from "../engine/engine";
import { RenderData, RenderOrder } from "./render-data";
import { Color, rgba, rgb } from "zogra-renderer";
import { FrameBuffer } from "zogra-renderer";
import { RenderTexture } from "zogra-renderer";
import { Lines, LineBuilder } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { mul } from "zogra-renderer";
import { vec4 } from "zogra-renderer";
import { DebugLayerRenderer } from "./debug-layer";
import { Debug } from "zogra-renderer/dist/core/global";
import { Light2D, Light2DCompose } from "../2d";

interface CameraRenderResources
{
    outputFBO: FrameBuffer,
    outputBuffer: RenderBuffer,
    postprocessFBOs: [FrameBuffer, FrameBuffer];
}

export class Default2DRenderPipeline implements ZograRenderPipeline
{
    msaa: MSAASamples = 4;
    renderFormat: TextureFormat = TextureFormat.RGBA8;
    debuglayer = new DebugLayerRenderer();
    light2DComposeMaterial = new Light2DCompose();
    ambientLightColor: Color = new Color(0.2, 0.2, 0.2, 1);
    perCameraResources = new Map<Camera, CameraRenderResources>()

    constructor()
    {
        Debug(this.debuglayer);
    }

    render(context: RenderContext, scene: Scene, cameras: Camera[]): void
    {
        for (const camera of cameras)
        {
            const resource = this.getCameraResources(context, camera);
            const data = new RenderData(camera, resource.outputFBO, scene);
            this.renderCamera(context, data);
        }
    }
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void
    {
        throw new Error("Method not implemented.");
    }

    renderCamera(context: RenderContext, data: RenderData)
    {
        const camera = data.camera;
        camera.__preRender(context);

        context.renderer.setFramebuffer(data.cameraOutput);

        context.renderer.clear(camera.clearColor, camera.clearDepth);

        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        // context.renderer.setGlobalUniform("uCameraPos", "vec3", camera.position);

        const objs = data.getVisibleObjects(RenderOrder.FarToNear);
        for (const obj of objs)
        {
            obj.render(context, data);
            // const modelMatrix = obj.localToWorldMatrix;

            // for (let i = 0; i < obj.meshes.length; i++)
            // {
            //     if (!obj.meshes[i])
            //         continue;
            //     const mat = obj.materials[i] || context.renderer.assets.materials.default;
            //     mat.setProp("uCameraPos", "vec3", camera.position);
            //     context.renderer.drawMesh(obj.meshes[i], modelMatrix, mat);
            // }
        }

        this.prepareLights(context, data);
        context.renderer.blit(null, data.cameraOutput, this.light2DComposeMaterial);

        this.postprocess(context, data);

        this.debuglayer.render(context, data);
        camera.__postRender(context);
    }

    postprocess(context: RenderContext, data: RenderData)
    {
        const camera = data.camera;
        const resource = this.getCameraResources(context, camera);
        const [src, dst] = resource.postprocessFBOs;
        context.renderer.blitCopy(resource.outputBuffer, src.colorAttachments[0] as RenderTexture);
        context.renderer.blit(src.colorAttachments[0] as RenderTexture, camera.output ?? FrameBuffer.CanvasBuffer);
    }

    getCameraResources(context: RenderContext, camera: Camera)
    {
        let resource = this.perCameraResources.get(camera);
        if (!resource)
        {
            const fbo = new FrameBuffer(context.renderer.canvas.width, context.renderer.canvas.height);
            const renderbuffer = new RenderBuffer(fbo.width, fbo.height, this.renderFormat, this.msaa);
            fbo.addColorAttachment(renderbuffer);

            const rt0 = new RenderTexture(context.renderer.canvas.width, context.renderer.canvas.height, false, this.renderFormat, FilterMode.Linear);
            const rt1 = new RenderTexture(context.renderer.canvas.width, context.renderer.canvas.height, false, this.renderFormat, FilterMode.Linear);

            resource = {
                postprocessFBOs: [rt0.createFramebuffer(), rt1.createFramebuffer()],
                outputFBO: fbo,
                outputBuffer: renderbuffer,
            };

            this.perCameraResources.set(camera, resource);
        }
        return resource;
    }

    prepareLights(context: RenderContext, data: RenderData)
    {
        const lightList = data.scene.getEntitiesOfType(Light2D);
        for (let i = 0; i < this.light2DComposeMaterial.lightParamsList.length; i++)
            this.light2DComposeMaterial.lightParamsList[i].fill(0);
        for (let i = 0; i < lightList.length; i++)
        {
            const light = lightList[i];

            this.light2DComposeMaterial.lightPosList[i] = this.light2DComposeMaterial.lightPosList[i] || vec4.zero();
            vec4.set(this.light2DComposeMaterial.lightPosList[i], light.position as unknown as vec4);
            this.light2DComposeMaterial.lightPosList[i].w = 1;

            this.light2DComposeMaterial.lightParamsList[i] = this.light2DComposeMaterial.lightParamsList[i] || vec4.zero();
            this.light2DComposeMaterial.lightParamsList[i].x = light.volumnRadius;
            this.light2DComposeMaterial.lightParamsList[i].y = light.lightRange;
            this.light2DComposeMaterial.lightParamsList[i].z = light.attenuation;
            this.light2DComposeMaterial.lightParamsList[i].w = light.intensity;

            this.light2DComposeMaterial.lightColorList[i] = this.light2DComposeMaterial.lightColorList[i] || Color.white;
            this.light2DComposeMaterial.lightColorList[i].set(light.lightColor);

            this.light2DComposeMaterial.shadowMapList[i] = light.getShadowMap(context, data);
        }
        this.light2DComposeMaterial.lightCount = lightList.length;
        this.light2DComposeMaterial.cameraParams.x = data.camera.position.x;
        this.light2DComposeMaterial.cameraParams.y = data.camera.position.y;
        this.light2DComposeMaterial.cameraParams.z = data.camera.viewHeight * 2 * data.camera.aspectRatio;
        this.light2DComposeMaterial.cameraParams.w = data.camera.viewHeight * 2;
        this.light2DComposeMaterial.ambientLightColor = this.ambientLightColor;
    }

}