"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
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
exports.quat = Quaternion;
exports.quat.identity = Quaternion.identity;
//# sourceMappingURL=quat.js.map