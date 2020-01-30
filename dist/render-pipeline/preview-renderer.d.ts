import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera } from "../engine/camera";
import { mat4 } from "../types/mat4";
import { ZograRenderer, Material, Mesh } from "../core/core";
import { RenderData } from "./render-data";
import { Lines } from "../core/lines";
import { ConstructorType } from "../utils/util";
export declare class PreviewRenderer implements ZograRenderPipeline {
    renderer: ZograRenderer;
    grid: Lines;
    materialReplaceMap: Map<Function, Material>;
    constructor(renderer: ZograRenderer);
    render(context: RenderContext, cameras: Camera[]): void;
    setupLight(context: RenderContext, data: RenderData): void;
    renderCamera(context: RenderContext, data: RenderData): void;
    renderGrid(context: RenderContext, data: RenderData): void;
    drawWithMaterial(mesh: Mesh, transform: mat4, material: Material): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
}
