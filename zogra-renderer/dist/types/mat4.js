"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mat4 = exports.Matrix4x4 = void 0;
const gl_matrix_1 = require("gl-matrix");
const quat_1 = require("./quat");
const vec3_1 = require("./vec3");
const vec4_1 = require("./vec4");
const utils_1 = require("./utils");
const Mat4Constructor = Array;
const __vec4_temp = vec4_1.vec4.zero();
class Matrix4x4 extends Mat4Constructor {
    constructor(p_0 = 0, p_1 = 0, p_2 = 0, p_3 = 0, p_4 = 0, p_5 = 0, p_6 = 0, p_7 = 0, p_8 = 0, p_9 = 0, p_10 = 0, p_11 = 0, p_12 = 0, p_13 = 0, p_14 = 0, p_15 = 0) {
        super(p_0, p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10, p_11, p_12, p_13, p_14, p_15);
    }
    static create() {
        return new Matrix4x4();
    }
    asMut() { return this; }
    set(m) {
        return gl_matrix_1.mat4.set(this, ...m);
    }
    fill(n) {
        return mat4.fill(this, n);
    }
    clone(out = mat4.create()) {
        return out.set(this);
    }
    equals(other) {
        return mat4.equal(this, other);
    }
}
exports.Matrix4x4 = Matrix4x4;
function mat4(p_0 = 0, p_1 = 0, p_2 = 0, p_3 = 0, p_4 = 0, p_5 = 0, p_6 = 0, p_7 = 0, p_8 = 0, p_9 = 0, p_10 = 0, p_11 = 0, p_12 = 0, p_13 = 0, p_14 = 0, p_15 = 0) {
    return new Matrix4x4(p_0, p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10, p_11, p_12, p_13, p_14, p_15);
}
exports.mat4 = mat4;
mat4.create = Matrix4x4.create;
mat4.identity = utils_1.wrapGlMatrix(gl_matrix_1.mat4.identity, 0, mat4.create);
mat4.rts = utils_1.wrapGlMatrix(gl_matrix_1.mat4.fromRotationTranslationScale, 3, mat4.create);
mat4.translate = utils_1.wrapGlMatrix(gl_matrix_1.mat4.translate, 2, Matrix4x4.create);
mat4.invert = utils_1.wrapGlMatrix(gl_matrix_1.mat4.invert, 1, Matrix4x4.create);
mat4.getTranslation = utils_1.wrapGlMatrix(gl_matrix_1.mat4.getTranslation, 1, vec3_1.vec3.zero);
mat4.getRotation = utils_1.wrapGlMatrix(gl_matrix_1.mat4.getRotation, 1, quat_1.quat.create);
mat4.getScaling = utils_1.wrapGlMatrix(gl_matrix_1.mat4.getScaling, 1, vec3_1.vec3.zero);
mat4.mulVec4 = utils_1.wrapGlMatrix((out, m, v) => gl_matrix_1.vec4.transformMat4(out, v, m), 2, vec4_1.vec4.zero);
mat4.perspective = utils_1.wrapGlMatrix(gl_matrix_1.mat4.perspective, 4, Matrix4x4.create);
mat4.transpose = utils_1.wrapGlMatrix(gl_matrix_1.mat4.transpose, 1, Matrix4x4.create);
mat4.rotate = utils_1.wrapGlMatrix((out, m, axis, rad) => gl_matrix_1.mat4.rotate(out, m, rad, axis), 3, Matrix4x4.create);
mat4.scale = utils_1.wrapGlMatrix(gl_matrix_1.mat4.scale, 2, Matrix4x4.create);
mat4.fromTranslation = utils_1.wrapGlMatrix(gl_matrix_1.mat4.fromTranslation, 1, Matrix4x4.create);
mat4.fromRotation = utils_1.wrapGlMatrix(gl_matrix_1.mat4.fromRotation, 1, Matrix4x4.create);
mat4.fromScaling = utils_1.wrapGlMatrix(gl_matrix_1.mat4.fromScaling, 1, Matrix4x4.create);
mat4.mul = utils_1.wrapGlMatrix(gl_matrix_1.mat4.mul, 2, Matrix4x4.create);
mat4.add = utils_1.wrapGlMatrix(gl_matrix_1.mat4.add, 2, mat4.create);
mat4.sub = utils_1.wrapGlMatrix(gl_matrix_1.mat4.sub, 2, mat4.create);
mat4.plus = mat4.add;
mat4.minus = mat4.sub;
mat4.mulVector = utils_1.wrapGlMatrix((out, m, v) => {
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = v[2];
    __vec4_temp[3] = 0;
    gl_matrix_1.vec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    out[2] = __vec4_temp[2];
    return out;
}, 2, vec3_1.vec3.zero);
mat4.mulPoint = utils_1.wrapGlMatrix((out, m, v) => {
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = v[2];
    __vec4_temp[3] = 1;
    gl_matrix_1.vec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    out[2] = __vec4_temp[2];
    return out;
}, 2, vec3_1.vec3.zero);
function simpleOrthogonal(height, aspect, near, far) {
    const out = mat4.create();
    gl_matrix_1.mat4.ortho(out, -aspect * height, aspect * height, -height, height, near, far);
    return out;
}
function orthogonal(...args) {
    if (args.length === 4)
        return simpleOrthogonal(...args);
    const out = mat4.create();
    gl_matrix_1.mat4.ortho(...[out, ...args]);
    return out;
}
mat4.ortho = orthogonal;
// (height: number, aspect: number, near: number, far: number) =>
// {
//     const out = glMat4.create();
//     glMat4.ortho(out, -aspect * height, aspect * height, -height, height, near, far);
//     return out;
//     out[0] = 2 / (aspect * height);
//     out[1] = 0;
//     out[2] = 0;
//     out[3] = 0;
//     out[4] = 0;
//     out[5] = 2 / height;
//     out[6] = 0;
//     out[7] = 0;
//     out[8] = 0;
//     out[9] = 0;
//     out[10] = -2 / (far - near);
//     out[11] = -(far + near) / (far - near);
//     out[12] = 0;
//     out[13] = 0;
//     out[14] = 0;
//     out[15] = 1;
//     return out;
// }
mat4.equal = (a, b) => {
    if (a === undefined || b === undefined)
        return false;
    if (!(a instanceof Array || a instanceof Float32Array) || !(b instanceof Array || b instanceof Float32Array))
        return false;
    return gl_matrix_1.mat4.exactEquals(a, b);
};
mat4.set = utils_1.wrapGlMatrix(gl_matrix_1.mat4.set, 1, mat4.create);
mat4.fill = utils_1.wrapGlMatrix((out, n) => {
    out[0]
        = out[1]
            = out[2]
                = out[3]
                    = out[4]
                        = out[5]
                            = out[6]
                                = out[7]
                                    = out[8]
                                        = out[9]
                                            = out[10]
                                                = out[11]
                                                    = out[12]
                                                        = out[13]
                                                            = out[14]
                                                                = out[15] = n;
    return out;
}, 1, mat4.create);
// export const mat4 = Matrix4x4;
//# sourceMappingURL=mat4.js.map