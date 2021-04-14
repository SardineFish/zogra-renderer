import { vec4, VecMathArgs, Vector4 } from "./vec4";
import { Vector3, vec3 } from "./vec3";
import { Vector, ZograMatrix } from "./generic";
import { wrapGlMatrix } from "./utils";
import { vec2 as glVec2 } from "gl-matrix";

export type vec2 = Vector2;

const V2Constructor: new (...p: [number, number]) => [number, number] = Array as any;
export class Vector2 extends V2Constructor implements Vector, ZograMatrix
{
    get x() { return this[0]; }
    set x(x: number) { this[0] = x; }
    get y() { return this[1]; }
    set y(y: number) { this[1] = y; }

    get magnitude()
    {
        return Math.hypot(...this);
    }

    get normalized(): Vector2
    {
        const m = this.magnitude;
        return m == 0 ? vec2.zero() : this.clone().div(vec2(m, m));
    }
    get negative()
    {
        return this.clone().negate();
    }
    get inversed()
    {
        return this.clone().inverse();
    }

    constructor(x: number, y: number)
    {
        super(x, y);
    }
    static zero()
    {
        return new Vector2(0, 0);
    }
    static one()
    {
        return new Vector2(1, 1);
    }
    static up()
    {
        return new Vector2(0, 1);
    }
    static down()
    {
        return new Vector2(0, -1);
    }
    static left() { return new Vector2(-1, 0) }
    static right() { return new Vector2(1, 0) }
    static distance(u: Vector2, v: Vector2)
    {
        return Math.sqrt((u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y));
    }
    static distanceSquared(u: Vector2, v: Vector2)
    {
        return (u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y);
    }

    static math<F extends (...args: number[]) => number>(func: F): (...args: VecMathArgs<Parameters<F>, Vector2>) => Vector2
    {
        return (...args: vec2[]) =>
        {
            return vec2(
                func(...args.map(v => v.x)),
                func(...args.map(v => v.y)),
            );
        };
    }
    
    plus(v: Readonly<Vector2>)
    {
        this[0] += v[0];
        this[1] += v[1];
        return this;
    }
    minus(v: Readonly<Vector2>)
    {
        this[0] -= v[0];
        this[1] -= v[1];
        return this;
    }
    mul(v: Readonly<Vector2> | number)
    {
        let x = typeof (v) === "number" ? v : v.x;
        let y = typeof (v) === "number" ? v : v.y;
        this[0] *= x;
        this[1] *= y;
        return this;
    }
    div(v: Readonly<Vector2>)
    {
        this[0] /= v[0];
        this[1] /= v[1];
        return this;
    }
    dot(v: Readonly<Vector2>)
    {
        return this[0] * v[0]
            + this[1] * v[1];
    }
    normalize()
    {
        const m = this.magnitude;
        return m == 0 ? vec2.zero() : this.clone().div(vec2(m, m));
    }
    inverse()
    {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        return this;
    }
    negate()
    {
        this[0] = -this[0];
        this[1] = -this[1];
        return this;
    }
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Vector2)
    {
        return this.x * b.y - this.y * b.x;
    }

    equals(v: any)
    {
        if (v === undefined)
            return false;

        return v[0] === this[0] && v[1] === this[1];
    }

    clone(out: vec2 = vec2.zero()): vec2
    {
        return out.set(this);
    }

    set(v: Readonly<vec2>): this
    set(v: Readonly<number[]>): this
    set(v: Readonly<number[]> | Readonly<vec2>)
    {
        this[0] = v[0] || 0;
        this[1] = v[1] || 0;
        return this;
    }

    setAll(n: number)
    {
        this[0] = this[1] = n;
        return this;
    }

    toVec3(z = 0)
    {
        return vec3(this[0], this[1], z);
    }
    __to(type: Function)
    {
        switch (type)
        {
            case Vector4:
                return vec4(this[0], this[1], 0, 0);
            case Vector3:
                return vec3(this[0], this[1], 0);
        }
        return this.clone();
    }
}
export function vec2(x: number): Vector2
export function vec2(x: number, y: number): Vector2
export function vec2(x: number, y = x): Vector2
{
    return new Vector2(x, y);
}
vec2.from = (src: Iterable<number>) =>
{
    const [x = 0, y = 0] = src;
    return vec2(x, y);
}

vec2.floor = (v: vec2) => vec2(Math.floor(v.x), Math.floor(v.y));
vec2.zero = Vector2.zero;
vec2.one = Vector2.one;
vec2.left = Vector2.left;
vec2.right = Vector2.right;
vec2.down = Vector2.down;
vec2.up = Vector2.up;
vec2.math = Vector2.math;

vec2.plus = wrapGlMatrix<vec2, [vec2, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] + b;
        out[1] = a[1] + b;
    }
    else
    {
        out[0] = a[0] + b[0];
        out[1] = a[1] + (b[1] || 0);
    }
    return out;
}, 2, vec2.zero);
vec2.minus = wrapGlMatrix<vec2, [vec2, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] - b;
        out[1] = a[1] - b;
    }
    else
    {
        out[0] = a[0] - b[0];
        out[1] = a[1] - (b[1] || 0);
    }
    return out;
}, 2, vec2.zero);
vec2.mul = wrapGlMatrix<vec2, [vec2, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
    }
    else
    {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
    }
    return out;
}, 2, vec2.zero);
vec2.div = wrapGlMatrix<vec2, [vec2, vec4 | vec3 | vec2 | number]>((out, a, b) =>
{
    if (typeof (b) === "number")
    {
        out[0] = a[0] / b;
        out[1] = a[1] / b;
    }
    else
    {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
    }
    return out;
}, 2, vec2.zero);