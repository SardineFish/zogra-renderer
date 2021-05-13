import { mat4 } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { quat } from "zogra-renderer";
export class Transform {
    constructor() {
        this._parent = null;
        this.children = new Set();
        this._localPosition = vec3.zero();
        this._localRotation = quat.identity();
        this._localScaling = vec3.one();
        this._rotation = quat.identity();
        this._inv_rotation = quat.identity();
        this._localToWorld = mat4.identity();
        this._worldToLocal = mat4.identity();
        this._scene = null;
    }
    get localPosition() { return this._localPosition; }
    get localRotation() { return this._localRotation; }
    get localScaling() { return this._localScaling; }
    set localPosition(position) {
        this._localPosition.set(position);
        this.updateTransformRecursive();
    }
    set localRotation(rotation) {
        this._localRotation.set(rotation);
        this.updateTransformRecursive();
    }
    set localScaling(scaling) {
        this._localScaling.set(scaling);
        this.updateTransformRecursive();
    }
    get scene() { return this._scene; }
    get position() {
        if (!this._parent)
            return this.localPosition;
        return mat4.mulPoint(this._parent.localToWorldMatrix, this.localPosition);
    }
    set position(position) {
        if (!this._parent)
            this.localPosition.set(position);
        else
            mat4.mulPoint(this._localPosition, this._parent.worldToLocalMatrix, position);
        this.updateTransformRecursive();
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(rotation) {
        if (!this._parent)
            quat.normalize(this._localRotation, rotation);
        else {
            quat.mul(this._localRotation, this._parent._inv_rotation, rotation);
            quat.normalize(this._localRotation, this._localRotation);
        }
        this.updateTransformRecursive();
    }
    // get scaling(): Readonly<vec3>
    // {
    //     if (!this._parent)
    //         return this.localScaling;
    //     return mat4.mulVector(this.localToWorldMatrix, vec3.one());
    // }
    // set scaling(scaling)
    // {
    //     if (!this._parent)
    //         this.localScaling.set(scaling);
    //     else
    //         this.localScaling = mat4.getScaling(this._parent.worldToLocalMatrix).mul(scaling);
    // }
    get localToWorldMatrix() { return this._localToWorld; }
    get worldToLocalMatrix() { return this._worldToLocal; }
    get parent() { return this._parent; }
    set parent(p) {
        this._parent = p;
        if (p) {
            p.children.add(this);
        }
        this.updateTransformRecursive();
    }
    translate(motion) {
        if (!this._parent)
            this.localPosition.plus(motion);
        else
            this.localPosition.plus(mat4.mulVector(this._parent.worldToLocalMatrix, motion));
        this.updateTransformRecursive();
    }
    /** @internal */
    __addToScene(scene) {
        this._scene = scene;
    }
    /** @internal */
    __removeFromScene(scene) {
        this._scene = null;
    }
    updateTransformRecursive() {
        this._rotation.set(this._localRotation);
        mat4.rts(this._localToWorld, this._localRotation, this._localPosition, this._localScaling);
        if (this._parent) {
            mat4.mul(this._localToWorld, this._parent._localToWorld, this._localToWorld);
            quat.mul(this._rotation, this._parent._rotation, this._rotation);
        }
        mat4.invert(this._worldToLocal, this._localToWorld);
        quat.invert(this._inv_rotation, this._rotation);
        for (const child of this.children)
            child.updateTransformRecursive();
    }
}
//# sourceMappingURL=transform.js.map