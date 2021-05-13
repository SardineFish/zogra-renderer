import { RenderData } from "../render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "../render-pipeline";
export declare class ClearPass extends RenderPass {
    render(context: RenderContext, data: RenderData): void;
}
