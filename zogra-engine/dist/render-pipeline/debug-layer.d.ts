import { Lines } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { vec2 } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { RenderData } from "./render-data";
import { RenderContext } from "./render-pipeline";
export declare class DebugLayerRenderer {
    lines: Lines;
    drawLine(from: vec3, to: vec3, color?: Color): void;
    drawRect(min: vec2, max: vec2, color?: Color): void;
    render(context: RenderContext, data: RenderData): void;
}
