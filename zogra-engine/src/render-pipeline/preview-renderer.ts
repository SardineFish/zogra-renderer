import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera, Scene } from "../engine";
import { Debug, DepthBuffer, FilterMode, mat4, MSAASamples, RenderBuffer, TextureFormat } from "zogra-renderer";
import { ZograRenderer, Material, Mesh } from "zogra-renderer";
import { RenderData, RenderOrder } from "./render-data";
import { rgba, rgb } from "zogra-renderer";
import { FrameBuffer } from "zogra-renderer";
import { RenderTexture } from "zogra-renderer";
import { Lines, LineBuilder } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { DebugLayerRenderer } from "./render-pass/debug-layer";
import { GridRenderer } from "./render-pass/grid";

export class PreviewRenderer implements ZograRenderPipeline
{
    msaa: MSAASamples = 4;
    renderer: ZograRenderer;
    materialReplaceMap = new Map<Function, Material>();
    debugLayer = new DebugLayerRenderer();
    grid = new GridRenderer();
    cameraOutputFBOs = new Map<Camera, FrameBuffer>();
    cameraOutputTextures = new Map<Camera, RenderTexture>();

    constructor(renderer: ZograRenderer)
    {
        this.renderer = renderer;

        Debug(this.debugLayer);
    }
    render(context: RenderContext, scene: Scene, cameras: Camera[])
    {
        for (let i = 0; i < cameras.length; i++)
        {
            const data = RenderData.create(cameras[i], scene, this.getFramebuffer(context, cameras[i]));
            this.renderCamera(context, data);
        }
    }

    setupLight(context: RenderContext, data: RenderData)
    {
        context.renderer.setGlobalUniform("uLightDir", "vec4[]", [data.camera.position.toVec4(1)]);
        context.renderer.setGlobalUniform("uLightCount", "int", 1);
        context.renderer.setGlobalUniform("uAmbientSky", "color", rgb(.2, .2, .2));
        context.renderer.setGlobalUniform("uLightColor", "color[]", [rgb(.8, .8, .8)]);
    }

    renderCamera(context: RenderContext, data: RenderData)
    {
        // context.renderer.clear(rgb(.3, .3, .3), true);

        

        const camera = data.camera;
        camera.__preRender(context);

        context.renderer.setFramebuffer(data.cameraOutput);
        context.renderer.clear(camera.clearColor, camera.clearDepth);

        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        context.renderer.setGlobalUniform("uCameraPos", "vec3", camera.position.clone());


        this.setupLight(context, data);
        
        const objs = data.getVisibleObjects(RenderOrder.NearToFar);
        for (const obj of objs)
        {
            obj.render(context, data);
            // const modelMatrix = obj.localToWorldMatrix;

            // for (let i = 0; i < obj.meshes.length; i++)
            // {
            //     if (!obj.meshes[i])
            //         continue;
            //     const mat = obj.materials[i] || context.renderer.assets.materials.default;
            //     this.drawWithMaterial(obj.meshes[i], modelMatrix, mat);
            // }
        }
        

        this.grid.render(context, data);
        this.debugLayer.render(context, data);

        this.finalBlit(context, data);
        // context.renderer.blitCopy(data.cameraOutput.colorAttachments[0] as RenderBuffer, camera.output);

        camera.__postRender(context);
    }

    finalBlit(context: RenderContext, data: RenderData)
    {
        const camera = data.camera;
        let tex = this.cameraOutputTextures.get(camera);
        if (!tex)
        {
            tex = new RenderTexture(
                data.camera.output?.width ?? context.renderer.canvasSize.x,
                data.camera.output?.height ?? context.renderer.canvasSize.y,
                false,
                TextureFormat.RGBA,
                FilterMode.Linear
            );
            this.cameraOutputTextures.set(camera, tex);
        }
        context.renderer.blitCopy(data.cameraOutput.colorAttachments[0] as RenderBuffer, tex);
        context.renderer.blit(tex, FrameBuffer.CanvasBuffer);

    }

    drawWithMaterial(mesh: Mesh, transform: Readonly<mat4>, material: Material)
    {
        if (this.materialReplaceMap.has(material.constructor))
            this.renderer.drawMesh(mesh, transform, this.materialReplaceMap.get(material.constructor) as Material);
        else
            this.renderer.drawMesh(mesh, transform, material);
    }

    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void
    {
        this.materialReplaceMap.set(MaterialType, material);
    }
    
    getFramebuffer(context: RenderContext, camera: Camera)
    {
        let fbo = this.cameraOutputFBOs.get(camera);
        if (!fbo)
        {
            fbo = new FrameBuffer(context.renderer.canvas.width, context.renderer.canvas.height);
            const renderbuffer = new RenderBuffer(fbo.width, fbo.height, TextureFormat.RGBA8, this.msaa);
            const depthBuffer = new DepthBuffer(fbo.width, fbo.height, this.msaa);
            fbo.addColorAttachment(renderbuffer);
            fbo.setDepthAttachment(depthBuffer);
            this.cameraOutputFBOs.set(camera, fbo);
        }
        return fbo;
    }

}