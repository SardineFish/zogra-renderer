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
    const quat = gl_matrix_1.quat.create();
    gl_matrix_1.quat.setAxisAngle(quat, axis, rad);
};
exports.quat = Quaternion;
//# sourceMappingURL=quat.js.map