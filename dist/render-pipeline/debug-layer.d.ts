import { Lines } from "../core/core";
import { Color } from "../types/color";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { RenderData } from "./render-data";
import { RenderContext } from "./render-pipeline";
export declare class DebugLayerRenderer {
    lines: Lines;
    drawLine(from: vec3, to: vec3, color?: Color): void;
    drawRect(min: vec2, max: vec2, color?: Color): void;
    render(context: RenderContext, data: RenderData): void;
}
