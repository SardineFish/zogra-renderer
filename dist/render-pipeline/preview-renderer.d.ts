import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera } from "../engine/camera";
import { ZograRenderer } from "../core/core";
import { RenderData } from "./render-data";
import { Lines } from "../core/lines";
export declare class PreviewRenderer implements ZograRenderPipeline {
    renderer: ZograRenderer;
    grid: Lines;
    constructor(renderer: ZograRenderer);
    render(context: RenderContext, cameras: Camera[]): void;
    setupLight(context: RenderContext, data: RenderData): void;
    renderCamera(context: RenderContext, data: RenderData): void;
    renderGrid(context: RenderContext, data: RenderData): void;
}
