import { DebugProvider, Lines, FrameBuffer } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { mat4 } from "zogra-renderer";
export class DebugLayerRenderer extends DebugProvider {
    constructor() {
        super(...arguments);
        this.lines = new Lines();
    }
    drawLine(from, to, color = Color.white) {
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
        context.renderer.setFramebuffer(FrameBuffer.CanvasBuffer);
        context.renderer.drawLines(this.lines, mat4.identity(), context.renderer.assets.materials.ColoredLine);
        this.lines.clear();
    }
}
//# sourceMappingURL=debug-layer.js.map