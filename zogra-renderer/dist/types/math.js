"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rad2Deg = exports.Deg2Rad = exports.boxRaycast = exports.floor2 = exports.distance = exports.cross = exports.dot = exports.div = exports.mul = exports.minus = exports.plus = void 0;
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
function distance(a, b) {
    return minus(b, a).magnitude;
}
exports.distance = distance;
function floor2(v) {
    return vec2_1.vec2(Math.floor(v.x), Math.floor(v.y));
}
exports.floor2 = floor2;
function boxRaycast(box, center, direction) {
    direction = direction.normalized;
    if (direction.x == 0 && direction.y == 0)
        return [false, 0, vec2_1.vec2.zero()];
    let tMin = vec2_1.vec2.zero();
    let tMax = vec2_1.vec2.zero();
    if (direction.x == 0) {
        tMin.y = (box.yMin - center.y) / direction.y;
        tMax.y = (box.yMax - center.y) / direction.y;
        tMin.x = tMax.x = Number.NEGATIVE_INFINITY;
        if (box.xMin <= center.x && center.x <= box.xMax) {
            if (tMin.y < tMax.y)
                return [true, tMin.y, vec2_1.vec2(0, -1)];
            return [true, tMax.y, vec2_1.vec2(0, 1)];
        }
        return [false, 0, vec2_1.vec2.zero()];
    }
    if (direction.y == 0) {
        tMin.x = (box.xMin - center.x) / direction.x;
        tMax.x = (box.xMax - center.x) / direction.x;
        tMin.y = tMax.y = Number.NEGATIVE_INFINITY;
        if (box.yMin <= center.y && center.y <= box.yMax) {
            if (tMin.x < tMax.x)
                return [true, tMin.x, vec2_1.vec2(-1, 0)];
            return [true, tMax.x, vec2_1.vec2(1, 0)];
        }
        return [false, 0, vec2_1.vec2.zero()];
    }
    tMin = minus(box.min, center).div(direction); // distance to box min lines (X and Y)
    tMax = minus(box.max, center).div(direction); // distance to box max lines (X and Y)
    var minXT = tMin.x; // min distance to vertical line
    var maxXT = tMax.x; // max distance to vertical line
    var minXNormal = vec2_1.vec2(-1, 0); // Vector2.left; // normal of the vertical line which has minimal distance to center
    var minYT = tMin.y;
    var maxYT = tMax.y;
    var minYNormal = vec2_1.vec2(0, -1); // Vector2.down;
    if (tMin.x > tMax.x) {
        minXT = tMax.x;
        maxXT = tMin.x;
        minXNormal = vec2_1.vec2(1, 0); // Vector2.right;
    }
    if (tMin.y > tMax.y) {
        minYT = tMax.y;
        maxYT = tMin.y;
        minYNormal = vec2_1.vec2(0, 1); // Vector2.up;
    }
    if (minYT > maxXT || minXT > maxYT) {
        return [false, 0, vec2_1.vec2.zero()];
    }
    else if (minXT > minYT) {
        return [true, minXT, minXNormal];
    }
    return [true, minYT, minYNormal];
}
exports.boxRaycast = boxRaycast;
exports.Deg2Rad = Math.PI / 180;
exports.Rad2Deg = 180 / Math.PI;
//# sourceMappingURL=math.js.map