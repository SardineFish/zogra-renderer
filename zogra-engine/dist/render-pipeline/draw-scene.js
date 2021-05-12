import { RenderPass } from "./render-pass";
export class DrawScene extends RenderPass {
    constructor(order, filter) {
        super();
        this.renderOrder = order;
        this.filter = filter;
    }
    render(context, data) {
        const camera = data.camera;
        context.renderer.setFramebuffer(data.cameraOutput);
        const objs = data.getVisibleObjects(this.renderOrder, this.filter);
        for (const obj of objs) {
            obj.render(context, data);
        }
    }
}
//# sourceMappingURL=draw-scene.js.map