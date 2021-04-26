import { RenderData, RenderOrder } from "./render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "./render-pipeline";
export declare class DrawScene extends RenderPass {
    renderOrder: RenderOrder;
    constructor(order: RenderOrder);
    render(context: RenderContext, data: RenderData): void;
}
