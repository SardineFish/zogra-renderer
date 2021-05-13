import { RenderTexture } from "zogra-renderer";
import { GlobalContext } from "zogra-renderer";
import { vec2 } from "zogra-renderer";
import { Entity } from "./entity";
import { mat4 } from "zogra-renderer";
import { Deg2Rad, div, mul, minus } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { ray } from "zogra-renderer";
import { vec4 } from "zogra-renderer";
export var Projection;
(function (Projection) {
    Projection[Projection["Perspective"] = 0] = "Perspective";
    Projection[Projection["Orthographic"] = 1] = "Orthographic";
})(Projection || (Projection = {}));
export class Camera extends Entity {
    constructor(ctx = GlobalContext()) {
        super();
        this.output = null;
        this.FOV = 30;
        this.near = 0.3;
        this.far = 1000;
        this.viewHeight = 1;
        this.projection = Projection.Perspective;
        this.clearColor = Color.black;
        this.clearDepth = true;
        this.postprocess = [];
        this.ctx = ctx;
    }
    get pixelSize() {
        if (this.output instanceof RenderTexture)
            return vec2(this.output.width, this.output.height);
        else
            return vec2(this.ctx.width, this.ctx.height);
    }
    get aspectRatio() { return this.pixelSize.x / this.pixelSize.y; }
    get viewProjectionMatrix() {
        const matView = this.worldToLocalMatrix;
        const matProjection = this.projectionMatrix;
        return mat4.mul(matProjection, matView);
    }
    get projectionMatrix() {
        return this.projection === Projection.Perspective
            ? mat4.perspective(this.FOV * Deg2Rad, this.aspectRatio, this.near, this.far)
            : mat4.ortho(this.viewHeight, this.aspectRatio, this.near, this.far);
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
        return ray(this.position.clone(), minus(vec3(p.x, p.y, p.z), this.position));
    }
    screenToWorld(pos) {
        const w = this.projection == Projection.Perspective
            ? this.near
            : 1;
        const ndcXY = this.screenToViewport(pos).mul(vec2(2, -2)).minus(vec2(1, -1));
        const clip = mul(vec4(ndcXY.x, ndcXY.y, -1, 1), w);
        const matVPInv = mat4.invert(this.viewProjectionMatrix);
        const p = mat4.mulVec4(matVPInv, clip);
        return vec3(p[0], p[1], p[2]);
    }
    screenToViewport(pos) {
        if (this.output === null)
            return div(pos, vec2(this.ctx.width, this.ctx.height));
        else if (this.output instanceof RenderTexture) {
            return div(pos, vec2(this.output.width, this.output.height));
        }
        else
            return vec2.zero();
    }
}
//# sourceMappingURL=camera.js.map