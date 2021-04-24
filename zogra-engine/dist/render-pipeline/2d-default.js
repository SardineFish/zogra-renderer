"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default2DRenderPipeline = void 0;
const render_data_1 = require("./render-data");
const zogra_renderer_1 = require("zogra-renderer");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
const debug_layer_1 = require("./debug-layer");
const global_1 = require("zogra-renderer/dist/core/global");
const _2d_1 = require("../2d");
class Default2DRenderPipeline {
    constructor() {
        this.debuglayer = new debug_layer_1.DebugLayerRenderer();
        this.light2DComposeMaterial = new _2d_1.Light2DCompose();
        this.ambientLightColor = new zogra_renderer_1.Color(0.2, 0.2, 0.2, 1);
        global_1.Debug(this.debuglayer);
    }
    render(renderer, cameras) {
        for (const camera of cameras) {
            const data = new render_data_1.RenderData(camera, renderer.scene);
            this.renderCamera(renderer, data);
        }
    }
    replaceMaterial(MaterialType, material) {
        throw new Error("Method not implemented.");
    }
    renderCamera(context, data) {
        const camera = data.camera;
        camera.__preRender(context);
        if (camera.output === zogra_renderer_2.RenderTarget.CanvasTarget)
            context.renderer.setRenderTarget(zogra_renderer_2.RenderTarget.CanvasTarget);
        else
            context.renderer.setRenderTarget(camera.output);
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
        context.renderer.blit(null, zogra_renderer_2.RenderTarget.CanvasTarget, this.light2DComposeMaterial);
        this.debuglayer.render(context, data);
        camera.__postRender(context);
    }
    prepareLights(context, data) {
        const lightList = context.scene.getEntitiesOfType(_2d_1.Light2D);
        for (let i = 0; i < lightList.length; i++) {
            const light = lightList[i];
            this.light2DComposeMaterial.lightPosList[i] = this.light2DComposeMaterial.lightPosList[i] || zogra_renderer_3.vec4.zero();
            zogra_renderer_3.vec4.set(this.light2DComposeMaterial.lightPosList[i], light.position);
            this.light2DComposeMaterial.lightPosList[i].w = 1;
            this.light2DComposeMaterial.lightParamsList[i] = this.light2DComposeMaterial.lightParamsList[i] || zogra_renderer_3.vec4.zero();
            this.light2DComposeMaterial.lightParamsList[i].x = light.volumnRadius;
            this.light2DComposeMaterial.lightParamsList[i].y = light.lightRange;
            this.light2DComposeMaterial.lightParamsList[i].z = light.attenuation;
            this.light2DComposeMaterial.lightColorList[i] = this.light2DComposeMaterial.lightColorList[i] || zogra_renderer_1.Color.white;
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