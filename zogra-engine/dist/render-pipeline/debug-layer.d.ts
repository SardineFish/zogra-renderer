import { DebugProvider, Lines } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { RenderData } from "./render-data";
import { RenderContext } from "./render-pipeline";
export declare class DebugLayerRenderer extends DebugProvider {
    lines: Lines;
    drawLine(from: vec3, to: vec3, color?: Color): void;
    render(context: RenderContext, data: RenderData): void;
}
