import { DebugProvider, Lines } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { mat4 } from "zogra-renderer";
import { UnlitColor, UnlitColorOverlay } from "../materials/unlit";
export class DebugLayerRenderer extends DebugProvider {
    constructor() {
        super(...arguments);
        this.lines = new Lines();
        this.overlayLines = new Lines();
        this.material = new UnlitColor();
        this.materialOverlay = new UnlitColorOverlay();
    }
    drawLine(from, to, color = Color.white, overlay = false) {
        const lineBuffer = overlay ? this.overlayLines : this.lines;
        const verts = lineBuffer.verts;
        const lines = lineBuffer.lines;
        const colors = lineBuffer.colors;
        const base = verts.length;
        verts.push(from, to);
        colors.push(color, color);
        lines.push(base, base + 1);
        lineBuffer.verts = verts;
        lineBuffer.colors = colors;
        lineBuffer.lines = lines;
    }
    render(context, data) {
        context.renderer.drawLines(this.lines, mat4.identity(), this.material);
        context.renderer.drawLines(this.overlayLines, mat4.identity(), this.materialOverlay);
        this.lines.clear();
        this.overlayLines.clear();
    }
}
//# sourceMappingURL=debug-layer.js.map