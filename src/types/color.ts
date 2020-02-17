import { Vector4 } from "./vec4";

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

    static get white() { return new Color(1, 1, 1); }
    static get transparent() { return new Color(1, 1, 1, 0); }
    static get black() { return new Color(0, 0, 0); }
    static get red() { return new Color(1, 0, 0); }
    static get green() { return new Color(0, 1, 0); }
    static get blue() { return new Color(0, 0, 1); }
    static get cyan() { return new Color(0, 1, 1); }
    static get yellow() { return new Color(1, 1, 0); }
    static get magenta() { return new Color(1, 0, 1); }
    static get gray() { return new Color(.5, .5, .5); }
}

export const rgba = (r: number, g: number, b: number, a: number = 1) => new Color(r, g, b, a);
export const rgb = (r: number, g: number, b: number) => new Color(r, g, b, 1);
