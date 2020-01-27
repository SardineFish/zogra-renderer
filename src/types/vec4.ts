import { Vector3, vec3 } from "./vec3";
import { Vector2, vec2 } from "./vec2";

export type vec4 = Vector4;

export class Vector4 extends Array<number>
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
        return this.clone().div(vec4(m, m, m, m));
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
    normalise()
    {
        const m = this.magnitude;
        return this.clone().div(vec4(m, m, m, m));
    }
    clone()
    {
        return vec4(this[0], this[1], this[2], this[3]);
    }
    to(type: Function)
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

export function vec4(x: number, y: number, z: number, w: number): Vector4
{
    return new Vector4(x, y, z, w);
}
vec4.zero = Vector4.zero;
vec4.one = Vector4.one;