import { DebugProvider, Lines, FrameBuffer } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { mat4 } from "zogra-renderer";
import { minus } from "zogra-renderer";
import { vec2 } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { UnlitColor, UnlitColorOverlay } from "../materials/unlit";
import { RenderData } from "../render-data";
import { RenderContext } from "../render-pipeline";

export class DebugLayerRenderer extends DebugProvider
{
    lines: Lines = new Lines();
    overlayLines: Lines = new Lines();
    material = new UnlitColor();
    materialOverlay = new UnlitColorOverlay();

    drawLine(from: vec3, to: vec3, color = Color.white, overlay = false)
    {
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

    render(context: RenderContext, data: RenderData)
    {
        context.renderer.drawLines(this.lines, mat4.identity(), this.material);
        context.renderer.drawLines(this.overlayLines, mat4.identity(), this.materialOverlay);
        this.lines.clear();
        this.overlayLines.clear();
    }
}