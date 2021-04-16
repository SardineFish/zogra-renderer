import { Vector3, vec3 } from "./vec3";
import { Vector2, vec2 } from "./vec2";
import { Vector, ZograMatrix } from "./generic";
import { vec4 as glVec4 } from "gl-matrix";
import { wrapGlMatrix } from "./utils";

export type vec4 = Vector4;

export type VecMathArgs<T, U> = T extends number[] ? { [key in keyof T]: U } : never;

const V4Constructor: new (...p: [number, number, number, number]) => [number, number, number, number] = Array as any;
export class Vector4 extends V4Constructor implements Vector, ZograMatrix
{
    get x() { return this[0]; }
    set x(x: number) { this[0] = x; }
    get y() { return this[1]; }
    set y(y: number) { this[1] = y; }
    get z() { return this[2]; }
    set z(z: number) { this[2] = z; }
    get w() { return this[3]; }
    set w(w: number) { this[3] = w }

    get magnitude()
    {
        return Math.hypot(...this);
    }

    get normalized(): Vector4
    {
        const m = this.magnitude;
        return m == 0 ? vec4.zero() : this.clone().div(vec4(m, m, m, m));
    }
    get negative()
    {
        return this.clone().negate();
    }
    get inversed()
    {
        return this.clone().inverse();
    }

    constructor(x: number, y: number, z: number = 0, w: number = 0)
    {
        super(x, y, z || 0, w || 0);
    }

    static zero()
    {
        return new Vector4(0, 0, 0, 0);
    }
    static one()
    {
        return new Vector4(1, 1, 1, 1);
    }
    asMut() { return this; }
    plus(v: Readonly<vec4>)
    {
        this[0] += v[0];
        this[1] += v[1];
        this[2] += v[2];
        this[3] += v[3];
        return this;
    }
    minus(v: Readonly<vec4>)
    {
        this[0] -= v[0];
        this[1] -= v[1];
        this[2] -= v[2];
        this[3] -= v[3];
        return this;
    }
    mul(v: Readonly<vec4>)
    {
        this[0] *= v[0];
        this[1] *= v[1];
        this[2] *= v[2];
        this[3] *= v[3];
        return this;
    }
    div(v: Readonly<vec4>)
    {
        this[0] /= v[0];
        this[1] /= v[1];
        this[2] /= v[2];
        this[3] /= v[3];
        return this;
    }
    dot(v: Readonly<vec4>)
    {
        return this[0] * v[0]
            + this[1] * v[1]
            + this[2] * v[2]
            + this[3] * v[3];
    }
    normalize()
    {
        return vec4.normalize(this, this);
    }
    inverse()
    {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        this[2] = 1 / this[2];
        this[3] = 1 / this[3];
        return this;
    }
    negate()
    {
        this[0] = -this[0];
        this[1] = -this[1];
        this[2] = -this[2];
        this[3] = -this[3];
        return this;
    }
    clone(out: vec4 = vec4.zero()): vec4
    {
        return out.set(this);
    }
    equals(v: any)
    {
        if (v === undefined)
            return false;

        return v[0] === this[0]
            && v[1] === this[1]
            && v[2] === this[2]
            && v[3] === this[3];
    }
    set(v: Readonly<vec4>): this
    set(v: Readonly<ArrayLike<number>>): this
    set(v: Readonly<ArrayLike<number>> | Readonly<vec4>)
    {
        this[0] = v[0] || 0;
        this[1] = v[1] || 0;
        this[2] = v[2] || 0;
        this[3] = v[3] || 0;
        return this;
    }
    fill(n: number)
    {
        this[0] = this[1] = this[2] = this[3] = n;
        return this;
    }
    static math<F extends (...args: number[]) => number>(func: F): (...args: VecMathArgs<Parameters<F>, Readonly<vec4>>) => vec4
    {
        return (...args: Readonly<vec4>[]) =>
        {
            return vec4(
                func(...args.map(v => v.x)),
                func(...args.map(v => v.y)),
                func(...args.map(v => v.z)),
                func(...args.map(v => v.w)),
            );
        };
    }

    __to(type: Function)
    {
        switch (type)
        {
            case Vector4:
                return this.clone();
            case Vector3:
                return vec3(this[0], this[1], this[2]);
            case Vector2:
                return vec2(this[0], this[1]);
        }
        return this.clone();
    }
}
export function vec4(x: number): Vector4
export function vec4(x:number, y: number, z: number, w: number): Vector4
export function vec4(x: number, y: number = x, z: number = x, w: number = x): Vector4
{
    return new Vector4(x, y, z, w);
}
vec4.from = (src: Iterable<number>) =>
{
    const [x = 0, y = 0, z = 0, w=0] = src;
    return vec4(x, y, z, w);
}
vec4.floor = (v: vec4) => vec4(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z), Math.floor(v.w));
vec4.zero = Vector4.zero;
vec4.one = Vector4.one;
vec4.math = Vector4.math;
vec4.normalize = wrapGlMatrix<vec4, [vec4]>(glVec4.normalize as any, 1, vec4.zero);
vec4.plus = wrapGlMatrix<vec4, [vec4, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] + b;
        out[1] = a[1] + b;
        out[2] = a[2] + b;
        out[3] = a[3] + b;
    }
    else
    {
        out[0] = a[0] + b[0];
        out[1] = a[1] + (b[1] || 0);
        out[2] = a[2] + (b[2] || 0);
        out[3] = a[3] + (b[3] || 0);
    }
    return out;
}, 2, vec4.zero);
vec4.minus = wrapGlMatrix<vec4, [vec4, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] - b;
        out[1] = a[1] - b;
        out[2] = a[2] - b;
        out[3] = a[3] - b;
    }
    else
    {
        out[0] = a[0] - b[0];
        out[1] = a[1] - (b[1] || 0);
        out[2] = a[2] - (b[2] || 0);
        out[3] = a[3] - (b[3] || 0);
    }
    return out;
}, 2, vec4.zero);
vec4.mul = wrapGlMatrix<vec4, [vec4, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
    }
    else
    {
        out[0] = a[0] * b[0];
        out[1] = a[1] * (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] * (b[2] === undefined ? 1 : b[2]);
        out[3] = a[3] * (b[3] === undefined ? 1 : b[3]);
    }
    return out;
}, 2, vec4.zero);
vec4.div = wrapGlMatrix<vec4, [vec4, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] / b;
        out[1] = a[1] / b;
        out[2] = a[2] / b;
        out[3] = a[3] / b;
    }
    else
    {
        out[0] = a[0] / b[0];
        out[1] = a[1] / (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] / (b[2] === undefined ? 1 : b[2]);
        out[3] = a[3] / (b[3] === undefined ? 1 : b[3]);
    }
    return out;
}, 2, vec4.zero);
vec4.set = wrapGlMatrix<vec4, [vec4]>((out, v) =>
{
    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];
    out[3] = v[3];
    return out;
}, 1, vec4.zero);
vec4.fill = wrapGlMatrix<vec4, [number]>((out, n) =>
{
    out[0] = out[1] = out[2] = out[3] = n;
    return out;
}, 1, vec4.zero);