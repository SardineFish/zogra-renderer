import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera } from "../engine/engine";
import { Material } from "zogra-renderer";
import { RenderData } from "./render-data";
import { ConstructorType } from "../utils/util";
import { DebugLayerRenderer } from "./debug-layer";
import { Light2DCompose } from "../2d";
export declare class Default2DRenderPipeline implements ZograRenderPipeline {
    debuglayer: DebugLayerRenderer;
    light2DComposeMaterial: Light2DCompose;
    constructor();
    render(renderer: RenderContext, cameras: Camera[]): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
    renderCamera(context: RenderContext, data: RenderData): void;
    prepareLights(context: RenderContext, data: RenderData): void;
}
