"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
const utils_1 = require("./utils");
class FBXTransform {
    constructor(model, parent = null) {
        this.parent = null;
        this.children = [];
        this.localPosition = gl_matrix_1.vec3.create();
        this.localRotation = gl_matrix_1.quat.identity(gl_matrix_1.quat.create());
        this.localScaling = gl_matrix_1.vec3.fromValues(0, 0, 0);
        this.parent = parent;
        this.model = model;
    }
    get position() {
        if (!this.parent)
            return this.localPosition;
        let [x, y, z] = this.localPosition;
        [x, y, z] = gl_matrix_1.vec4.transformMat4(gl_matrix_1.vec4.create(), gl_matrix_1.vec4.fromValues(x, y, z, 1), this.localToWorldMatrix);
        return gl_matrix_1.vec3.fromValues(x, y, z);
    }
    set position(position) {
        if (!this.parent)
            this.localPosition = position;
        else
            this.localPosition = utils_1.mulPoint(this.localPosition, this.parent.localToWorldMatrix, this.localPosition);
    }
    get rotation() {
        if (!this.parent)
            return this.localRotation;
        return gl_matrix_1.quat.mul(gl_matrix_1.quat.create(), this.parent.rotation, this.localRotation);
    }
    set rotation(rotation) {
        if (!this.parent)
            this.localRotation = gl_matrix_1.quat.normalize(this.localRotation, this.localRotation);
        else
            this.localRotation = gl_matrix_1.quat.normalize(this.localRotation, gl_matrix_1.quat.mul(this.localRotation, gl_matrix_1.quat.invert(gl_matrix_1.quat.create(), this.parent.rotation), rotation));
    }
    get scaling() {
        if (!this.parent)
            return this.localScaling;
        return gl_matrix_1.vec3.mul(gl_matrix_1.vec3.create(), this.parent.scaling, this.localScaling);
    }
    set scaling(scaling) {
        if (!this.parent)
            this.localScaling = scaling;
        else
            this.localScaling = gl_matrix_1.vec3.div(this.localScaling, scaling, this.parent.scaling);
    }
    get localToWorldMatrix() {
        if (!this.parent)
            return gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), this.localRotation, this.localPosition, this.localScaling);
        const mat = gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), this.localRotation, this.localPosition, this.localScaling);
        return gl_matrix_1.mat4.mul(mat, this.parent.localToWorldMatrix, mat);
    }
    get worldToLocalMatrix() {
        return gl_matrix_1.mat4.invert(this.localToWorldMatrix, this.localToWorldMatrix);
    }
}
//# sourceMappingURL=fbx-type.js.map