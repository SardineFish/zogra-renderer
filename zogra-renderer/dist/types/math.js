"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rad2Deg = exports.Deg2Rad = exports.boxRaycast = exports.distance = exports.cross = exports.dot = exports.div = exports.mul = exports.minus = exports.plus = void 0;
const vec3_1 = require("./vec3");
const vec4_1 = require("./vec4");
const vec2_1 = require("./vec2");
const mat4_1 = require("./mat4");
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
function allocateOutput(a, b) {
    let length = Math.max(a.length || 0, b.length || 0);
    switch (length) {
        case 2:
            return typeof (a) === "number" ? vec2_1.vec2.fill(a) : vec2_1.vec2.set(a);
        case 3:
            return typeof (a) === "number" ? vec2_1.vec2.fill(a) : vec3_1.vec3.set(a);
        case 4:
            return typeof (a) === "number" ? vec2_1.vec2.fill(a) : vec4_1.vec4.set(a);
        case 16:
            return typeof (a) === "number" ? vec2_1.vec2.fill(a) : mat4_1.mat4.set(a);
    }
    console.warn(`Unsupported vector length '${length}'`);
    return new Array();
}
function plus(a, b, out) {
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b);
    let output = (out || allocateOutput(a, b));
    switch (output.length) {
        case 2:
            return vec2_1.vec2.plus(output, output, b);
        case 3:
            return vec3_1.vec3.plus(output, output, b);
        case 4:
            return vec4_1.vec4.plus(output, output, b);
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4_1.vec4.plus(output, output, b);
}
exports.plus = plus;
function minus(a, b, out) {
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b);
    let output = (out || allocateOutput(a, b));
    switch (output.length) {
        case 2:
            return vec2_1.vec2.minus(output, output, b);
        case 3:
            return vec3_1.vec3.minus(output, output, b);
        case 4:
            return vec4_1.vec4.minus(output, output, b);
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4_1.vec4.minus(output, output, b);
}
exports.minus = minus;
function mul(a, b, out) {
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b);
    let output = (out || allocateOutput(a, b));
    switch (output.length) {
        case 2:
            return vec2_1.vec2.mul(output, output, b);
        case 3:
            return vec3_1.vec3.mul(output, output, b);
        case 4:
            return vec4_1.vec4.mul(output, output, b);
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4_1.vec4.mul(output, output, b);
}
exports.mul = mul;
function div(a, b, out) {
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b);
    let output = (out || allocateOutput(a, b));
    switch (output.length) {
        case 2:
            return vec2_1.vec2.div(output, output, b);
        case 3:
            return vec3_1.vec3.div(output, output, b);
        case 4:
            return vec4_1.vec4.div(output, output, b);
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4_1.vec4.div(output, output, b);
}
exports.div = div;
function dot(a, b) {
    switch (a.length) {
        case 2:
            return a[0] * b[0] + a[1] * b[1];
        case 3:
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        case 4:
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
}
exports.dot = dot;
function cross(a, b, out = vec3_1.vec3.zero()) {
    out[0] = a[1] * b[2] - a[2] * b[1];
    out[1] = a[2] * b[0] - a[0] * b[2];
    out[2] = a[0] * b[1] - a[1] * b[0];
    return out;
}
exports.cross = cross;
function distance(a, b) {
    return Math.hypot((b[0] - a[0]) || 0, (b[1] - a[1]) || 0, (b[2] - a[2]) || 0, (b[3] - a[3]) || 0);
}
exports.distance = distance;
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