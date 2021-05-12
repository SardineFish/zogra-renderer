import { RenderObject } from "../../engine/render-object";
import { RenderData, RenderOrder } from "../render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "../render-pipeline";
export declare class DrawScene extends RenderPass {
    renderOrder: RenderOrder;
    filter?: (obj: RenderObject) => boolean;
    constructor(order: RenderOrder, filter?: (obj: RenderObject) => boolean);
    render(context: RenderContext, data: RenderData): void;
}
