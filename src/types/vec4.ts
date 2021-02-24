import { Vector3, vec3 } from "./vec3";
import { Vector2, vec2 } from "./vec2";

export interface Vector
{
    magnitude: number;
    normalized: ThisType<this>;
    equals(v: any): boolean;
}

export type vec4 = Vector4;

const V4Constructor: new (...p: [number, number, number, number]) => [number, number, number, number] = Array as any;
export class Vector4 extends V4Constructor implements Vector
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

    get normalized()
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
    plus(v: Vector4)
    {
        this[0] += v[0];
        this[1] += v[1];
        this[2] += v[2];
        this[3] += v[3];
        return this;
    }
    minus(v: Vector4)
    {
        this[0] -= v[0];
        this[1] -= v[1];
        this[2] -= v[2];
        this[3] -= v[3];
        return this;
    }
    mul(v: Vector4)
    {
        this[0] *= v[0];
        this[1] *= v[1];
        this[2] *= v[2];
        this[3] *= v[3];
        return this;
    }
    div(v: Vector4)
    {
        this[0] /= v[0];
        this[1] /= v[1];
        this[2] /= v[2];
        this[3] /= v[3];
        return this;
    }
    dot(v: Vector4)
    {
        return this[0] * v[0]
            + this[1] * v[1]
            + this[2] * v[2]
            + this[3] * v[3];
    }
    normalize()
    {
        const m = this.magnitude;
        return m == 0 ? vec4.zero() : this.clone().div(vec4(m, m, m, m));
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
    clone()
    {
        return vec4(this[0], this[1], this[2], this[3]);
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
vec4.zero = Vector4.zero;
vec4.one = Vector4.one;