import { vec4, Vector4 } from "./vec4";
import { Vector3, vec3 } from "./vec3";

export type vec2 = Vector2;

export class Vector2 extends Array<number>
{
    get x() { return this[0]; }
    set x(x: number) { this[0] = x; }
    get y() { return this[1]; }
    set y(y: number) { this[1] = y; }

    get magnitude()
    {
        return Math.hypot(...this);
    }

    get normalized()
    {
        const m = this.magnitude;
        return m == 0 ? vec2.zero() : this.clone().div(vec2(m, m));
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
    plus(v: Vector2)
    {
        this[0] += v[0];
        this[1] += v[1];
        return this;
    }
    minus(v: Vector2)
    {
        this[0] -= v[0];
        this[1] -= v[1];
        return this;
    }
    mul(v: Vector2)
    {
        this[0] *= v[0];
        this[1] *= v[1];
        return this;
    }
    div(v: Vector2)
    {
        this[0] /= v[0];
        this[1] /= v[1];
        return this;
    }
    dot(v: Vector2)
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

    clone()
    {
        return vec2(this[0], this[1]);
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
vec2.zero = Vector2.zero;
vec2.one = Vector2.one;