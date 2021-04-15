"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default2DRenderPipeline = void 0;
const render_data_1 = require("./render-data");
const zogra_renderer_1 = require("zogra-renderer");
const debug_layer_1 = require("./debug-layer");
class Default2DRenderPipeline {
    constructor() {
        this.debuglayer = new debug_layer_1.DebugLayerRenderer();
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
        if (camera.output === zogra_renderer_1.RenderTarget.CanvasTarget)
            context.renderer.setRenderTarget(zogra_renderer_1.RenderTarget.CanvasTarget);
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
        // this.debuglayer.render(context, data);
        camera.__postRender(context);
    }
}
exports.Default2DRenderPipeline = Default2DRenderPipeline;
//# sourceMappingURL=2d-default.js.map