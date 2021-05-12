import { mat4 as glMat4, vec4 as glVec4 } from "gl-matrix";
import { quat } from "./quat";
import { vec3 } from "./vec3";
import { vec4 } from "./vec4";
import { vec2 } from "./vec2";
import { wrapGlMatrix } from "./utils";
const Mat4Constructor = Array;
const __vec4_temp = vec4.zero();
export class Matrix4x4 extends Mat4Constructor {
    constructor(p_0 = 0, p_1 = 0, p_2 = 0, p_3 = 0, p_4 = 0, p_5 = 0, p_6 = 0, p_7 = 0, p_8 = 0, p_9 = 0, p_10 = 0, p_11 = 0, p_12 = 0, p_13 = 0, p_14 = 0, p_15 = 0) {
        super(p_0, p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10, p_11, p_12, p_13, p_14, p_15);
    }
    static create() {
        return new Matrix4x4();
    }
    asMut() { return this; }
    set(m) {
        return glMat4.set(this, ...m);
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
export function mat4(p_0 = 0, p_1 = 0, p_2 = 0, p_3 = 0, p_4 = 0, p_5 = 0, p_6 = 0, p_7 = 0, p_8 = 0, p_9 = 0, p_10 = 0, p_11 = 0, p_12 = 0, p_13 = 0, p_14 = 0, p_15 = 0) {
    return new Matrix4x4(p_0, p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10, p_11, p_12, p_13, p_14, p_15);
}
mat4.create = Matrix4x4.create;
mat4.identity = wrapGlMatrix(glMat4.identity, 0, mat4.create);
mat4.rts = wrapGlMatrix(glMat4.fromRotationTranslationScale, 3, mat4.create);
mat4.translate = wrapGlMatrix(glMat4.translate, 2, Matrix4x4.create);
mat4.invert = wrapGlMatrix(glMat4.invert, 1, Matrix4x4.create);
mat4.getTranslation = wrapGlMatrix(glMat4.getTranslation, 1, vec3.zero);
mat4.getRotation = wrapGlMatrix(glMat4.getRotation, 1, quat.create);
mat4.getScaling = wrapGlMatrix(glMat4.getScaling, 1, vec3.zero);
mat4.mulVec4 = wrapGlMatrix((out, m, v) => glVec4.transformMat4(out, v, m), 2, vec4.zero);
mat4.perspective = wrapGlMatrix(glMat4.perspective, 4, Matrix4x4.create);
mat4.transpose = wrapGlMatrix(glMat4.transpose, 1, Matrix4x4.create);
mat4.rotate = wrapGlMatrix((out, m, axis, rad) => glMat4.rotate(out, m, rad, axis), 3, Matrix4x4.create);
mat4.scale = wrapGlMatrix(glMat4.scale, 2, Matrix4x4.create);
mat4.fromTranslation = wrapGlMatrix(glMat4.fromTranslation, 1, Matrix4x4.create);
mat4.fromRotation = wrapGlMatrix(glMat4.fromRotation, 1, Matrix4x4.create);
mat4.fromScaling = wrapGlMatrix(glMat4.fromScaling, 1, Matrix4x4.create);
mat4.mul = wrapGlMatrix(glMat4.mul, 2, Matrix4x4.create);
mat4.add = wrapGlMatrix(glMat4.add, 2, mat4.create);
mat4.sub = wrapGlMatrix(glMat4.sub, 2, mat4.create);
mat4.plus = mat4.add;
mat4.minus = mat4.sub;
mat4.mulVector = wrapGlMatrix((out, m, v) => {
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = v[2];
    __vec4_temp[3] = 0;
    glVec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    out[2] = __vec4_temp[2];
    return out;
}, 2, vec3.zero);
mat4.mulPoint = wrapGlMatrix((out, m, v) => {
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = v[2];
    __vec4_temp[3] = 1;
    glVec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    out[2] = __vec4_temp[2];
    return out;
}, 2, vec3.zero);
mat4.mulPoint2 = wrapGlMatrix((out, m, v) => {
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = 0;
    __vec4_temp[3] = 1;
    glVec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    return out;
}, 2, vec2.zero);
mat4.mulVector2 = wrapGlMatrix((out, m, v) => {
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = 0;
    __vec4_temp[3] = 0;
    glVec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    return out;
}, 2, vec2.zero);
function simpleOrthogonal(height, aspect, near, far) {
    const out = mat4.create();
    glMat4.ortho(out, -aspect * height, aspect * height, -height, height, near, far);
    return out;
}
function orthogonal(...args) {
    if (args.length === 4)
        return simpleOrthogonal(...args);
    const out = mat4.create();
    glMat4.ortho(...[out, ...args]);
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
    return glMat4.exactEquals(a, b);
};
mat4.set = wrapGlMatrix(glMat4.set, 1, mat4.create);
mat4.fill = wrapGlMatrix((out, n) => {
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