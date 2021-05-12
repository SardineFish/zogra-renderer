import { FilterMode, RenderTexture } from "zogra-renderer";
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