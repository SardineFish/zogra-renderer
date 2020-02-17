"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
const vec3_1 = require("./vec3");
const math_1 = require("./math");
function Quaternion() {
    const quat = gl_matrix_1.quat.create();
    return quat;
}
exports.Quaternion = Quaternion;
Quaternion.identity = () => {
    const quat = gl_matrix_1.quat.create();
    gl_matrix_1.quat.identity(quat);
    return quat;
};
/**
 * @param axis - Axis to rotate around.
 * @param rad - Rotation angle in radians
 */
Quaternion.axis = (axis, rad) => {
    return gl_matrix_1.quat.setAxisAngle(gl_matrix_1.quat.create(), axis, rad);
};
Quaternion.mul = (a, b) => {
    const out = gl_matrix_1.quat.create();
    return gl_matrix_1.quat.mul(out, a, b);
};
Quaternion.invert = (q) => {
    const out = gl_matrix_1.quat.create();
    return gl_matrix_1.quat.invert(out, q);
};
Quaternion.normalize = (q) => {
    return gl_matrix_1.quat.normalize(gl_matrix_1.quat.create(), q);
};
Quaternion.euler = (q) => {
    return vec3_1.vec3(Math.atan2(2 * (q[3] * q[0] + q[1] * q[2]), (1 - 2 * (q[0] ** 2 + q[1] ** 2))) * math_1.Rad2Deg, Math.asin(2 * (q[3] * q[1] - q[2] * q[0])) * math_1.Rad2Deg, Math.atan2(2 * (q[3] * q[2] + q[0] * q[1]), 1 - 2 * (q[1] ** 2, q[2] ** 2)) * math_1.Rad2Deg);
};
Quaternion.fromEuler = (e) => {
    return gl_matrix_1.quat.fromEuler(gl_matrix_1.quat.create(), e.x, e.y, e.z);
};
Quaternion.rotate = (q, v) => {
    return gl_matrix_1.vec3.transformQuat(vec3_1.vec3(0, 0, 0), v, q);
};
exports.quat = Quaternion;
exports.quat.identity = Quaternion.identity;
//# sourceMappingURL=quat.js.map