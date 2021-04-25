"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = exports.Projection = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
const entity_1 = require("./entity");
const zogra_renderer_4 = require("zogra-renderer");
const zogra_renderer_5 = require("zogra-renderer");
const zogra_renderer_6 = require("zogra-renderer");
const zogra_renderer_7 = require("zogra-renderer");
const zogra_renderer_8 = require("zogra-renderer");
const zogra_renderer_9 = require("zogra-renderer");
var Projection;
(function (Projection) {
    Projection[Projection["Perspective"] = 0] = "Perspective";
    Projection[Projection["Orthographic"] = 1] = "Orthographic";
})(Projection = exports.Projection || (exports.Projection = {}));
class Camera extends entity_1.Entity {
    constructor(ctx = zogra_renderer_2.GlobalContext()) {
        super();
        this.output = null;
        this.FOV = 30;
        this.near = 0.3;
        this.far = 1000;
        this.viewHeight = 1;
        this.projection = Projection.Perspective;
        this.clearColor = zogra_renderer_6.Color.black;
        this.clearDepth = true;
        this.postprocess = [];
        this.ctx = ctx;
    }
    get pixelSize() {
        if (this.output instanceof zogra_renderer_1.RenderTexture)
            return zogra_renderer_3.vec2(this.output.width, this.output.height);
        else
            return zogra_renderer_3.vec2(this.ctx.width, this.ctx.height);
    }
    get aspectRatio() { return this.pixelSize.x / this.pixelSize.y; }
    get viewProjectionMatrix() {
        const matView = this.worldToLocalMatrix;
        const matProjection = this.projectionMatrix;
        return zogra_renderer_4.mat4.mul(matProjection, matView);
    }
    get projectionMatrix() {
        return this.projection === Projection.Perspective
            ? zogra_renderer_4.mat4.perspective(this.FOV * zogra_renderer_5.Deg2Rad, this.aspectRatio, this.near, this.far)
            : zogra_renderer_4.mat4.ortho(this.viewHeight, this.aspectRatio, this.near, this.far);
    }
    on(event, listener) {
        this.eventEmitter.with().on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.with().on(event, listener);
    }
    __preRender(context) {
        this.eventEmitter.with().emit("prerender", this, context);
    }
    __postRender(contect) {
        this.eventEmitter.with().emit("postrender", this, contect);
    }
    screenToRay(pos) {
        const p = this.screenToWorld(pos);
        return zogra_renderer_8.ray(this.position.clone(), zogra_renderer_5.minus(zogra_renderer_7.vec3(p.x, p.y, p.z), this.position));
    }
    screenToWorld(pos) {
        const w = this.projection == Projection.Perspective
            ? this.near
            : 1;
        const ndcXY = this.screenToViewport(pos).mul(zogra_renderer_3.vec2(2, -2)).minus(zogra_renderer_3.vec2(1, -1));
        const clip = zogra_renderer_5.mul(zogra_renderer_9.vec4(ndcXY.x, ndcXY.y, -1, 1), w);
        const matVPInv = zogra_renderer_4.mat4.invert(this.viewProjectionMatrix);
        const p = zogra_renderer_4.mat4.mulVec4(matVPInv, clip);
        return zogra_renderer_7.vec3(p[0], p[1], p[2]);
    }
    screenToViewport(pos) {
        if (this.output === null)
            return zogra_renderer_5.div(pos, zogra_renderer_3.vec2(this.ctx.width, this.ctx.height));
        else if (this.output instanceof zogra_renderer_1.RenderTexture) {
            return zogra_renderer_5.div(pos, zogra_renderer_3.vec2(this.output.width, this.output.height));
        }
        else
            return zogra_renderer_3.vec2.zero();
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map