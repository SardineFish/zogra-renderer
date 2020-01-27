import { vec4, Vector4 } from "./vec4";
import { Vector2, vec2 } from "./vec2";

export type vec3 = Vector3;

export class Vector3 extends Array<number>
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

    get normalized()
    {
        const m = this.magnitude;
        return this.clone().div(vec3(m, m, m));
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
    plus(v: Vector3)
    {
        this[0] += v[0];
        this[1] += v[1];
        this[2] += v[2];
        return this;
    }
    minus(v: Vector3)
    {
        this[0] -= v[0];
        this[1] -= v[1];
        this[2] -= v[2];
        return this;
    }
    mul(v: Vector3)
    {
        this[0] *= v[0];
        this[1] *= v[1];
        this[2] *= v[2];
        return this;
    }
    div(v: Vector3)
    {
        this[0] /= v[0];
        this[1] /= v[1];
        this[2] /= v[2];
        return this;
    }
    dot(v: Vector3)
    {
        return this[0] * v[0]
            + this[1] * v[1]
            + this[3] * v[3];
    }
    normalise()
    {
        const m = this.magnitude;
        return this.clone().div(vec3(m, m, m));
    }
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Vector3)
    {
        return vec3(
            this.y * b.z - this.z * b.y,
            this.x * b.z - this.z * b.x,
            this.x * b.y - this.y * b.x
        );
    }

    clone()
    {
        return vec3(this[0], this[1], this[2]);
    }

    to(type: Function)
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

export function vec3(x: number, y: number, z: number): Vector3
{
    return new Vector3(x, y, z);
}
vec3.zero = Vector3.zero;
vec3.one = Vector3.one;