import { FilterMode, FrameBuffer, RenderBuffer, RenderTexture, TextureFormat, TextureResizing } from "zogra-renderer";
import { RenderData } from "../render-data";
import { RenderPass } from "../render-pass/render-pass";
import { RenderContext } from "../render-pipeline";

export abstract class PostProcess
{
    /** @internal */
    __intialized = false;
    create(context: RenderContext){}
    abstract render(context: RenderContext, src: RenderTexture, dst: FrameBuffer): void;
}

export interface PostprocessData
{
    postprocessOutput: RenderTexture,
}

export class PostprocessPass extends RenderPass<PostprocessData>
{
    buffers: [FrameBuffer, FrameBuffer];
    format: TextureFormat;

    constructor(context: RenderContext, renderFormat: TextureFormat)
    {
        super();
        this.format = renderFormat;
        this.buffers = [
            new RenderTexture(context.screen.width, context.screen.height, false, this.format, FilterMode.Nearest).createFramebuffer(),
            new RenderTexture(context.screen.width, context.screen.height, false, this.format, FilterMode.Nearest).createFramebuffer(),
        ];
    }

    render(context: RenderContext, data: RenderData<PostprocessData>)
    {
        if (!data.cameraOutput.size.equals(this.buffers[0].size))
        {
            const rt0 = (this.buffers[0].colorAttachments[0] as RenderTexture)
                .resize(data.cameraOutput.width, data.cameraOutput.height, TextureResizing.Discard);
            const rt1 = (this.buffers[1].colorAttachments[0] as RenderTexture)
                .resize(data.cameraOutput.width, data.cameraOutput.height, TextureResizing.Discard);
            this.buffers[0].reset(data.cameraOutput.width, data.cameraOutput.height);
            this.buffers[1].reset(data.cameraOutput.width, data.cameraOutput.height);
            this.buffers[0].addColorAttachment(rt0, 0);
            this.buffers[1].addColorAttachment(rt1, 0);
        }
        const camera = data.camera;
        let [src, dst] = this.buffers;
        const cameraBuffer = data.cameraOutput.colorAttachments[0] as RenderBuffer;
        context.renderer.blitCopy(cameraBuffer, src.colorAttachments[0] as RenderTexture);
        for (const postprocess of camera.postprocess)
        {
            if (!postprocess.__intialized)
            {
                postprocess.create(context);
                postprocess.__intialized = true;
            }

            postprocess.render(context, src.colorAttachments[0] as RenderTexture, dst);
            [src, dst] = [dst, src];
        }
        data.postprocessOutput = src.colorAttachments[0] as RenderTexture;
    }
}