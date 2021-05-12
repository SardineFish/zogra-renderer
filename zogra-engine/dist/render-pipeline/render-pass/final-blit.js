import { FrameBuffer, RenderBuffer, RenderTexture } from "zogra-renderer";
import { RenderPass } from "./render-pass";
export class FinalBlit extends RenderPass {
    constructor(context, format) {
        super();
        this.tempRT = new RenderTexture(context.screen.width, context.screen.height, false, format);
    }
    render(context, data) {
        var _a, _b;
        if (!data.cameraOutput.size.equals(this.tempRT.size)) {
            this.tempRT.resize(data.cameraOutput.width, data.cameraOutput.height);
        }
        const camera = data.camera;
        if (data.postprocessOutput) {
            context.renderer.blit(data.postprocessOutput, (_a = camera.output) !== null && _a !== void 0 ? _a : FrameBuffer.CanvasBuffer);
        }
        else if (data.cameraOutput === FrameBuffer.CanvasBuffer) {
            return;
        }
        else if (data.cameraOutput instanceof FrameBuffer) {
            if (data.cameraOutput.colorAttachments[0] instanceof RenderBuffer) {
                if (camera.output instanceof RenderTexture)
                    context.renderer.blitCopy(data.cameraOutput.colorAttachments[0], camera.output);
                else {
                    context.renderer.blitCopy(data.cameraOutput.colorAttachments[0], this.tempRT);
                    context.renderer.blit(this.tempRT, FrameBuffer.CanvasBuffer);
                }
            }
            else if (data.cameraOutput.colorAttachments[0] instanceof RenderTexture) {
                context.renderer.blit(data.cameraOutput.colorAttachments[0], (_b = camera.output) !== null && _b !== void 0 ? _b : FrameBuffer.CanvasBuffer);
            }
        }
    }
}
//# sourceMappingURL=final-blit.js.map