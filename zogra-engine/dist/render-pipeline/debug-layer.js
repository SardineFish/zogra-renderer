"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugLayerRenderer = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
const zogra_renderer_4 = require("zogra-renderer");
class DebugLayerRenderer {
    constructor() {
        this.lines = new zogra_renderer_1.Lines();
    }
    drawLine(from, to, color = zogra_renderer_2.Color.white) {
        const verts = this.lines.verts;
        const lines = this.lines.lines;
        const colors = this.lines.colors;
        const base = verts.length;
        verts.push(from, to);
        colors.push(color, color);
        lines.push(base, base + 1);
        this.lines.verts = verts;
        this.lines.colors = colors;
        this.lines.lines = lines;
    }
    drawRect(min, max, color = zogra_renderer_2.Color.white) {
        this.drawLine(zogra_renderer_4.vec2(min.x, min.y).toVec3(), zogra_renderer_4.vec2(max.x, min.y).toVec3(), color);
        this.drawLine(zogra_renderer_4.vec2(max.x, min.y).toVec3(), zogra_renderer_4.vec2(max.x, max.y).toVec3(), color);
        this.drawLine(zogra_renderer_4.vec2(max.x, max.y).toVec3(), zogra_renderer_4.vec2(min.x, max.y).toVec3(), color);
        this.drawLine(zogra_renderer_4.vec2(min.x, max.y).toVec3(), zogra_renderer_4.vec2(min.x, min.y).toVec3(), color);
    }
    render(context, data) {
        context.renderer.drawLines(this.lines, zogra_renderer_3.mat4.identity(), context.renderer.assets.materials.ColoredLine);
        this.lines.clear();
    }
}
exports.DebugLayerRenderer = DebugLayerRenderer;
//# sourceMappingURL=debug-layer.js.map