"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawScene = void 0;
const render_pass_1 = require("./render-pass");
class DrawScene extends render_pass_1.RenderPass {
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
exports.DrawScene = DrawScene;
//# sourceMappingURL=draw-scene.js.map