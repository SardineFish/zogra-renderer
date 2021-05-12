import { RenderTexture, FrameBuffer } from "zogra-renderer";
import { DownsampleBlurRenderer } from "../../utils/blur-renderer";
import { RenderContext } from "../render-pipeline";
import { PostProcess } from "./post-process";

export enum BlurMethod
{
    Downsample,
    Gussian,
}

export class Blur extends PostProcess
{
    radius = 64;
    method: BlurMethod;
    blurRenderer = new DownsampleBlurRenderer();

    constructor(method: BlurMethod = BlurMethod.Downsample)
    {
        super();
        this.method = method;
    }
    
    render(context: RenderContext, src: RenderTexture, dst: FrameBuffer): void
    {
        if (this.radius > 0)
        {
            this.blurRenderer.blur(src, Math.log2(this.radius), dst);
        }
        else
        {
            context.renderer.blit(src, dst);
        }
    }
}