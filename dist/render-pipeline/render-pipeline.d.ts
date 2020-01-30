import { Camera } from "../engine/camera";
import { ZograRenderer } from "../core/renderer";
import { Scene } from "../engine/scene";
import { Material } from "../core/core";
import { ConstructorType } from "../utils/util";
export interface ZograRenderPipelineConstructor {
    new (renderer: ZograRenderer): ZograRenderPipeline;
}
export declare type MaterialReplacer<T extends Material> = (original: T) => Material;
export interface ZograRenderPipeline {
    render(renderer: RenderContext, cameras: Camera[]): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
}
export interface RenderContext {
    renderer: ZograRenderer;
    scene: Scene;
}
