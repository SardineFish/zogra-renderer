"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = exports.Projection = void 0;
const texture_1 = require("../core/texture");
const render_target_1 = require("../core/render-target");
const global_1 = require("../core/global");
const vec2_1 = require("../types/vec2");
const entity_1 = require("./entity");
const mat4_1 = require("../types/mat4");
const math_1 = require("../types/math");
const color_1 = require("../types/color");
const vec3_1 = require("../types/vec3");
const ray_1 = require("../types/ray");
const vec4_1 = require("../types/vec4");
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
    screenToRay(pos) {
        const p = this.screenToWorld(pos);
        return ray_1.ray(this.position, math_1.minus(vec3_1.vec3(p.x, p.y, p.z), this.position));
    }
    screenToWorld(pos) {
        const w = this.projection == Projection.Perspective
            ? this.near
            : 1;
        const ndcXY = this.screenToViewport(pos).mul(vec2_1.vec2(2, -2)).minus(vec2_1.vec2(1, -1));
        const clip = math_1.mul(vec4_1.vec4(ndcXY.x, ndcXY.y, -1, 1), w);
        const matVPInv = mat4_1.mat4.invert(this.viewProjectionMatrix);
        const p = mat4_1.mat4.mulVec4(matVPInv, clip);
        return vec3_1.vec3(p[0], p[1], p[2]);
    }
    screenToViewport(pos) {
        if (this.output === render_target_1.RenderTarget.CanvasTarget)
            return math_1.div(pos, vec2_1.vec2(this.ctx.width, this.ctx.height));
        else if (this.output instanceof texture_1.RenderTexture) {
            return math_1.div(pos, vec2_1.vec2(this.output.width, this.output.height));
        }
        else
            return vec2_1.vec2.zero();
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map