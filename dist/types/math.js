"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("./vec3");
const vec4_1 = require("./vec4");
const gl_matrix_1 = require("gl-matrix");
const vec2_1 = require("./vec2");
function arithOrder(a, b) {
    return (b.length > a.length ? [b, a] : [a, b]);
}
function plus(a, b) {
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.to(lhs.constructor).plus(lhs);
}
exports.plus = plus;
function minus(a, b) {
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.to(lhs.constructor).minus(lhs);
}
exports.minus = minus;
function mul(a, b) {
    if (a instanceof vec3_1.Vector3 || a instanceof vec4_1.Vector4 || a instanceof vec2_1.Vector2) {
        const [lhs, rhs] = arithOrder(a, b);
        return rhs.to(lhs.constructor).mul(lhs);
    }
    else {
        const out = b.clone();
        switch (b.constructor) {
            case vec2_1.Vector2:
                gl_matrix_1.vec2.transformMat4(out, b, a);
                break;
            case vec3_1.Vector3:
                gl_matrix_1.vec3.transformMat4(out, b, a);
                break;
            default:
                gl_matrix_1.vec4.transformMat4(out, b, a);
                break;
        }
        return out;
    }
}
exports.mul = mul;
function div(a, b) {
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.to(lhs.constructor).div(lhs);
}
exports.div = div;
function dot(a, b) {
    return a.dot(b);
}
exports.dot = dot;
function cross(a, b) {
    return a.cross(b);
}
exports.cross = cross;
exports.Deg2Rad = Math.PI / 180;
exports.Rad2Deg = 180 / Math.PI;
//# sourceMappingURL=math.js.map