import { Debug, FilterMode, mat4, RenderBuffer, TextureFormat } from "zogra-renderer";
import { RenderData, RenderOrder } from "./render-data";
import { rgba, rgb } from "zogra-renderer";
import { FrameBuffer } from "zogra-renderer";
import { RenderTexture } from "zogra-renderer";
import { LineBuilder } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { DebugLayerRenderer } from "./render-pass/debug-layer";
export class PreviewRenderer {
    constructor(renderer) {
        this.msaa = 4;
        this.materialReplaceMap = new Map();
        this.debugLayer = new DebugLayerRenderer();
        this.cameraOutputFBOs = new Map();
        this.cameraOutputTextures = new Map();
        this.renderer = renderer;
        const lineColor = rgba(1, 1, 1, 0.1);
        const lb = new LineBuilder(0, renderer.gl);
        const Size = 10;
        const Grid = 1;
        for (let i = -Size; i <= Size; i += Grid) {
            lb.addLine([
                vec3(i, 0, -Size),
                vec3(i, 0, Size),
            ], lineColor);
            lb.addLine([
                vec3(-Size, 0, i),
                vec3(Size, 0, i)
            ], lineColor);
        }
        this.grid = lb.toLines();
        Debug(this.debugLayer);
    }
    render(context, scene, cameras) {
        for (let i = 0; i < cameras.length; i++) {
            const data = RenderData.create(cameras[i], scene, this.getFramebuffer(context, cameras[i]));
            this.renderCamera(context, data);
        }
    }
    setupLight(context, data) {
        context.renderer.setGlobalUniform("uLightDir", "vec3", vec3(-1, 1, 0).normalize());
        context.renderer.setGlobalUniform("uAmbientSky", "color", rgb(.2, .2, .2));
        context.renderer.setGlobalUniform("uLightPos", "vec3", data.camera.position.clone());
        context.renderer.setGlobalUniform("uLightColor", "color", rgb(.8, .8, .8));
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
        const objs = data.getVisibleObjects(RenderOrder.NearToFar);
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
        this.renderGrid(context, data);
        this.finalBlit(context, data);
        this.debugLayer.render(context, data);
        // context.renderer.blitCopy(data.cameraOutput.colorAttachments[0] as RenderBuffer, camera.output);
        camera.__postRender(context);
    }
    finalBlit(context, data) {
        var _a, _b, _c, _d;
        const camera = data.camera;
        let tex = this.cameraOutputTextures.get(camera);
        if (!tex) {
            tex = new RenderTexture((_b = (_a = data.camera.output) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : context.renderer.canvasSize.x, (_d = (_c = data.camera.output) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : context.renderer.canvasSize.y, false, TextureFormat.RGBA, FilterMode.Linear);
            this.cameraOutputTextures.set(camera, tex);
        }
        context.renderer.blitCopy(data.cameraOutput.colorAttachments[0], tex);
        context.renderer.blit(tex, FrameBuffer.CanvasBuffer);
    }
    renderGrid(context, data) {
        this.renderer.drawLines(this.grid, mat4.identity(), this.renderer.assets.materials.ColoredLine);
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
            fbo = new FrameBuffer(context.renderer.canvas.width, context.renderer.canvas.height);
            const renderbuffer = new RenderBuffer(fbo.width, fbo.height, TextureFormat.RGBA8, this.msaa);
            fbo.addColorAttachment(renderbuffer);
            this.cameraOutputFBOs.set(camera, fbo);
        }
        return fbo;
    }
}
//# sourceMappingURL=preview-renderer.js.map