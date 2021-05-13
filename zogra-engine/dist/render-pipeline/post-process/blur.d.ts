import { RenderTexture, FrameBuffer } from "zogra-renderer";
import { DownsampleBlurRenderer } from "../../utils/blur-renderer";
import { RenderContext } from "../render-pipeline";
import { PostProcess } from "./post-process";
export declare enum BlurMethod {
    Downsample = 0,
    Gussian = 1
}
export declare class Blur extends PostProcess {
    radius: number;
    method: BlurMethod;
    blurRenderer: DownsampleBlurRenderer;
    constructor(method?: BlurMethod);
    render(context: RenderContext, src: RenderTexture, dst: FrameBuffer): void;
}
