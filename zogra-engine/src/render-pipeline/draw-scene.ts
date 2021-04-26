import { RenderData, RenderOrder } from "./render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "./render-pipeline";

export class DrawScene extends RenderPass
{
    renderOrder: RenderOrder;
    constructor(order: RenderOrder)
    {
        super();
        this.renderOrder = order;
    }
    render(context: RenderContext, data: RenderData)
    {
        const camera = data.camera;
        context.renderer.setFramebuffer(data.cameraOutput);

        const objs = data.getVisibleObjects(this.renderOrder);
        for (const obj of objs)
        {
            obj.render(context, data);
        }
    }
}