"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
function Matrix4x4(values) {
    const mat = gl_matrix_1.mat4.clone(values);
    return mat;
}
exports.Matrix4x4 = Matrix4x4;
Matrix4x4.identity = () => {
    const mat = gl_matrix_1.mat4.create();
    return gl_matrix_1.mat4.identity(mat);
};
exports.mat4 = Matrix4x4;
//# sourceMappingURL=mat4.js.map