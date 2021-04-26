"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalBlit = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_pass_1 = require("./render-pass");
class FinalBlit extends render_pass_1.RenderPass {
    constructor(context, format) {
        super();
        this.tempRT = new zogra_renderer_1.RenderTexture(context.screen.width, context.screen.height, false, format);
    }
    render(context, data) {
        var _a, _b;
        const camera = data.camera;
        if (data.postprocessOutput) {
            context.renderer.blit(data.postprocessOutput, (_a = camera.output) !== null && _a !== void 0 ? _a : zogra_renderer_1.FrameBuffer.CanvasBuffer);
        }
        else if (data.cameraOutput === zogra_renderer_1.FrameBuffer.CanvasBuffer) {
            return;
        }
        else if (data.cameraOutput instanceof zogra_renderer_1.FrameBuffer) {
            if (data.cameraOutput.colorAttachments[0] instanceof zogra_renderer_1.RenderBuffer) {
                if (camera.output instanceof zogra_renderer_1.RenderTexture)
                    context.renderer.blitCopy(data.cameraOutput.colorAttachments[0], camera.output);
                else {
                    context.renderer.blitCopy(data.cameraOutput.colorAttachments[0], this.tempRT);
                    context.renderer.blit(this.tempRT, zogra_renderer_1.FrameBuffer.CanvasBuffer);
                }
            }
            else if (data.cameraOutput.colorAttachments[0] instanceof zogra_renderer_1.RenderTexture) {
                context.renderer.blit(data.cameraOutput.colorAttachments[0], (_b = camera.output) !== null && _b !== void 0 ? _b : zogra_renderer_1.FrameBuffer.CanvasBuffer);
            }
        }
    }
}
exports.FinalBlit = FinalBlit;
//# sourceMappingURL=final-blit.js.map