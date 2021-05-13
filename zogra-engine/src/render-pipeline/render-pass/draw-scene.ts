import { SpriteObject } from "../../2d";
import { RenderObject } from "../../engine/render-object";
import { RenderData, RenderOrder } from "../render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "../render-pipeline";

export class DrawScene extends RenderPass
{
    renderOrder: RenderOrder;
    filter?: (obj: RenderObject) => boolean;
    constructor(order: RenderOrder, filter?: (obj: RenderObject) => boolean)
    {
        super();
        this.renderOrder = order;
        this.filter = filter;
    }
    render(context: RenderContext, data: RenderData)
    {
        const camera = data.camera;
        context.renderer.setFramebuffer(data.cameraOutput);

        const objs = data.getVisibleObjects(this.renderOrder, this.filter);
        for (const obj of objs)
        {
            obj.render(context, data);
        }
    }
}