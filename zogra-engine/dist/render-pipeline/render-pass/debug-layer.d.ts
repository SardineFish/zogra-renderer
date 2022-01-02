import { DebugProvider, Lines } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { UnlitColor, UnlitColorOverlay } from "../materials/unlit";
import { RenderData } from "../render-data";
import { RenderContext } from "../render-pipeline";
export declare class DebugLayerRenderer extends DebugProvider {
    lines: Lines;
    overlayLines: Lines;
    material: UnlitColor;
    materialOverlay: UnlitColorOverlay;
    drawLine(from: vec3, to: vec3, color?: Color, overlay?: boolean): void;
    render(context: RenderContext, data: RenderData): void;
}
