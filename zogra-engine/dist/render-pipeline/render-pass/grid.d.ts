import { Lines } from "zogra-renderer";
import { RenderPass } from ".";
import { RenderData } from "..";
import { UnlitColor } from "../materials/unlit";
import { RenderContext } from "../render-pipeline";
export declare class GridRenderer extends RenderPass {
    grid: Lines;
    material: UnlitColor;
    constructor(Size?: number, Grid?: number, color?: import("zogra-renderer").Color);
    render(context: RenderContext, data: RenderData): void;
}
