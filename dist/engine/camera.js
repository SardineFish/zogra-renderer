"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const texture_1 = require("../core/texture");
const render_target_1 = require("../core/render-target");
const global_1 = require("../core/global");
const vec2_1 = require("../types/vec2");
const entity_1 = require("./entity");
const mat4_1 = require("../types/mat4");
const math_1 = require("../types/math");
const color_1 = require("../types/color");
var Projection;
(function (Projection) {
    Projection[Projection["Perspective"] = 0] = "Perspective";
    Projection[Projection["Orthographic"] = 1] = "Orthographic";
})(Projection = exports.Projection || (exports.Projection = {}));
class Camera extends entity_1.Entity {
    constructor(ctx = global_1.GlobalContext()) {
        super();
        this.output = render_target_1.RenderTarget.CanvasTarget;
        this.FOV = 30;
        this.near = 0.3;
        this.far = 1000;
        this.viewHeight = 1;
        this.projection = Projection.Perspective;
        this.clearColor = color_1.Color.black;
        this.clearDepth = true;
        this.ctx = ctx;
    }
    get pixelSize() {
        if (this.output instanceof texture_1.RenderTexture)
            return vec2_1.vec2(this.output.width, this.output.height);
        else
            return vec2_1.vec2(this.ctx.width, this.ctx.height);
    }
    get aspectRatio() { return this.pixelSize.x / this.pixelSize.y; }
    get viewProjectionMatrix() {
        const matView = this.worldToLocalMatrix;
        const matProjection = this.projectionMatrix;
        return mat4_1.mat4.mul(matProjection, matView);
    }
    get projectionMatrix() {
        return this.projection === Projection.Perspective
            ? mat4_1.mat4.perspective(this.FOV * math_1.Deg2Rad, this.aspectRatio, this.near, this.far)
            : mat4_1.mat4.ortho(this.viewHeight, this.aspectRatio, this.near, this.far);
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    __preRender(context) {
        this.eventEmitter.emit("prerender", this, context);
    }
    __postRender(contect) {
        this.eventEmitter.emit("postrender", this, contect);
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map