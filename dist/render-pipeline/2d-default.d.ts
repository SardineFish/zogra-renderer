import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera } from "../engine/camera";
import { Material } from "../core/core";
import { RenderData } from "./render-data";
import { ConstructorType } from "../utils/util";
import { DebugLayerRenderer } from "./debug-layer";
export declare class Default2DRenderPipeline implements ZograRenderPipeline {
    debuglayer: DebugLayerRenderer;
    render(renderer: RenderContext, cameras: Camera[]): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
    renderCamera(context: RenderContext, data: RenderData): void;
}
