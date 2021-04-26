"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default2DRenderPipeline = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_data_1 = require("./render-data");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
const zogra_renderer_4 = require("zogra-renderer");
const debug_layer_1 = require("./debug-layer");
const global_1 = require("zogra-renderer/dist/core/global");
const _2d_light_pass_1 = require("./2d-light-pass");
const draw_scene_1 = require("./draw-scene");
const post_process_1 = require("./post-process");
const final_blit_1 = require("./final-blit");
const clear_pass_1 = require("./clear-pass");
class Default2DRenderPipeline {
    constructor() {
        this.msaa = 4;
        this.renderFormat = zogra_renderer_1.TextureFormat.RGBA8;
        this.debuglayer = new debug_layer_1.DebugLayerRenderer();
        this.ambientLightColor = new zogra_renderer_2.Color(1, 1, 1, 1);
        this.ambientIntensity = 0.2;
        this.perCameraResources = new Map();
        global_1.Debug(this.debuglayer);
    }
    render(context, scene, cameras) {
        for (const camera of cameras) {
            const resource = this.getCameraResources(context, camera);
            const data = render_data_1.RenderData.create(camera, scene, resource.outputFBO);
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
            const fbo = new zogra_renderer_3.FrameBuffer(context.renderer.canvas.width, context.renderer.canvas.height);
            const renderbuffer = new zogra_renderer_1.RenderBuffer(fbo.width, fbo.height, this.renderFormat, this.msaa);
            fbo.addColorAttachment(renderbuffer);
            const rt0 = new zogra_renderer_4.RenderTexture(context.renderer.canvas.width, context.renderer.canvas.height, false, this.renderFormat, zogra_renderer_1.FilterMode.Linear);
            const rt1 = new zogra_renderer_4.RenderTexture(context.renderer.canvas.width, context.renderer.canvas.height, false, this.renderFormat, zogra_renderer_1.FilterMode.Linear);
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
            new clear_pass_1.ClearPass(),
            new draw_scene_1.DrawScene(render_data_1.RenderOrder.FarToNear),
            new _2d_light_pass_1.Light2DPass(context, this),
            new post_process_1.PostprocessPass(context, this.renderFormat),
            new final_blit_1.FinalBlit(context, this.renderFormat),
        ];
    }
}
exports.Default2DRenderPipeline = Default2DRenderPipeline;
//# sourceMappingURL=2d-default.js.map