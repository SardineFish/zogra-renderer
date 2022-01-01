import { ZograRenderPipeline, RenderContext, MaterialReplacer } from "./render-pipeline";
import { Camera, Projection, Scene } from "../engine";
import { FilterMode, mat4, RenderBuffer, TextureFormat, TextureResizing, vec2, Debug } from "zogra-renderer";
import { ZograRenderer, Material, Mesh, MSAASamples } from "zogra-renderer";
import { RenderObject } from "../engine";
import { Entity } from "../engine";
import { RenderData, RenderOrder } from "./render-data";
import { Color, rgba, rgb } from "zogra-renderer";
import { FrameBuffer } from "zogra-renderer";
import { RenderTexture } from "zogra-renderer";
import { Lines, LineBuilder } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { mul } from "zogra-renderer";
import { vec4 } from "zogra-renderer";
import { DebugLayerRenderer } from "./render-pass/debug-layer";
import { Light2D } from "../2d";
import { RenderPass } from "./render-pass/render-pass";
import { Light2DPass } from "./render-pass/2d-light-pass";
import { DrawScene } from "./render-pass/draw-scene";
import { PostprocessPass } from "./post-process";
import { FinalBlit } from "./render-pass/final-blit";
import { ClearPass } from "./render-pass/clear-pass";

interface CameraRenderResources
{
    outputFBO: FrameBuffer,
    outputBuffer: RenderBuffer,
    renderPass: RenderPass[];
}

export class Default2DRenderPipeline implements ZograRenderPipeline
{
    msaa: MSAASamples = 4;
    renderFormat: TextureFormat = TextureFormat.RGBA8;
    debuglayer = new DebugLayerRenderer();
    ambientLightColor: Color = new Color(1, 1, 1, 1);
    ambientIntensity: number = 1;
    perCameraResources = new Map<Camera, CameraRenderResources>();

    constructor()
    {
        Debug(this.debuglayer);
    }

    render(context: RenderContext, scene: Scene, cameras: Camera[]): void
    {
        for (const camera of cameras)
        {
            const resource = this.getCameraResources(context, camera);
            const data = RenderData.create(camera, scene, resource.outputFBO);
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
        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);

        const resource = this.getCameraResources(context, camera);
        for (const pass of resource.renderPass)
        {
            pass.setup(context, data);
            pass.render(context, data);
        }
        for (const pass of resource.renderPass)
        {
            pass.cleanup(context, data);
        }

        this.debuglayer.render(context, data);
        camera.__postRender(context);
    }

    getCameraResources(context: RenderContext, camera: Camera)
    {
        let resource = this.perCameraResources.get(camera);
        if (!resource)
        {
            const fbo = new FrameBuffer(context.renderer.canvas.width, context.renderer.canvas.height);
            const renderbuffer = new RenderBuffer(fbo.width, fbo.height, this.renderFormat, this.msaa);
            fbo.addColorAttachment(renderbuffer);

            resource = {
                outputFBO: fbo,
                outputBuffer: renderbuffer,
                renderPass: this.createRenderPass(context, camera),
            };

            this.perCameraResources.set(camera, resource);
        }

        const size = camera.output === null
            ? vec2(context.screen.width, context.screen.height)
            : camera.output.size;
        
        if (!size.equals(resource.outputFBO.size))
        {
            console.log("resize", resource.outputFBO.size, size);
            const fbo = (resource.outputFBO.colorAttachments[0] as RenderBuffer).resize(size.x, size.y);

            resource.outputFBO.reset(size.x, size.y);
            resource.outputFBO.addColorAttachment(fbo, 0);
        }
        return resource;
    }

    createRenderPass(context: RenderContext, camera: Camera)
    {
        return [
            new ClearPass(),
            new DrawScene(RenderOrder.FarToNear),
            new Light2DPass(context, this),
            new PostprocessPass(context, this.renderFormat),
            new FinalBlit(context, this.renderFormat),
        ]
    }

}