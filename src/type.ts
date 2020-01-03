export type Vector3 = Vector4;
export type Vector2 = Vector4;
export type vec4 = Vector4;
export type vec3 = Vector3;
export type vec2 = Vector2;

export class Vector4 extends Array<number>
{
    get r() { return this[0]; }
    set r(x: number) { this[0] = x; }
    get g() { return this[1]; }
    set g(y: number) { this[1] = y; }
    get b() { return this[2]; }
    set b(z: number) { this[2] = z; }
    get a() { return this[3]; }
    set a(w: number) { this[3] = w }
    
    get magnitude()
    {
        return Math.hypot(...this);
    }

    get normalized()
    {
        const m = this.magnitude;
        return Vector4.div(this, vec4(m, m, m, m));
    }

    constructor(x: number, y: number, z?: number, w?: number)
    {
        super(x, y, z || 0, w || 0);
    }

    static plus(u: Vector4, v: Vector4)
    {
        return new Vector4(
            u[0] + v[0],
            u[1] + v[1],
            u[2] + v[2],
            u[3] + v[3],
        );
    }
    static minus(u: Vector4, v: Vector4)
    {
        return new Vector4(
            u[0] - v[0],
            u[1] - v[1],
            u[2] - v[2],
            u[3] - v[3],
        );
    }
    static mul(u: Vector4, v: Vector4)
    {
        return new Vector4(
            u[0] * v[0],
            u[1] * v[1],
            u[2] * v[2],
            u[3] * v[3],
        );
    }
    static div(u: Vector4, v: Vector4)
    {
        return new Vector4(
            u[0] / v[0],
            u[1] / v[1],
            u[2] / v[2],
            u[3] / v[3],
        );
    }
    static dot(u: Vector4, v: Vector4)
    {
        return u[0] * v[0]
            + u[1] * v[1]
            + u[2] * v[2]
            + u[3] * v[3];
    }
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    static cross(a: Vector3, b: Vector3)
    {
        return vec3(
            a.g * b.b - a.b * b.g,
            a.r * b.b - a.b * b.r,
            a.r * b.g - a.g * b.r
        );
    }
}

export class Color extends Vector4
{
    get r() { return this[0]; }
    set r(r: number) { this[0] = r; }
    get g() { return this[1]; }
    set g(g: number) { this[1] = g; }
    get b() { return this[2]; }
    set b(b: number) { this[2] = b; }
    get a() { return this[3]; }
    set a(a: number) { this[3] = a }

    constructor(r: number, g: number, b: number, a: number = 1)
    {
        super(r, g, b, a);
    }
}

export function vec4(x: number, y: number, z: number, w: number) : Vector4
{
    return new Vector4(x, y, z, w);
}

export function vec3(x: number, y: number, z: number): Vector3
{
    return new Vector4(x, y, z);
}

export function vec2(x: number, y: number): Vector2
{
    return new Vector4(x, y);
}

//export const color = (r: number, g: number, b: number, a: number = 1) => new Color(r, g, b, a);
export const rgba = (r: number, g: number, b: number, a: number = 1) => new Color(r, g, b, a);
export const rgb = (r: number, g: number, b: number) => new Color(r, g, b, 1);

export const plus = Vector4.plus;
export const minus = Vector4.minus;
export const mul = Vector4.mul;
export const div = Vector4.div;
export const dot = Vector4.dot;
export const cross = Vector4.dot;