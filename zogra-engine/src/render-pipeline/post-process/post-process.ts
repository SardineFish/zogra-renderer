import { FrameBuffer, RenderTexture } from "zogra-renderer";
import { RenderContext } from "../render-pipeline";

export abstract class PostProcess
{
    /** @internal */
    __intialized = false;
    create(context: RenderContext){}
    abstract render(context: RenderContext, src: RenderTexture, dst: FrameBuffer): void;
}