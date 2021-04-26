"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewRenderer = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_data_1 = require("./render-data");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
const zogra_renderer_4 = require("zogra-renderer");
const zogra_renderer_5 = require("zogra-renderer");
const zogra_renderer_6 = require("zogra-renderer");
const debug_layer_1 = require("./debug-layer");
class PreviewRenderer {
    constructor(renderer) {
        this.msaa = 4;
        this.materialReplaceMap = new Map();
        this.debugLayer = new debug_layer_1.DebugLayerRenderer();
        this.cameraOutputFBOs = new Map();
        this.cameraOutputTextures = new Map();
        this.renderer = renderer;
        const lineColor = zogra_renderer_2.rgba(1, 1, 1, 0.1);
        const lb = new zogra_renderer_5.LineBuilder(0, renderer.gl);
        const Size = 10;
        const Grid = 1;
        for (let i = -Size; i <= Size; i += Grid) {
            lb.addLine([
                zogra_renderer_6.vec3(i, 0, -Size),
                zogra_renderer_6.vec3(i, 0, Size),
            ], lineColor);
            lb.addLine([
                zogra_renderer_6.vec3(-Size, 0, i),
                zogra_renderer_6.vec3(Size, 0, i)
            ], lineColor);
        }
        this.grid = lb.toLines();
    }
    render(context, scene, cameras) {
        for (let i = 0; i < cameras.length; i++) {
            const data = render_data_1.RenderData.create(cameras[i], scene, this.getFramebuffer(context, cameras[i]));
            this.renderCamera(context, data);
        }
    }
    setupLight(context, data) {
        context.renderer.setGlobalUniform("uLightDir", "vec3", zogra_renderer_6.vec3(-1, 1, 0).normalize());
        context.renderer.setGlobalUniform("uAmbientSky", "color", zogra_renderer_2.rgb(.2, .2, .2));
        context.renderer.setGlobalUniform("uLightPos", "vec3", data.camera.position.clone());
        context.renderer.setGlobalUniform("uLightColor", "color", zogra_renderer_2.rgb(.8, .8, .8));
    }
    renderCamera(context, data) {
        // context.renderer.clear(rgb(.3, .3, .3), true);
        const camera = data.camera;
        camera.__preRender(context);
        context.renderer.setFramebuffer(data.cameraOutput);
        context.renderer.clear(camera.clearColor, camera.clearDepth);
        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        context.renderer.setGlobalUniform("uCameraPos", "vec3", camera.position.clone());
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
        this.finalBlit(context, data);
        // context.renderer.blitCopy(data.cameraOutput.colorAttachments[0] as RenderBuffer, camera.output);
        camera.__postRender(context);
    }
    finalBlit(context, data) {
        var _a, _b, _c, _d;
        const camera = data.camera;
        let tex = this.cameraOutputTextures.get(camera);
        if (!tex) {
            tex = new zogra_renderer_4.RenderTexture((_b = (_a = data.camera.output) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : context.renderer.canvasSize.x, (_d = (_c = data.camera.output) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : context.renderer.canvasSize.y, false, zogra_renderer_1.TextureFormat.RGBA, zogra_renderer_1.FilterMode.Linear);
            this.cameraOutputTextures.set(camera, tex);
        }
        context.renderer.blitCopy(data.cameraOutput.colorAttachments[0], tex);
        context.renderer.blit(tex, zogra_renderer_3.FrameBuffer.CanvasBuffer);
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
    getFramebuffer(context, camera) {
        let fbo = this.cameraOutputFBOs.get(camera);
        if (!fbo) {
            fbo = new zogra_renderer_3.FrameBuffer(context.renderer.canvas.width, context.renderer.canvas.height);
            const renderbuffer = new zogra_renderer_1.RenderBuffer(fbo.width, fbo.height, zogra_renderer_1.TextureFormat.RGBA8, this.msaa);
            fbo.addColorAttachment(renderbuffer);
            this.cameraOutputFBOs.set(camera, fbo);
        }
        return fbo;
    }
}
exports.PreviewRenderer = PreviewRenderer;
//# sourceMappingURL=preview-renderer.js.map