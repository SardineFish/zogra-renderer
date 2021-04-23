"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugLayerRenderer = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const zogra_renderer_2 = require("zogra-renderer");
const zogra_renderer_3 = require("zogra-renderer");
class DebugLayerRenderer extends zogra_renderer_1.DebugProvider {
    constructor() {
        super(...arguments);
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
    render(context, data) {
        context.renderer.setRenderTarget(zogra_renderer_1.RenderTarget.CanvasTarget);
        context.renderer.drawLines(this.lines, zogra_renderer_3.mat4.identity(), context.renderer.assets.materials.ColoredLine);
        this.lines.clear();
    }
}
exports.DebugLayerRenderer = DebugLayerRenderer;
//# sourceMappingURL=debug-layer.js.map