import { vec4, Vector4 } from "./vec4";
import { Vector3, vec3 } from "./vec3";
import { wrapGlMatrix } from "./utils";
import { vec2 as glVec2 } from "gl-matrix";
const V2Constructor = Array;
export class Vector2 extends V2Constructor {
    get x() { return this[0]; }
    set x(x) { this[0] = x; }
    get y() { return this[1]; }
    set y(y) { this[1] = y; }
    get magnitude() {
        return Math.hypot(...this);
    }
    get magnitudeSqr() {
        return this[0] * this[0] + this[1] * this[1];
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
    get isZero() {
        return this.x === 0 && this.y === 0;
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
        return vec2.plus(this, this, v);
    }
    minus(v) {
        return vec2.minus(this, this, v);
    }
    mul(v) {
        return vec2.mul(this, this, v);
    }
    div(v) {
        return vec2.div(this, this, v);
    }
    dot(v) {
        return this[0] * v[0]
            + this[1] * v[1];
    }
    normalize() {
        return vec2.normalize(this, this);
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
    /** 1 - this */
    oneMinus() {
        this[0] = 1 - this[0];
        this[1] = 1 - this[1];
        return this;
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
    fill(n) {
        this[0] = this[1] = n;
        return this;
    }
    toVec3(z = 0) {
        return vec3(this[0], this[1], z);
    }
    __to(type) {
        switch (type) {
            case Vector4:
                return vec4(this[0], this[1], 0, 0);
            case Vector3:
                return vec3(this[0], this[1], 0);
        }
        return this.clone();
    }
}
export function vec2(x, y = x) {
    return new Vector2(x, y);
}
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
vec2.plus = wrapGlMatrix((out, a, b) => {
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
vec2.minus = wrapGlMatrix((out, a, b) => {
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
vec2.mul = wrapGlMatrix((out, a, b) => {
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
vec2.div = wrapGlMatrix((out, a, b) => {
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
vec2.exp = wrapGlMatrix((out, x) => {
    if (typeof (x) === "number") {
        out[0] = Math.exp(x);
        out[1] = Math.exp(x);
    }
    else {
        out[0] = Math.exp(x[0]);
        out[1] = Math.exp(x[1]);
    }
    return out;
}, 1, vec2.zero);
vec2.inverse = wrapGlMatrix((out, v) => {
    out[0] = 1 / v[0];
    out[1] = 1 / v[1];
    return out;
}, 1, vec2.zero);
vec2.dot = (a, b) => {
    return a[0] * b[0] + a[1] * b[1];
};
vec2.cross = (a, b) => {
    return a[0] * b[1] - a[1] * b[0];
};
vec2.normalize = wrapGlMatrix(glVec2.normalize, 1, vec2.zero);
vec2.perpendicular = wrapGlMatrix((out, v) => {
    out[0] = -v[1];
    out[1] = v[0];
    return out;
}, 1, vec2.zero);
vec2.set = wrapGlMatrix((out, v) => {
    out[0] = v[0];
    out[1] = v[1];
    return out;
}, 1, vec2.zero);
vec2.fill = wrapGlMatrix((out, n) => {
    out[0] = out[1] = n;
    return out;
}, 1, vec2.zero);
//# sourceMappingURL=vec2.js.map