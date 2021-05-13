import { RenderData } from "./render-data";
import { RenderContext } from "./render-pipeline";
export declare abstract class RenderPass<T = {}> {
    setup(context: RenderContext, data: RenderData<T>): void;
    abstract render(context: RenderContext, data: RenderData<T>): void;
    cleanup(context: RenderContext, data: RenderData<T>): void;
}
