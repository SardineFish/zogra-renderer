import { quat as glQuat, vec3 as glVec3 } from "gl-matrix";
import { vec3 } from "./vec3";
import { Rad2Deg } from "./math";
import { wrapGlMatrix } from "./utils";
const V4Constructor = Array;
export class Quaternion extends V4Constructor {
    static create() {
        return new Quaternion(0, 0, 0, 0);
    }
    asMut() { return this; }
    equals(v) {
        if (!v || !(v instanceof Array))
            return false;
        return glQuat.exactEquals(this, v);
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
    fill(value) {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        this[3] = value;
        return this;
    }
}
export function quat(x = 0, y = x, z = x, w = x) {
    return new Quaternion(x, y, z, w);
}
quat.create = () => {
    return quat(0);
};
quat.identity = wrapGlMatrix(glQuat.identity, 0, quat.create);
quat.axisAngle = wrapGlMatrix((out, axis, rad) => glQuat.setAxisAngle(out, axis, rad), 2, quat.create);
quat.mul = wrapGlMatrix(glQuat.mul, 2, quat.create);
quat.invert = wrapGlMatrix(glQuat.invert, 1, quat.create);
quat.normalize = wrapGlMatrix(glQuat.normalize, 1, quat.create);
quat.euler = wrapGlMatrix((out, q) => {
    out[0] = Math.atan2(2 * (q[3] * q[0] + q[1] * q[2]), (1 - 2 * (q[0] ** 2 + q[1] ** 2))) * Rad2Deg;
    out[1] = Math.asin(2 * (q[3] * q[1] - q[2] * q[0])) * Rad2Deg;
    out[2] = Math.atan2(2 * (q[3] * q[2] + q[0] * q[1]), 1 - 2 * (q[1] ** 2, q[2] ** 2)) * Rad2Deg;
    return out;
}, 1, vec3.zero);
quat.fromEuler = wrapGlMatrix((out, angles) => glQuat.fromEuler(out, angles[0], angles[1], angles[2]), 1, quat.create);
quat.rotate = wrapGlMatrix((out, q, v) => glVec3.transformQuat(out, v, q), 2, vec3.zero);
quat.equals = (a, b) => {
    return glQuat.exactEquals(a, b);
};
//# sourceMappingURL=quat.js.map