"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core/core");
const color_1 = require("../types/color");
const mat4_1 = require("../types/mat4");
const vec2_1 = require("../types/vec2");
class DebugLayerRenderer {
    constructor() {
        this.lines = new core_1.Lines();
    }
    drawLine(from, to, color = color_1.Color.white) {
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
    drawRect(min, max, color = color_1.Color.white) {
        this.drawLine(vec2_1.vec2(min.x, min.y).toVec3(), vec2_1.vec2(max.x, min.y).toVec3(), color);
        this.drawLine(vec2_1.vec2(max.x, min.y).toVec3(), vec2_1.vec2(max.x, max.y).toVec3(), color);
        this.drawLine(vec2_1.vec2(max.x, max.y).toVec3(), vec2_1.vec2(min.x, max.y).toVec3(), color);
        this.drawLine(vec2_1.vec2(min.x, max.y).toVec3(), vec2_1.vec2(min.x, min.y).toVec3(), color);
    }
    render(context, data) {
        context.renderer.drawLines(this.lines, mat4_1.mat4.identity(), context.renderer.assets.materials.ColoredLine);
        this.lines.clear();
    }
}
exports.DebugLayerRenderer = DebugLayerRenderer;
//# sourceMappingURL=debug-layer.js.map