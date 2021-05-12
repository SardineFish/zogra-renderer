import { FilterMode, RenderTexture, TextureResizing } from "zogra-renderer";
import { RenderPass } from "../render-pass/render-pass";
export class PostProcess {
    constructor() {
        /** @internal */
        this.__intialized = false;
    }
    create(context) { }
}
export class PostprocessPass extends RenderPass {
    constructor(context, renderFormat) {
        super();
        this.format = renderFormat;
        this.buffers = [
            new RenderTexture(context.screen.width, context.screen.height, false, this.format, FilterMode.Nearest).createFramebuffer(),
            new RenderTexture(context.screen.width, context.screen.height, false, this.format, FilterMode.Nearest).createFramebuffer(),
        ];
    }
    render(context, data) {
        if (!data.cameraOutput.size.equals(this.buffers[0].size)) {
            const rt0 = this.buffers[0].colorAttachments[0]
                .resize(data.cameraOutput.width, data.cameraOutput.height, TextureResizing.Discard);
            const rt1 = this.buffers[1].colorAttachments[0]
                .resize(data.cameraOutput.width, data.cameraOutput.height, TextureResizing.Discard);
            this.buffers[0].reset(data.cameraOutput.width, data.cameraOutput.height);
            this.buffers[1].reset(data.cameraOutput.width, data.cameraOutput.height);
            this.buffers[0].addColorAttachment(rt0, 0);
            this.buffers[1].addColorAttachment(rt1, 0);
        }
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
//# sourceMappingURL=post-process.js.map