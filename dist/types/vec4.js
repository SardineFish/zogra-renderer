"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("./vec3");
const vec2_1 = require("./vec2");
class Vector4 extends Array {
    get x() { return this[0]; }
    set x(x) { this[0] = x; }
    get y() { return this[1]; }
    set y(y) { this[1] = y; }
    get z() { return this[2]; }
    set z(z) { this[2] = z; }
    get w() { return this[3]; }
    set w(w) { this[3] = w; }
    get magnitude() {
        return Math.hypot(...this);
    }
    get normalized() {
        const m = this.magnitude;
        return this.clone().div(vec4(m, m, m, m));
    }
    constructor(x, y, z = 0, w = 0) {
        super(x, y, z || 0, w || 0);
    }
    plus(v) {
        this[0] += v[0];
        this[1] += v[1];
        this[2] += v[2];
        this[3] += v[3];
        return this;
    }
    minus(v) {
        this[0] -= v[0];
        this[1] -= v[1];
        this[2] -= v[2];
        this[3] -= v[3];
        return this;
    }
    mul(v) {
        this[0] *= v[0];
        this[1] *= v[1];
        this[2] *= v[2];
        this[3] *= v[3];
        return this;
    }
    div(v) {
        this[0] /= v[0];
        this[1] /= v[1];
        this[2] /= v[2];
        this[3] /= v[3];
        return this;
    }
    dot(v) {
        return this[0] * v[0]
            + this[1] * v[1]
            + this[2] * v[2]
            + this[3] * v[3];
    }
    normalise() {
        const m = this.magnitude;
        return this.clone().div(vec4(m, m, m, m));
    }
    clone() {
        return vec4(this[0], this[1], this[2], this[3]);
    }
    to(type) {
        switch (type) {
            case Vector4:
                return this.clone();
            case vec3_1.Vector3:
                return vec3_1.vec3(this[0], this[1], this[2]);
            case vec2_1.Vector2:
                return vec2_1.vec2(this[0], this[1]);
        }
        return this.clone();
    }
}
exports.Vector4 = Vector4;
function vec4(x, y, z, w) {
    return new Vector4(x, y, z, w);
}
exports.vec4 = vec4;
//# sourceMappingURL=vec4.js.map