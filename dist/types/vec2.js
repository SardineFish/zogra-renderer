"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec4_1 = require("./vec4");
const vec3_1 = require("./vec3");
class Vector2 extends Array {
    get x() { return this[0]; }
    set x(x) { this[0] = x; }
    get y() { return this[1]; }
    set y(y) { this[1] = y; }
    get magnitude() {
        return Math.hypot(...this);
    }
    get normalized() {
        const m = this.magnitude;
        return this.clone().div(vec2(m, m));
    }
    constructor(x, y) {
        super(x, y);
    }
    static zero() {
        return new Vector2(0, 0);
    }
    static one() {
        return new Vector2(1, 1);
    }
    plus(v) {
        this[0] += v[0];
        this[1] += v[1];
        return this;
    }
    minus(v) {
        this[0] -= v[0];
        this[1] -= v[1];
        return this;
    }
    mul(v) {
        this[0] *= v[0];
        this[1] *= v[1];
        return this;
    }
    div(v) {
        this[0] /= v[0];
        this[1] /= v[1];
        return this;
    }
    dot(v) {
        return this[0] * v[0]
            + this[1] * v[1];
    }
    normalize() {
        const m = this.magnitude;
        return this.clone().div(vec2(m, m));
    }
    inverse() {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        return this;
    }
    negate() {
        this[0] = -this[0];
        this[1] = -this[1];
        return this;
    }
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b) {
        return this.x * b.y - this.y * b.x;
    }
    clone() {
        return vec2(this[0], this[1]);
    }
    __to(type) {
        switch (type) {
            case vec4_1.Vector4:
                return vec4_1.vec4(this[0], this[1], 0, 0);
            case vec3_1.Vector3:
                return vec3_1.vec3(this[0], this[1], 0);
        }
        return this.clone();
    }
}
exports.Vector2 = Vector2;
function vec2(x, y) {
    return new Vector2(x, y);
}
exports.vec2 = vec2;
vec2.zero = Vector2.zero;
vec2.one = Vector2.one;
//# sourceMappingURL=vec2.js.map