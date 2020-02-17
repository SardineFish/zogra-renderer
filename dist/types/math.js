"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("./vec3");
const vec4_1 = require("./vec4");
const vec2_1 = require("./vec2");
Number.prototype.__to = function (type) {
    switch (type) {
        case vec4_1.Vector4:
            return vec4_1.vec4(this.valueOf(), this.valueOf(), this.valueOf(), this.valueOf());
        case vec3_1.Vector3:
            return vec3_1.vec3(this.valueOf(), this.valueOf(), this.valueOf());
        case vec2_1.Vector2:
            return vec2_1.vec2(this.valueOf(), this.valueOf());
    }
    return this.valueOf();
};
function arithOrder(a, b) {
    if (typeof (a) === "number")
        return [b, a, true];
    else if (typeof (b) === "number")
        return [a, b, false];
    return (b.length > a.length ? [b, a, true] : [a, b, false]);
}
function plus(a, b) {
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.__to(lhs.constructor).plus(lhs);
}
exports.plus = plus;
function minus(a, b) {
    const [lhs, rhs, invert] = arithOrder(a, b);
    return invert
        ? rhs.__to(lhs.constructor).minus(lhs)
        : rhs.__to(lhs.constructor).minus(lhs).negate();
}
exports.minus = minus;
function mul(a, b) {
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.__to(lhs.constructor).mul(lhs);
}
exports.mul = mul;
function div(a, b) {
    const [lhs, rhs, invert] = arithOrder(a, b);
    return invert
        ? rhs.__to(lhs.constructor).div(lhs)
        : rhs.__to(lhs.constructor).div(lhs).inversed;
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