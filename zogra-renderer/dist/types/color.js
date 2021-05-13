import { Vector4 } from "./vec4";
export class Color extends Vector4 {
    get r() { return this[0]; }
    set r(r) { this[0] = r; }
    get g() { return this[1]; }
    set g(g) { this[1] = g; }
    get b() { return this[2]; }
    set b(b) { this[2] = b; }
    get a() { return this[3]; }
    set a(a) { this[3] = a; }
    constructor(r, g, b, a = 1) {
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
    transparent() {
        return new Color(this.r, this.g, this.b, 0);
    }
    /**
     *
     * @param h hue in [0..360]
     * @param s saturation in [0..1]
     * @param l lightness in [0..1]
     * @returns
     */
    setHSL(h, s, l) {
        h = h < 0 ? h + 360 : h;
        const chroma = (1 - Math.abs(2 * l - 1)) * s;
        if (isNaN(h)) {
            this.r = this.g = this.b = 0;
            return this;
        }
        h = h / 60;
        const x = chroma * (1 - Math.abs(h % 2 - 1));
        let color = [0, 0, 0];
        if (0 <= h && h <= 1)
            color = [chroma, x, 0];
        else if (h <= 2)
            color = [x, chroma, 0];
        else if (h <= 3)
            color = [0, chroma, x];
        else if (h <= 4)
            color = [0, x, chroma];
        else if (h <= 5)
            color = [x, 0, chroma];
        else if (h <= 6)
            color = [chroma, 0, x];
        let m = l - chroma / 2;
        this.r = color[0] + m;
        this.g = color[1] + m;
        this.b = color[2] + m;
        return this;
    }
    get hue() {
        const R = this.r;
        const G = this.g;
        const B = this.b;
        const max = Math.max(R, G, B);
        const min = Math.min(R, G, B);
        let h = 0;
        if (max === min)
            h = 0;
        else if (max === R)
            h = 60 * (0 + (G - B) / (max - min));
        else if (max === G)
            h = 60 * (2 + (B - R) / (max - min));
        else if (max === B)
            h = 60 * (4 + (R - G) / (max - min));
        return h < 0 ? h + 360 : h;
    }
    get saturation() {
        const max = Math.max(this.r, this.g, this.b);
        const min = Math.min(this.r, this.g, this.b);
        if (max === 0)
            return 0;
        else if (min == 1)
            return 0;
        return (max - min) / (1 - Math.abs(max + min - 1));
    }
    get lightness() {
        const max = Math.max(this.r, this.g, this.b);
        const min = Math.min(this.r, this.g, this.b);
        return (max + min) / 2;
    }
    toHSL() {
        return [this.hue, this.saturation, this.lightness];
    }
    /**
     *
     * @param h hue in [0..360]
     * @param s saturation in [0..1]
     * @param l lightness in [0..1]
     * @param alpha
     * @returns
     */
    static fromHSL(h, s, l, alpha = 1) {
        return new Color(0, 0, 0, alpha).setHSL(h, s, l);
    }
    static fromString(str, alpha) {
        str = str.replace(new RegExp(/\s/g), "");
        var reg = new RegExp("#[0-9a-fA-F]{6}");
        if (reg.test(str)) {
            str = str.replace("#", "");
            var strR = str.charAt(0) + str.charAt(1);
            var strG = str.charAt(2) + str.charAt(3);
            var strB = str.charAt(4) + str.charAt(5);
            var r = parseInt(strR, 16);
            var g = parseInt(strG, 16);
            var b = parseInt(strB, 16);
            return new Color(r / 255, g / 255, b / 255, alpha || 1);
        }
        reg = new RegExp("rgb\\(([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1})\\)");
        if (reg.test(str)) {
            var colorArray = str.replace("rgb(", "").replace(")", "").split(",");
            var r = parseInt(colorArray[0]);
            var g = parseInt(colorArray[1]);
            var b = parseInt(colorArray[2]);
            var a = alpha || 1;
            return new Color(r / 255, g / 255, b / 255, a / 255);
        }
        reg = new RegExp("rgba\\(([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1})\\)");
        if (reg.test(str)) {
            var colorArray = str.replace("rgba(", "").replace(")", "").split(",");
            var r = parseInt(colorArray[0]);
            var g = parseInt(colorArray[1]);
            var b = parseInt(colorArray[2]);
            var a = alpha || parseFloat(colorArray[3]);
            return new Color(r / 255, g / 255, b / 255, a);
        }
        throw new Error(`Invalid color string '${str}'`);
    }
}
export const rgba = (r, g, b, a = 1) => new Color(r, g, b, a);
export const rgb = (r, g, b) => new Color(r, g, b, 1);
export const hsl = Color.fromHSL;
//# sourceMappingURL=color.js.map