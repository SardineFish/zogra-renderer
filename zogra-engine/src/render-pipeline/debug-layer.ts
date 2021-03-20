import { Lines } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { mat4 } from "zogra-renderer";
import { minus } from "zogra-renderer";
import { vec2 } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { RenderData } from "./render-data";
import { RenderContext } from "./render-pipeline";

export class DebugLayerRenderer
{
    lines: Lines = new Lines();

    drawLine(from: vec3, to: vec3, color = Color.white)
    {
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

    drawRect(min: vec2, max: vec2, color = Color.white)
    {
        this.drawLine(vec2(min.x, min.y).toVec3(), vec2(max.x, min.y).toVec3(), color);
        this.drawLine(vec2(max.x, min.y).toVec3(), vec2(max.x, max.y).toVec3(), color);
        this.drawLine(vec2(max.x, max.y).toVec3(), vec2(min.x, max.y).toVec3(), color);
        this.drawLine(vec2(min.x, max.y).toVec3(), vec2(min.x, min.y).toVec3(), color);
    }

    render(context: RenderContext, data: RenderData)
    {
        context.renderer.drawLines(this.lines, mat4.identity(), context.renderer.assets.materials.ColoredLine);
        this.lines.clear();
    }
}