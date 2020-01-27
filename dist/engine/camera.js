"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const texture_1 = require("../core/texture");
const render_target_1 = require("../core/render-target");
const global_1 = require("../core/global");
const vec2_1 = require("../types/vec2");
const entity_1 = require("./entity");
const mat4_1 = require("../types/mat4");
const math_1 = require("../types/math");
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
        const matProjection = this.projection === Projection.Perspective
            ? mat4_1.mat4.perspective(this.FOV * math_1.Deg2Rad, this.aspectRatio, this.near, this.far)
            : mat4_1.mat4.ortho(this.viewHeight, this.aspectRatio, this.near, this.far);
        return mat4_1.mat4.mul(matProjection, matView);
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map