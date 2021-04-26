import { Camera } from "../engine/camera";
import { RenderData } from "./render-data";
import { RenderContext } from "./render-pipeline";


export abstract class RenderPass<T = {}>
{
    setup(context: RenderContext, data: RenderData<T>)
    {
    }

    abstract render(context: RenderContext, data: RenderData<T>): void;

    cleanup(context: RenderContext, data: RenderData<T>)
    {
    }
}