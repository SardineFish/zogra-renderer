"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quat = void 0;
const gl_matrix_1 = require("gl-matrix");
const vec3_1 = require("./vec3");
const math_1 = require("./math");
function quat() {
    const quat = gl_matrix_1.quat.create();
    return quat;
}
exports.quat = quat;
quat.create = () => {
    return gl_matrix_1.quat.create();
};
quat.identity = () => {
    const quat = gl_matrix_1.quat.create();
    gl_matrix_1.quat.identity(quat);
    return quat;
};
/**
 * @param axis - Axis to rotate around.
 * @param rad - Rotation angle in radians
 */
quat.axis = (axis, rad) => {
    return gl_matrix_1.quat.setAxisAngle(gl_matrix_1.quat.create(), axis, rad);
};
quat.mul = (a, b) => {
    const out = gl_matrix_1.quat.create();
    return gl_matrix_1.quat.mul(out, a, b);
};
quat.invert = (q) => {
    const out = gl_matrix_1.quat.create();
    return gl_matrix_1.quat.invert(out, q);
};
quat.normalize = (q) => {
    return gl_matrix_1.quat.normalize(gl_matrix_1.quat.create(), q);
};
quat.euler = (q) => {
    return vec3_1.vec3(Math.atan2(2 * (q[3] * q[0] + q[1] * q[2]), (1 - 2 * (q[0] ** 2 + q[1] ** 2))) * math_1.Rad2Deg, Math.asin(2 * (q[3] * q[1] - q[2] * q[0])) * math_1.Rad2Deg, Math.atan2(2 * (q[3] * q[2] + q[0] * q[1]), 1 - 2 * (q[1] ** 2, q[2] ** 2)) * math_1.Rad2Deg);
};
quat.fromEuler = (e) => {
    return gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), e[0], e[1], e[2]);
};
quat.rotate = (q, v) => {
    return gl_matrix_1.vec3.transformQuat(vec3_1.vec3(0, 0, 0), v, q);
};
quat.equals = (a, b) => {
    return gl_matrix_1.quat.exactEquals(a, b);
};
quat.identity = quat.identity;
//# sourceMappingURL=quat.js.map