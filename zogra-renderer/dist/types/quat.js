"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quat = exports.Quaternion = void 0;
const gl_matrix_1 = require("gl-matrix");
const vec3_1 = require("./vec3");
const math_1 = require("./math");
const utils_1 = require("./utils");
const V4Constructor = Array;
class Quaternion extends V4Constructor {
    static create() {
        return new Quaternion(0, 0, 0, 0);
    }
    equals(v) {
        if (!v || !(v instanceof Array))
            return false;
        return gl_matrix_1.quat.exactEquals(this, v);
    }
    clone(out = Quaternion.create()) {
        return out.set(this);
    }
    set(value) {
        this[0] = value[0] || 0;
        this[1] = value[1] || 0;
        this[2] = value[2] || 0;
        this[3] = value[3] || 0;
        return this;
    }
    setAll(value) {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        this[3] = value;
        return this;
    }
}
exports.Quaternion = Quaternion;
function quat(x = 0, y = x, z = x, w = x) {
    return new Quaternion(x, y, z, w);
}
exports.quat = quat;
quat.create = () => {
    return quat(0);
};
quat.identity = utils_1.wrapGlMatrix(gl_matrix_1.quat.identity, 0, quat.create);
quat.axisAngle = utils_1.wrapGlMatrix((out, axis, rad) => gl_matrix_1.quat.setAxisAngle(out, axis, rad), 2, quat.create);
quat.mul = utils_1.wrapGlMatrix(gl_matrix_1.quat.mul, 2, quat.create);
quat.invert = utils_1.wrapGlMatrix(gl_matrix_1.quat.invert, 1, quat.create);
quat.normalize = utils_1.wrapGlMatrix(gl_matrix_1.quat.normalize, 1, quat.create);
quat.euler = utils_1.wrapGlMatrix((out, q) => {
    out[0] = Math.atan2(2 * (q[3] * q[0] + q[1] * q[2]), (1 - 2 * (q[0] ** 2 + q[1] ** 2))) * math_1.Rad2Deg;
    out[1] = Math.asin(2 * (q[3] * q[1] - q[2] * q[0])) * math_1.Rad2Deg;
    out[2] = Math.atan2(2 * (q[3] * q[2] + q[0] * q[1]), 1 - 2 * (q[1] ** 2, q[2] ** 2)) * math_1.Rad2Deg;
    return out;
}, 1, vec3_1.vec3.zero);
quat.fromEuler = utils_1.wrapGlMatrix((out, angles) => gl_matrix_1.quat.fromEuler(out, angles[0], angles[1], angles[2]), 1, quat.create);
quat.rotate = utils_1.wrapGlMatrix((out, q, v) => gl_matrix_1.vec3.transformQuat(out, v, q), 2, vec3_1.vec3.zero);
quat.equals = (a, b) => {
    return gl_matrix_1.quat.exactEquals(a, b);
};
//# sourceMappingURL=quat.js.map