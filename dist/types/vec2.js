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
        return m == 0 ? vec2.zero() : this.clone().div(vec2(m, m));
    }
    get negative() {
        return this.clone().negate();
    }
    get inversed() {
        return this.clone().inverse();
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
    static up() {
        return new Vector2(0, 1);
    }
    static down() {
        return new Vector2(0, -1);
    }
    static left() { return new Vector2(-1, 0); }
    static right() { return new Vector2(1, 0); }
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
        return m == 0 ? vec2.zero() : this.clone().div(vec2(m, m));
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
    toVec3(z = 0) {
        return vec3_1.vec3(this[0], this[1], z);
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
function vec2(x, y = x) {
    return new Vector2(x, y);
}
exports.vec2 = vec2;
vec2.from = (src) => {
    const [x = 0, y = 0] = src;
    return vec2(x, y);
};
vec2.zero = Vector2.zero;
vec2.one = Vector2.one;
vec2.left = Vector2.left;
vec2.right = Vector2.right;
vec2.down = Vector2.down;
vec2.up = Vector2.up;
//# sourceMappingURL=vec2.js.map