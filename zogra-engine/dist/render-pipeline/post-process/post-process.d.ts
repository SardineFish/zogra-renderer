import { FrameBuffer, RenderTexture, TextureFormat } from "zogra-renderer";
import { RenderData } from "../render-data";
import { RenderPass } from "../render-pass/render-pass";
import { RenderContext } from "../render-pipeline";
export declare abstract class PostProcess {
    create(context: RenderContext): void;
    abstract render(context: RenderContext, src: RenderTexture, dst: FrameBuffer): void;
}
export interface PostprocessData {
    postprocessOutput: RenderTexture;
}
export declare class PostprocessPass extends RenderPass<PostprocessData> {
    buffers: [FrameBuffer, FrameBuffer];
    format: TextureFormat;
    constructor(context: RenderContext, renderFormat: TextureFormat);
    render(context: RenderContext, data: RenderData<PostprocessData>): void;
}
