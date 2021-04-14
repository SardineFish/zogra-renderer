"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec2 = exports.Vector2 = void 0;
const vec4_1 = require("./vec4");
const vec3_1 = require("./vec3");
const utils_1 = require("./utils");
const V2Constructor = Array;
class Vector2 extends V2Constructor {
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
    static distance(u, v) {
        return Math.sqrt((u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y));
    }
    static distanceSquared(u, v) {
        return (u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y);
    }
    static math(func) {
        return (...args) => {
            return vec2(func(...args.map(v => v.x)), func(...args.map(v => v.y)));
        };
    }
    asMut() { return this; }
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
        let x = typeof (v) === "number" ? v : v.x;
        let y = typeof (v) === "number" ? v : v.y;
        this[0] *= x;
        this[1] *= y;
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
    equals(v) {
        if (v === undefined)
            return false;
        return v[0] === this[0] && v[1] === this[1];
    }
    clone(out = vec2.zero()) {
        return out.set(this);
    }
    set(v) {
        this[0] = v[0] || 0;
        this[1] = v[1] || 0;
        return this;
    }
    setAll(n) {
        this[0] = this[1] = n;
        return this;
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
vec2.floor = (v) => vec2(Math.floor(v.x), Math.floor(v.y));
vec2.zero = Vector2.zero;
vec2.one = Vector2.one;
vec2.left = Vector2.left;
vec2.right = Vector2.right;
vec2.down = Vector2.down;
vec2.up = Vector2.up;
vec2.math = Vector2.math;
vec2.plus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] + b;
        out[1] = a[1] + b;
    }
    else {
        out[0] = a[0] + b[0];
        out[1] = a[1] + (b[1] || 0);
    }
    return out;
}, 2, vec2.zero);
vec2.minus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] - b;
        out[1] = a[1] - b;
    }
    else {
        out[0] = a[0] - b[0];
        out[1] = a[1] - (b[1] || 0);
    }
    return out;
}, 2, vec2.zero);
vec2.mul = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
    }
    else {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
    }
    return out;
}, 2, vec2.zero);
vec2.div = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] / b;
        out[1] = a[1] / b;
    }
    else {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
    }
    return out;
}, 2, vec2.zero);
//# sourceMappingURL=vec2.js.map