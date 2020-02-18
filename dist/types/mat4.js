"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
const vec3_1 = require("./vec3");
const vec4_1 = require("./vec4");
function Matrix4x4(values) {
    const mat = gl_matrix_1.mat4.clone(values);
    return mat;
}
exports.Matrix4x4 = Matrix4x4;
Matrix4x4.identity = () => {
    const mat = gl_matrix_1.mat4.create();
    return gl_matrix_1.mat4.identity(mat);
};
Matrix4x4.rts = (rotation, translation, scale) => {
    const m = exports.mat4.identity();
    gl_matrix_1.mat4.fromRotationTranslationScale(m, rotation, translation, scale);
    return m;
};
Matrix4x4.translate = (translate) => {
    const m = exports.mat4.identity();
    return gl_matrix_1.mat4.translate(m, gl_matrix_1.mat4.identity(m), translate);
};
Matrix4x4.invert = (m) => {
    const out = gl_matrix_1.mat4.create();
    gl_matrix_1.mat4.invert(out, m);
    return out;
};
Matrix4x4.getTranslation = (m) => {
    let out = vec3_1.vec3(0, 0, 0);
    gl_matrix_1.mat4.getTranslation(out, m);
    return out;
};
Matrix4x4.getRotation = (m) => {
    let out = gl_matrix_1.quat.create();
    gl_matrix_1.mat4.getRotation(out, m);
    return out;
};
Matrix4x4.getScaling = (m) => {
    let out = vec3_1.vec3(0, 0, 0);
    gl_matrix_1.mat4.getScaling(out, m);
    return out;
};
Matrix4x4.mulPoint = (m, p) => {
    let v = vec4_1.vec4(p.x, p.y, p.z, 1);
    let out = vec4_1.vec4.zero();
    gl_matrix_1.vec4.transformMat4(out, v, m);
    return vec3_1.vec3(out.x, out.y, out.z);
};
Matrix4x4.mulVector = (m, v) => {
    let v4 = vec4_1.vec4(v.x, v.y, v.z, 0);
    let out = vec4_1.vec4.zero();
    gl_matrix_1.vec4.transformMat4(out, v4, m);
    return vec3_1.vec3(out.x, out.y, out.z);
};
Matrix4x4.mulVec4 = (m, v) => {
    let out = vec4_1.vec4.zero();
    gl_matrix_1.vec4.transformMat4(out, v, m);
    return out;
};
Matrix4x4.perspective = (fov, aspect, near, far) => {
    const out = gl_matrix_1.mat4.create();
    return gl_matrix_1.mat4.perspective(out, fov, aspect, near, far);
};
Matrix4x4.transpose = (m) => {
    return gl_matrix_1.mat4.transpose(gl_matrix_1.mat4.create(), m);
};
Matrix4x4.ortho = (height, aspect, near, far) => {
    const out = gl_matrix_1.mat4.create();
    out[0] = 1 / (aspect * height);
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1 / height;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = -2 / (far - near);
    out[11] = -(far + near) / (far - near);
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
Matrix4x4.rotate = (m, axis, rad) => {
    return gl_matrix_1.mat4.rotate(gl_matrix_1.mat4.create(), m, rad, axis);
};
Matrix4x4.scale = (m, scaling) => {
    return gl_matrix_1.mat4.scale(gl_matrix_1.mat4.create(), m, scaling);
};
Matrix4x4.fromRotation = (axis, rad) => {
    return gl_matrix_1.mat4.fromRotation(gl_matrix_1.mat4.create(), rad, axis);
};
Matrix4x4.fromScaling = (scaling) => {
    return gl_matrix_1.mat4.fromScaling(gl_matrix_1.mat4.create(), scaling);
};
Matrix4x4.mul = ((out, a, b) => {
    if (!b) {
        b = a;
        a = out;
        out = gl_matrix_1.mat4.create();
    }
    return gl_matrix_1.mat4.mul(out, a, b);
});
exports.mat4 = Matrix4x4;
//# sourceMappingURL=mat4.js.map