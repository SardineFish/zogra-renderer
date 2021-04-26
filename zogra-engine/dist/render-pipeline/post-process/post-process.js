"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostprocessPass = exports.PostProcess = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_pass_1 = require("../render-pass");
class PostProcess {
    constructor() {
        /** @internal */
        this.__intialized = false;
    }
    create(context) { }
}
exports.PostProcess = PostProcess;
class PostprocessPass extends render_pass_1.RenderPass {
    constructor(context, renderFormat) {
        super();
        this.format = renderFormat;
        this.buffers = [
            new zogra_renderer_1.RenderTexture(context.screen.width, context.screen.height, false, this.format, zogra_renderer_1.FilterMode.Nearest).createFramebuffer(),
            new zogra_renderer_1.RenderTexture(context.screen.width, context.screen.height, false, this.format, zogra_renderer_1.FilterMode.Nearest).createFramebuffer(),
        ];
    }
    render(context, data) {
        const camera = data.camera;
        let [src, dst] = this.buffers;
        const cameraBuffer = data.cameraOutput.colorAttachments[0];
        context.renderer.blitCopy(cameraBuffer, src.colorAttachments[0]);
        for (const postprocess of camera.postprocess) {
            if (!postprocess.__intialized) {
                postprocess.create(context);
                postprocess.__intialized = true;
            }
            postprocess.render(context, src.colorAttachments[0], dst);
            [src, dst] = [dst, src];
        }
        data.postprocessOutput = src.colorAttachments[0];
    }
}
exports.PostprocessPass = PostprocessPass;
//# sourceMappingURL=post-process.js.map