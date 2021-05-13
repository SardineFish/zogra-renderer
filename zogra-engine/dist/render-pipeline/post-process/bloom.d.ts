import { RenderTexture, FrameBuffer } from "zogra-renderer";
import { RenderContext } from "../render-pipeline";
import { PostProcess } from "./post-process";
export declare class Bloom extends PostProcess {
    intensity: number;
    blurSteps: number;
    threshold: number;
    softThreshold: number;
    private materialFilter;
    private materialCompose;
    private blurRenderer;
    private filterOutput;
    create(context: RenderContext): void;
    render(context: RenderContext, src: RenderTexture, dst: FrameBuffer): void;
}
