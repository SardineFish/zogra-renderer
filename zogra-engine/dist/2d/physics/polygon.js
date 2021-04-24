"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
const zogra_renderer_1 = require("zogra-renderer");
class Polygon {
    constructor(capacity = 0) {
        this.bound = new zogra_renderer_1.Rect(zogra_renderer_1.vec2.zero(), zogra_renderer_1.vec2.zero());
        this.points = new Array();
    }
    append(vert) {
        this.points.push(vert);
        this.bound.min.x = Math.min(vert.x, this.bound.min.x);
        this.bound.min.y = Math.min(vert.y, this.bound.min.y);
        this.bound.max.x = Math.max(vert.x, this.bound.max.x);
        this.bound.max.y = Math.max(vert.y, this.bound.max.y);
    }
}
exports.Polygon = Polygon;
//# sourceMappingURL=polygon.js.map