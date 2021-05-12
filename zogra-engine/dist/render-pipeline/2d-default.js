import { FilterMode, RenderBuffer, TextureFormat } from "zogra-renderer";
import { RenderData, RenderOrder } from "./render-data";
import { Color } from "zogra-renderer";
import { FrameBuffer } from "zogra-renderer";
import { RenderTexture } from "zogra-renderer";
import { DebugLayerRenderer } from "./render-pass/debug-layer";
import { Debug } from "zogra-renderer/dist/core/global";
import { Light2DPass } from "./render-pass/2d-light-pass";
import { DrawScene } from "./render-pass/draw-scene";
import { PostprocessPass } from "./post-process";
import { FinalBlit } from "./render-pass/final-blit";
import { ClearPass } from "./render-pass/clear-pass";
export class Default2DRenderPipeline {
    constructor() {
        this.msaa = 4;
        this.renderFormat = TextureFormat.RGBA8;
        this.debuglayer = new DebugLayerRenderer();
        this.ambientLightColor = new Color(1, 1, 1, 1);
        this.ambientIntensity = 0.2;
        this.perCameraResources = new Map();
        Debug(this.debuglayer);
    }
    render(context, scene, cameras) {
        for (const camera of cameras) {
            const resource = this.getCameraResources(context, camera);
            const data = RenderData.create(camera, scene, resource.outputFBO);
            this.renderCamera(context, data);
        }
    }
    replaceMaterial(MaterialType, material) {
        throw new Error("Method not implemented.");
    }
    renderCamera(context, data) {
        const camera = data.camera;
        camera.__preRender(context);
        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        const resource = this.getCameraResources(context, camera);
        for (const pass of resource.renderPass) {
            pass.setup(context, data);
            pass.render(context, data);
        }
        for (const pass of resource.renderPass) {
            pass.cleanup(context, data);
        }
        this.debuglayer.render(context, data);
        camera.__postRender(context);
    }
    getCameraResources(context, camera) {
        let resource = this.perCameraResources.get(camera);
        if (!resource) {
            const fbo = new FrameBuffer(context.renderer.canvas.width, context.renderer.canvas.height);
            const renderbuffer = new RenderBuffer(fbo.width, fbo.height, this.renderFormat, this.msaa);
            fbo.addColorAttachment(renderbuffer);
            const rt0 = new RenderTexture(context.renderer.canvas.width, context.renderer.canvas.height, false, this.renderFormat, FilterMode.Linear);
            const rt1 = new RenderTexture(context.renderer.canvas.width, context.renderer.canvas.height, false, this.renderFormat, FilterMode.Linear);
            resource = {
                postprocessFBOs: [rt0.createFramebuffer(), rt1.createFramebuffer()],
                outputFBO: fbo,
                outputBuffer: renderbuffer,
                renderPass: this.createRenderPass(context, camera),
            };
            this.perCameraResources.set(camera, resource);
        }
        return resource;
    }
    createRenderPass(context, camera) {
        return [
            new ClearPass(),
            new DrawScene(RenderOrder.FarToNear),
            new Light2DPass(context, this),
            new PostprocessPass(context, this.renderFormat),
            new FinalBlit(context, this.renderFormat),
        ];
    }
}
//# sourceMappingURL=2d-default.js.map