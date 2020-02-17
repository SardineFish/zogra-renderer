import { Vector4 } from "./vec4";
export declare class Color extends Vector4 {
    get r(): number;
    set r(r: number);
    get g(): number;
    set g(g: number);
    get b(): number;
    set b(b: number);
    get a(): number;
    set a(a: number);
    constructor(r: number, g: number, b: number, a?: number);
    static get white(): Color;
    static get transparent(): Color;
    static get black(): Color;
    static get red(): Color;
    static get green(): Color;
    static get blue(): Color;
    static get cyan(): Color;
    static get yellow(): Color;
    static get magenta(): Color;
    static get gray(): Color;
}
export declare const rgba: (r: number, g: number, b: number, a?: number) => Color;
export declare const rgb: (r: number, g: number, b: number) => Color;
