import { RenderTexture, Texture, vec4, ZograRenderer } from "zogra-renderer";
declare const MaterialBlur_base: typeof import("zogra-renderer").MaterialType;
declare class MaterialBlur extends MaterialBlur_base {
    texture: Texture | null;
    textureSize: vec4;
    sampleOffset: number;
}
export declare class DownsampleBlurRenderer {
    steps: RenderTexture[];
    downsampleMaterial: MaterialBlur;
    upsampleMaterial: MaterialBlur;
    init(texture: Texture): void;
    blur(texture: Texture, iteration?: number, output?: RenderTexture, ctx?: import("zogra-renderer").GLContext): RenderTexture;
    downSample(renderer: ZograRenderer, input: Texture, iteration: number): void;
    upSample(renderer: ZograRenderer, iteration: number, finalOutput?: RenderTexture): RenderTexture;
}
export {};
