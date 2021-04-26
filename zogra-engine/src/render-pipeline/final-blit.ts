import { FrameBuffer, RenderBuffer, RenderTexture, TextureFormat } from "zogra-renderer";
import { PostprocessData } from "./post-process";
import { RenderData } from "./render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "./render-pipeline";

export class FinalBlit extends RenderPass<Partial<PostprocessData>>
{
    tempRT: RenderTexture;
    constructor(context: RenderContext, format: TextureFormat)
    {
        super();
        this.tempRT = new RenderTexture(context.screen.width, context.screen.height, false, format);
    }
    render(context: RenderContext, data: RenderData<Partial<PostprocessData>>)
    {
        const camera = data.camera;
        if (data.postprocessOutput)
        {
            context.renderer.blit(data.postprocessOutput, camera.output ?? FrameBuffer.CanvasBuffer);
        }
        else if (data.cameraOutput === FrameBuffer.CanvasBuffer)
        {
            return;
        }
        else if (data.cameraOutput instanceof FrameBuffer)
        {
            if (data.cameraOutput.colorAttachments[0] instanceof RenderBuffer)
            {
                if (camera.output instanceof RenderTexture)
                    context.renderer.blitCopy(data.cameraOutput.colorAttachments[0] as RenderBuffer, camera.output);
                else
                {
                    context.renderer.blitCopy(data.cameraOutput.colorAttachments[0] as RenderBuffer, this.tempRT);
                    context.renderer.blit(this.tempRT, FrameBuffer.CanvasBuffer);
                }
            }
            else if (data.cameraOutput.colorAttachments[0] instanceof RenderTexture)
            {
                context.renderer.blit(data.cameraOutput.colorAttachments[0], camera.output ?? FrameBuffer.CanvasBuffer);
            }
        }
    }
}