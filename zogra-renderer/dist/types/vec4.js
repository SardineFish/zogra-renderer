"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec4 = exports.Vector4 = void 0;
const vec3_1 = require("./vec3");
const vec2_1 = require("./vec2");
const gl_matrix_1 = require("gl-matrix");
const utils_1 = require("./utils");
const V4Constructor = Array;
class Vector4 extends V4Constructor {
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
        return m == 0 ? vec4.zero() : this.clone().div(vec4(m, m, m, m));
    }
    get negative() {
        return this.clone().negate();
    }
    get inversed() {
        return this.clone().inverse();
    }
    constructor(x, y, z = 0, w = 0) {
        super(x, y, z || 0, w || 0);
    }
    static zero() {
        return new Vector4(0, 0, 0, 0);
    }
    static one() {
        return new Vector4(1, 1, 1, 1);
    }
    asMut() { return this; }
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
    normalize() {
        return vec4.normalize(this, this);
    }
    inverse() {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        this[2] = 1 / this[2];
        this[3] = 1 / this[3];
        return this;
    }
    negate() {
        this[0] = -this[0];
        this[1] = -this[1];
        this[2] = -this[2];
        this[3] = -this[3];
        return this;
    }
    clone(out = vec4.zero()) {
        return out.set(this);
    }
    equals(v) {
        if (v === undefined)
            return false;
        return v[0] === this[0]
            && v[1] === this[1]
            && v[2] === this[2]
            && v[3] === this[3];
    }
    set(v) {
        this[0] = v[0] || 0;
        this[1] = v[1] || 0;
        this[2] = v[2] || 0;
        this[3] = v[3] || 0;
        return this;
    }
    fill(n) {
        this[0] = this[1] = this[2] = this[3] = n;
        return this;
    }
    static math(func) {
        return (...args) => {
            return vec4(func(...args.map(v => v.x)), func(...args.map(v => v.y)), func(...args.map(v => v.z)), func(...args.map(v => v.w)));
        };
    }
    __to(type) {
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
function vec4(x, y = x, z = x, w = x) {
    return new Vector4(x, y, z, w);
}
exports.vec4 = vec4;
vec4.from = (src) => {
    const [x = 0, y = 0, z = 0, w = 0] = src;
    return vec4(x, y, z, w);
};
vec4.floor = (v) => vec4(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z), Math.floor(v.w));
vec4.zero = Vector4.zero;
vec4.one = Vector4.one;
vec4.math = Vector4.math;
vec4.normalize = utils_1.wrapGlMatrix(gl_matrix_1.vec4.normalize, 1, vec4.zero);
vec4.plus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] + b;
        out[1] = a[1] + b;
        out[2] = a[2] + b;
        out[3] = a[3] + b;
    }
    else {
        out[0] = a[0] + b[0];
        out[1] = a[1] + (b[1] || 0);
        out[2] = a[2] + (b[2] || 0);
        out[3] = a[3] + (b[3] || 0);
    }
    return out;
}, 2, vec4.zero);
vec4.minus = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] - b;
        out[1] = a[1] - b;
        out[2] = a[2] - b;
        out[3] = a[3] - b;
    }
    else {
        out[0] = a[0] - b[0];
        out[1] = a[1] - (b[1] || 0);
        out[2] = a[2] - (b[2] || 0);
        out[3] = a[3] - (b[3] || 0);
    }
    return out;
}, 2, vec4.zero);
vec4.mul = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
    }
    else {
        out[0] = a[0] * b[0];
        out[1] = a[1] * (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] * (b[2] === undefined ? 1 : b[2]);
        out[3] = a[3] * (b[3] === undefined ? 1 : b[3]);
    }
    return out;
}, 2, vec4.zero);
vec4.div = utils_1.wrapGlMatrix((out, a, b) => {
    if (typeof (b) === "number") {
        out[0] = a[0] / b;
        out[1] = a[1] / b;
        out[2] = a[2] / b;
        out[3] = a[3] / b;
    }
    else {
        out[0] = a[0] / b[0];
        out[1] = a[1] / (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] / (b[2] === undefined ? 1 : b[2]);
        out[3] = a[3] / (b[3] === undefined ? 1 : b[3]);
    }
    return out;
}, 2, vec4.zero);
vec4.set = utils_1.wrapGlMatrix((out, v) => {
    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];
    out[3] = v[3];
    return out;
}, 1, vec4.zero);
vec4.fill = utils_1.wrapGlMatrix((out, n) => {
    out[0] = out[1] = out[2] = out[3] = n;
    return out;
}, 1, vec4.zero);
//# sourceMappingURL=vec4.js.map