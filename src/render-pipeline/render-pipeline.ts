import { Camera } from "../engine/camera";
import { ZograRenderer } from "../core/renderer";
import { Scene } from "../engine/scene";

export interface ZograRenderPipeline
{
    render(renderer: RenderContext, cameras: Camera[]): void;
}

export interface RenderContext
{
    renderer: ZograRenderer;
    scene: Scene;
}