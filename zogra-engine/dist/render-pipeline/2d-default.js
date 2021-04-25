"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default2DRenderPipeline = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_data_1 = require("./render-data");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
const zogra_renderer_4 = require("zogra-renderer");
const zogra_renderer_5 = require("zogra-renderer");
const debug_layer_1 = require("./debug-layer");
const global_1 = require("zogra-renderer/dist/core/global");
const _2d_1 = require("../2d");
class Default2DRenderPipeline {
    constructor() {
        this.msaa = 4;
        this.renderFormat = zogra_renderer_1.TextureFormat.RGBA8;
        this.debuglayer = new debug_layer_1.DebugLayerRenderer();
        this.light2DComposeMaterial = new _2d_1.Light2DCompose();
        this.ambientLightColor = new zogra_renderer_2.Color(0.2, 0.2, 0.2, 1);
        this.perCameraResources = new Map();
        global_1.Debug(this.debuglayer);
    }
    render(context, scene, cameras) {
        for (const camera of cameras) {
            const resource = this.getCameraResources(context, camera);
            const data = new render_data_1.RenderData(camera, resource.outputFBO, scene);
            this.renderCamera(context, data);
        }
    }
    replaceMaterial(MaterialType, material) {
        throw new Error("Method not implemented.");
    }
    renderCamera(context, data) {
        const camera = data.camera;
        camera.__preRender(context);
        context.renderer.setFramebuffer(data.cameraOutput);
        context.renderer.clear(camera.clearColor, camera.clearDepth);
        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        // context.renderer.setGlobalUniform("uCameraPos", "vec3", camera.position);
        const objs = data.getVisibleObjects(render_data_1.RenderOrder.FarToNear);
        for (const obj of objs) {
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
    postprocess(context, data) {
        var _a;
        const camera = data.camera;
        const resource = this.getCameraResources(context, camera);
        const [src, dst] = resource.postprocessFBOs;
        context.renderer.blitCopy(resource.outputBuffer, src.colorAttachments[0]);
        context.renderer.blit(src.colorAttachments[0], (_a = camera.output) !== null && _a !== void 0 ? _a : zogra_renderer_3.FrameBuffer.CanvasBuffer);
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
            };
            this.perCameraResources.set(camera, resource);
        }
        return resource;
    }
    prepareLights(context, data) {
        const lightList = data.scene.getEntitiesOfType(_2d_1.Light2D);
        for (let i = 0; i < this.light2DComposeMaterial.lightParamsList.length; i++)
            this.light2DComposeMaterial.lightParamsList[i].fill(0);
        for (let i = 0; i < lightList.length; i++) {
            const light = lightList[i];
            this.light2DComposeMaterial.lightPosList[i] = this.light2DComposeMaterial.lightPosList[i] || zogra_renderer_5.vec4.zero();
            zogra_renderer_5.vec4.set(this.light2DComposeMaterial.lightPosList[i], light.position);
            this.light2DComposeMaterial.lightPosList[i].w = 1;
            this.light2DComposeMaterial.lightParamsList[i] = this.light2DComposeMaterial.lightParamsList[i] || zogra_renderer_5.vec4.zero();
            this.light2DComposeMaterial.lightParamsList[i].x = light.volumnRadius;
            this.light2DComposeMaterial.lightParamsList[i].y = light.lightRange;
            this.light2DComposeMaterial.lightParamsList[i].z = light.attenuation;
            this.light2DComposeMaterial.lightParamsList[i].w = light.intensity;
            this.light2DComposeMaterial.lightColorList[i] = this.light2DComposeMaterial.lightColorList[i] || zogra_renderer_2.Color.white;
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
exports.Default2DRenderPipeline = Default2DRenderPipeline;
//# sourceMappingURL=2d-default.js.map