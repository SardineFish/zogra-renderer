import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera } from "../engine/engine";
import { mat4 } from "zogra-renderer";
import { ZograRenderer, Material, Mesh } from "zogra-renderer";
import { RenderData } from "./render-data";
import { Lines } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { DebugLayerRenderer } from "./debug-layer";
export declare class PreviewRenderer implements ZograRenderPipeline {
    renderer: ZograRenderer;
    grid: Lines;
    materialReplaceMap: Map<Function, Material>;
    debugLayer: DebugLayerRenderer;
    constructor(renderer: ZograRenderer);
    render(context: RenderContext, cameras: Camera[]): void;
    setupLight(context: RenderContext, data: RenderData): void;
    renderCamera(context: RenderContext, data: RenderData): void;
    renderGrid(context: RenderContext, data: RenderData): void;
    drawWithMaterial(mesh: Mesh, transform: mat4, material: Material): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
}
