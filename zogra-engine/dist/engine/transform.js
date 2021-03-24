"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transform = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
class Transform {
    constructor() {
        // private mLoc2World = mat4.identity();
        // private mWorld2Loc = mat4.identity();
        // private mat = mat4.identity();
        // private matInv = mat4.identity();
        // get localPosition() { return mat4.getTranslation(this.mat); }
        // get localRotation() { return mat4.getRotation(this.mat); }
        // get localScaling() { return mat4.getScaling(this.mat); }
        // get position()
        // {
        //     return mat4.getTranslation(this.mLoc2World);
        // }
        // get rotation() { return mat4.getRotation(this.mWorld2Loc); }
        // get scale() { return mat4.getScaling(this.mLoc2World); }
        // set localPosition()
        // {
        // }
        this._parent = null;
        this.children = new Set();
        this.localPosition = zogra_renderer_2.vec3.zero();
        this.localRotation = zogra_renderer_3.quat.identity();
        this.localScaling = zogra_renderer_2.vec3.one();
        this._scene = null;
    }
    get scene() { return this._scene; }
    get position() {
        if (!this._parent)
            return this.localPosition;
        return zogra_renderer_1.mat4.mulPoint(this._parent.localToWorldMatrix, this.localPosition);
    }
    set position(position) {
        if (!this._parent)
            this.localPosition = position;
        else
            this.localPosition = zogra_renderer_1.mat4.mulPoint(this._parent.worldToLocalMatrix, position);
    }
    get rotation() {
        if (!this._parent)
            return this.localRotation;
        return zogra_renderer_3.quat.mul(this._parent.rotation, this.localRotation);
    }
    set rotation(rotation) {
        if (!this._parent)
            this.localRotation = zogra_renderer_3.quat.normalize(rotation);
        else
            this.localRotation = zogra_renderer_3.quat.normalize(zogra_renderer_3.quat.mul(zogra_renderer_3.quat.invert(this._parent.rotation), rotation));
    }
    /*get scaling()
    {
        if (!this._parent)
            return this.localScaling;
        return mat4.mulVector(this.localToWorldMatrix, vec3.one());
    }
    set scaling(scaling: vec3)
    {
        if (!this._parent)
            this.localScaling = scaling;
        else
            this.localScaling = mat4.mulVector(this.worldToLocalMatrix)
    }*/
    get localToWorldMatrix() {
        if (!this._parent)
            return zogra_renderer_1.mat4.rts(this.localRotation, this.localPosition, this.localScaling);
        const mat = zogra_renderer_1.mat4.rts(this.localRotation, this.localPosition, this.localScaling);
        return zogra_renderer_1.mat4.mul(mat, this._parent.localToWorldMatrix, mat);
    }
    get worldToLocalMatrix() {
        return zogra_renderer_1.mat4.invert(this.localToWorldMatrix);
    }
    get parent() { return this._parent; }
    set parent(p) {
        this._parent = p;
        if (p) {
            p.children.add(this);
        }
    }
    /** @internal */
    __addToScene(scene) {
        this._scene = scene;
    }
    /** @internal */
    __removeFromScene(scene) {
        this._scene = null;
    }
}
exports.Transform = Transform;
//# sourceMappingURL=transform.js.map