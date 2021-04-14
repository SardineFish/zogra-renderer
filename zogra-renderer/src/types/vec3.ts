import { vec4, VecMathArgs, Vector4 } from "./vec4";
import { Vector2, vec2 } from "./vec2";
import { IClone, ISet, Vector, ZograMatrix } from "./generic";
import { wrapGlMatrix } from "./utils";
import { vec3 as glVec3 } from "gl-matrix";

export type vec3 = Vector3;

const V3Constructor: new (...p: [number, number, number]) => [number, number, number] = Array as any;
export class Vector3 extends V3Constructor implements Vector, ZograMatrix
{
    get x() { return this[0]; }
    set x(x: number) { this[0] = x; }
    get y() { return this[1]; }
    set y(y: number) { this[1] = y; }
    get z() { return this[2]; }
    set z(z: number) { this[2] = z; }

    get magnitude()
    {
        return Math.hypot(...this);
    }

    get normalized(): Vector3
    {
        const m = this.magnitude;
        return m == 0 ? vec3.zero() : this.clone().div(vec3(m, m, m));
    }

    get negative()
    {
        return this.clone().negate();
    }
    get inversed()
    {
        return this.clone().inverse();
    }

    constructor(x: number, y: number, z: number)
    {
        super(x, y, z);
    }
    static zero()
    {
        return new Vector3(0, 0, 0);
    }
    static one()
    {
        return new Vector3(1, 1, 1);
    }
    plus(v: Readonly<vec3>)
    {
        this[0] += v[0];
        this[1] += v[1];
        this[2] += v[2];
        return this;
    }
    minus(v: Readonly<vec3>)
    {
        this[0] -= v[0];
        this[1] -= v[1];
        this[2] -= v[2];
        return this;
    }
    mul(v: Readonly<vec3>)
    {
        this[0] *= v[0];
        this[1] *= v[1];
        this[2] *= v[2];
        return this;
    }
    div(v: Readonly<vec3>)
    {
        this[0] /= v[0];
        this[1] /= v[1];
        this[2] /= v[2];
        return this;
    }
    dot(v: Readonly<vec3>)
    {
        return this[0] * v[0]
            + this[1] * v[1]
            + this[2] * v[2];
    }
    normalize()
    {
        const m = this.magnitude;
        return m == 0 ? vec3.zero() : this.clone().div(vec3(m, m, m));
    }
    inverse()
    {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        this[2] = 1 / this[2];
        return this;
    }
    negate()
    {
        this[0] = -this[0];
        this[1] = -this[1];
        this[2] = -this[2];
        return this;
    }
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Readonly<vec3>)
    {
        return vec3(
            this.y * b.z - this.z * b.y,
            this.z * b.x - this.x * b.z,
            this.x * b.y - this.y * b.x
        );
    }

    set(v: Readonly<vec3>): this
    set(v: Readonly<number[]>): this
    set(v: Readonly<number[]> | Readonly<vec3>)
    {
        this[0] = v[0] || 0;
        this[1] = v[1] || 0;
        this[2] = v[2] || 0;
        return this;
    }

    setAll(n: number)
    {
        this[0] = this[1] = this[2] = n;
        return this;
    }

    clone(out = vec3.zero()): vec3
    {
        return out.set(this);
    }

    toVec2()
    {
        return vec2(this[0], this[1]);
    }

    equals(v: any)
    {
        if (v === undefined)
            return false;

        return v[0] === this[0]
            && v[1] === this[1]
            && v[2] === this[2];
    }

    static math<F extends (...args: number[]) => number>(func: F): (...args: VecMathArgs<Parameters<F>, Vector3>) => Vector3
    {
        return (...args: vec3[]) =>
        {
            return vec3(
                func(...args.map(v => v.x)),
                func(...args.map(v => v.y)),
                func(...args.map(v => v.z)),
            );
        };
    }

    __to(type: Function)
    {
        switch (type)
        {
            case Vector4:
                return vec4(this[0], this[1], this[2], 0);
            case Vector2:
                return vec2(this[0], this[1]);
        }
        return this.clone();
    }
}
export function vec3(x: number): Vector3
export function vec3(x: number, y: number, z: number): Vector3
export function vec3(x: number, y: number=x, z: number=x): Vector3
{
    return new Vector3(x, y, z);
}
vec3.from = (src: Iterable<number>) =>
{
    const [x = 0, y = 0, z = 0] = src;
    return vec3(x, y, z);
}
// vec3.floor = (v: vec3) => vec3(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z));
vec3.zero = Vector3.zero;
vec3.one = Vector3.one;
vec3.math = Vector3.math;
vec3.plus = wrapGlMatrix<vec3, [vec3, vec4 | vec3 | vec2 | number]>((out, a, b) =>
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
}, 2, vec3.zero);
vec3.minus = wrapGlMatrix<vec3, [vec3, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] - b;
        out[1] = a[1] - b;
        out[2] = a[2] - b;
    }
    else
    {
        out[0] = a[0] - b[0];
        out[1] = a[1] - (b[1] || 0);
        out[2] = a[2] - (b[2] || 0);
    }
    return out;
}, 2, vec3.zero);
vec3.mul = wrapGlMatrix<vec3, [vec3, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
    }
    else
    {
        out[0] = a[0] * b[0];
        out[1] = a[1] * (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] * (b[2] === undefined ? 1 : b[2]);
    }
    return out;
}, 2, vec3.zero);
vec3.div = wrapGlMatrix<vec3, [vec3, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] / b;
        out[1] = a[1] / b;
        out[2] = a[2] / b;
    }
    else
    {
        out[0] = a[0] / b[0];
        out[1] = a[1] / (b[1] === undefined ? 1 : b[1]);
        out[2] = a[2] / (b[2] === undefined ? 1 : b[2]);
    }
    return out;
}, 2, vec3.zero);