import { RenderTexture, TextureFormat } from "zogra-renderer";
import { PostprocessData } from "../post-process";
import { RenderData } from "../render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "../render-pipeline";
export declare class FinalBlit extends RenderPass<Partial<PostprocessData>> {
    tempRT: RenderTexture;
    constructor(context: RenderContext, format: TextureFormat);
    render(context: RenderContext, data: RenderData<Partial<PostprocessData>>): void;
}
