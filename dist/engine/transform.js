"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mat4_1 = require("../types/mat4");
const vec3_1 = require("../types/vec3");
const quat_1 = require("../types/quat");
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
        this.children = [];
        this.localPosition = vec3_1.vec3.zero();
        this.localRotation = quat_1.quat.identity();
        this.localScaling = vec3_1.vec3.one();
    }
    get position() {
        if (!this._parent)
            return this.localPosition;
        return mat4_1.mat4.mulPoint(this._parent.localToWorldMatrix, this.localPosition);
    }
    set position(position) {
        if (!this._parent)
            this.localPosition = position;
        else
            this.localPosition = mat4_1.mat4.mulPoint(this._parent.worldToLocalMatrix, position);
    }
    get rotation() {
        if (!this._parent)
            return this.localRotation;
        return quat_1.quat.mul(this._parent.rotation, this.localRotation);
    }
    set rotation(rotation) {
        if (!this._parent)
            this.localRotation = quat_1.quat.normalize(rotation);
        else
            this.localRotation = quat_1.quat.normalize(quat_1.quat.mul(quat_1.quat.invert(this._parent.rotation), rotation));
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
            return mat4_1.mat4.rts(this.localRotation, this.localPosition, this.localScaling);
        const mat = mat4_1.mat4.rts(this.localRotation, this.localPosition, this.localScaling);
        return mat4_1.mat4.mul(mat, this._parent.localToWorldMatrix, mat);
    }
    get worldToLocalMatrix() {
        return mat4_1.mat4.invert(this.localToWorldMatrix);
    }
    get parent() { return this._parent; }
    set parent(p) {
        this._parent = p;
        if (p) {
            p.children.push(this);
        }
    }
}
exports.Transform = Transform;
//# sourceMappingURL=transform.js.map