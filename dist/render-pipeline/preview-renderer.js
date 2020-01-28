"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mat4_1 = require("../types/mat4");
const render_data_1 = require("./render-data");
const color_1 = require("../types/color");
const render_target_1 = require("../core/render-target");
const lines_1 = require("../core/lines");
const vec3_1 = require("../types/vec3");
class PreviewRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        const lb = new lines_1.LineBuilder(0, renderer.gl);
        const Size = 10;
        const Grid = 1;
        for (let i = -Size; i <= Size; i += Grid) {
            lb.addLine([
                vec3_1.vec3(i, 0, -Size),
                vec3_1.vec3(i, 0, Size),
            ]);
            lb.addLine([
                vec3_1.vec3(-Size, 0, i),
                vec3_1.vec3(Size, 0, i)
            ]);
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
        context.renderer.setGlobalUniform("uLightPos", "vec3", data.camera.position);
        context.renderer.setGlobalUniform("uLightColor", "color", color_1.Color.white);
    }
    renderCamera(context, data) {
        const camera = data.camera;
        var mat = mat4_1.mat4;
        if (camera.output === render_target_1.RenderTarget.CanvasTarget)
            context.renderer.setRenderTarget(render_target_1.RenderTarget.CanvasTarget);
        else
            context.renderer.setRenderTarget(camera.output);
        context.renderer.clear(camera.clearColor, camera.clearDepth);
        context.renderer.viewProjectionMatrix = camera.viewProjectionMatrix;
        this.setupLight(context, data);
        const objs = data.getVisibleObjects(render_data_1.RenderOrder.NearToFar);
        for (const obj of objs) {
            const modelMatrix = obj.localToWorldMatrix;
            for (const mesh of obj.meshes) {
                context.renderer.drawMesh(mesh, modelMatrix, obj.material);
            }
        }
        this.renderGrid(context, data);
    }
    renderGrid(context, data) {
        this.renderer.drawLines(this.grid, mat4_1.mat4.identity(), this.renderer.assets.materials.ColoredLine);
    }
}
exports.PreviewRenderer = PreviewRenderer;
//# sourceMappingURL=preview-renderer.js.map