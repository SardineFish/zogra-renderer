import { Camera } from "../engine/engine";
import { ZograRenderer } from "zogra-renderer";
import { Scene } from "../engine/engine";
import { Material } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
export interface ZograRenderPipelineConstructor {
    new (renderer: ZograRenderer): ZograRenderPipeline;
}
export declare type MaterialReplacer<T extends Material> = (original: T) => Material;
export interface ZograRenderPipeline {
    render(renderer: RenderContext, scene: Scene, cameras: Camera[]): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
}
export interface RenderContext {
    renderer: ZograRenderer;
    screen: Screen;
}
export interface Screen {
    width: number;
    height: number;
}
export declare const RenderContext: {
    create(renderer: ZograRenderer): RenderContext;
};
