import { FrameBuffer, RenderTexture } from "zogra-renderer";
import { RenderContext } from "../render-pipeline";
export declare abstract class PostProcess {
    create(context: RenderContext): void;
    abstract render(context: RenderContext, src: RenderTexture, dst: FrameBuffer): void;
}
