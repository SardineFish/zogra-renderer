import { Color, vec2 } from "zogra-renderer";
import { RenderObject } from "../../engine/render-object";
import { RenderData } from "../../render-pipeline/render-data";
import { RenderContext } from "../../render-pipeline/render-pipeline";
export interface LinePoint {
    position: vec2;
    color: Color;
    width: number;
}
export declare class LineRenderer extends RenderObject {
    private mesh;
    private dirty;
    points: LinePoint[];
    updateMesh(): void;
    render(context: RenderContext, data: RenderData): void;
    private rebuildMesh;
    destroy(): void;
}
