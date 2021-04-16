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
    transparent(): Color;
    /**
     *
     * @param h hue in [0..360]
     * @param s saturation in [0..1]
     * @param l lightness in [0..1]
     * @returns
     */
    setHSL(h: number, s: number, l: number): this;
    get hue(): number;
    get saturation(): number;
    get lightness(): number;
    toHSL(): [number, number, number];
    /**
     *
     * @param h hue in [0..360]
     * @param s saturation in [0..1]
     * @param l lightness in [0..1]
     * @param alpha
     * @returns
     */
    static fromHSL(h: number, s: number, l: number, alpha?: number): Color;
    static fromString(str: string, alpha?: number): Color;
}
export declare const rgba: (r: number, g: number, b: number, a?: number) => Color;
export declare const rgb: (r: number, g: number, b: number) => Color;
export declare const hsl: typeof Color.fromHSL;
