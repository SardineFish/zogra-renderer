"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearPass = void 0;
const render_pass_1 = require("./render-pass");
class ClearPass extends render_pass_1.RenderPass {
    render(context, data) {
        const camera = data.camera;
        context.renderer.setFramebuffer(data.cameraOutput);
        context.renderer.clear(camera.clearColor, camera.clearDepth);
    }
}
exports.ClearPass = ClearPass;
//# sourceMappingURL=clear-pass.js.map