"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec4_1 = require("./vec4");
class Color extends vec4_1.Vector4 {
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
}
exports.Color = Color;
exports.rgba = (r, g, b, a = 1) => new Color(r, g, b, a);
exports.rgb = (r, g, b) => new Color(r, g, b, 1);
//# sourceMappingURL=color.js.map