import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera } from "../engine/camera";
import { RenderData } from "./render-data";
export declare class PreviewRenderer implements ZograRenderPipeline {
    render(context: RenderContext, cameras: Camera[]): void;
    setupLight(context: RenderContext, data: RenderData): void;
    renderCamera(context: RenderContext, data: RenderData): void;
}
