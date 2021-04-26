import { Camera } from "../engine/engine";
import { TextureFormat, ZograRenderer } from "zogra-renderer";
import { Scene } from "../engine/engine";
import { Material } from "zogra-renderer";
import { ConstructorType } from "../utils/util";

export interface ZograRenderPipelineConstructor
{
    new(renderer: ZograRenderer): ZograRenderPipeline;
}
export type MaterialReplacer<T extends Material> = (original: T) => Material;

export interface ZograRenderPipeline
{
    render(renderer: RenderContext, scene: Scene, cameras: Camera[]): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
}

export interface RenderContext
{
    renderer: ZograRenderer;
    screen: Screen;
}

export interface Screen
{
    width: number,
    height: number,
}

export const RenderContext = {
    create(renderer: ZograRenderer)
    {
        return <RenderContext>{
            renderer,
            screen: {
                width: renderer.canvas.width,
                height: renderer.canvas.height
            },
        };
    }
};