"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewRenderer = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_data_1 = require("./render-data");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
const zogra_renderer_4 = require("zogra-renderer");
const zogra_renderer_5 = require("zogra-renderer");
const debug_layer_1 = require("./debug-layer");
class PreviewRenderer {
    constructor(renderer) {
        this.materialReplaceMap = new Map();
        this.debugLayer = new debug_layer_1.DebugLayerRenderer();
        this.renderer = renderer;
        const lineColor = zogra_renderer_2.rgba(1, 1, 1, 0.1);
        const lb = new zogra_renderer_4.LineBuilder(0, renderer.gl);
        const Size = 10;
        const Grid = 1;
        for (let i = -Size; i <= Size; i += Grid) {
            lb.addLine([
                zogra_renderer_5.vec3(i, 0, -Size),
                zogra_renderer_5.vec3(i, 0, Size),
            ], lineColor);
            lb.addLine([
                zogra_renderer_5.vec3(-Size, 0, i),
                zogra_renderer_5.vec3(Size, 0, i)
            ], lineColor);
        }
        this.grid = lb.toLines();
    }
    render(context, cameras) {
        for (let i = 0; i < cameras.length; i++) {
            const data = new render_data_1.RenderData(cameras[i], context.scene);
            this.renderCamera(context, data);
        }
    }
    setupLight(context, data) {
        context.renderer.setGlobalUniform("uLightDir", "vec3", zogra_renderer_5.vec3(-1, 1, 0).normalize());
        context.renderer.setGlobalUniform("uAmbientSky", "color", zogra_renderer_2.rgb(.2, .2, .2));
        context.renderer.setGlobalUniform("uLightPos", "vec3", data.camera.position);
        context.renderer.setGlobalUniform("uLightColor", "color", zogra_renderer_2.rgb(.8, .8, .8));
    }
    renderCamera(context, data) {
        context.renderer.clear(zogra_renderer_2.rgb(.3, .3, .3), true);
        const camera = data.camera;
        camera.__preRender(context);
        if (camera.output === zogra_renderer_3.RenderTarget.CanvasTarget)
            context.renderer.setRenderTarget(zogra_renderer_3.RenderTarget.CanvasTarget);
        else
            context.renderer.setRenderTarget(camera.output);
        context.renderer.clear(camera.clearColor, camera.clearDepth);
        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        context.renderer.setGlobalUniform("uCameraPos", "vec3", camera.position);
        this.setupLight(context, data);
        const objs = data.getVisibleObjects(render_data_1.RenderOrder.NearToFar);
        for (const obj of objs) {
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
        // this.debugLayer.render(context, data);
        this.renderGrid(context, data);
        camera.__postRender(context);
    }
    renderGrid(context, data) {
        this.renderer.drawLines(this.grid, zogra_renderer_1.mat4.identity(), this.renderer.assets.materials.ColoredLine);
    }
    drawWithMaterial(mesh, transform, material) {
        if (this.materialReplaceMap.has(material.constructor))
            this.renderer.drawMesh(mesh, transform, this.materialReplaceMap.get(material.constructor));
        else
            this.renderer.drawMesh(mesh, transform, material);
    }
    replaceMaterial(MaterialType, material) {
        this.materialReplaceMap.set(MaterialType, material);
    }
}
exports.PreviewRenderer = PreviewRenderer;
//# sourceMappingURL=preview-renderer.js.map