import { GLContext } from "./global";
import { TextureFormat } from "./texture-format";
import { RenderData } from "./types";
export declare enum FilterMode {
    Linear,
    Nearest
}
export declare enum WrapMode {
    Repeat,
    Clamp,
    Mirror
}
export interface Texture {
    ctx: GLContext;
    format: TextureFormat;
    width: number;
    height: number;
    mipmapLevel: number;
    glTex: WebGLTexture;
    filterMode: FilterMode;
    wrapMode: WrapMode;
    bind: (location: WebGLUniformLocation, data: RenderData) => void;
}
declare class TextureBase implements Texture {
    ctx: GLContext;
    format: TextureFormat;
    width: number;
    height: number;
    mipmapLevel: number;
    glTex: WebGLTexture;
    filterMode: FilterMode;
    wrapMode: WrapMode;
    constructor(width: number, height: number, format?: TextureFormat, filterMode?: FilterMode, ctx?: GLContext);
    protected setup(): void;
    bind(location: WebGLUniformLocation, data: RenderData): void;
}
export declare class Texture2D extends TextureBase {
    constructor(width?: number, height?: number, format?: TextureFormat, filterMode?: FilterMode, ctx?: GLContext);
    setData(pixels: ArrayBufferView | TexImageSource): void;
}
export declare class DepthTexture extends TextureBase {
    constructor(width: number, height: number, ctx?: GLContext);
    create(): void;
}
export declare class RenderTexture extends TextureBase {
    depthTexture: DepthTexture | null;
    constructor(width: number, height: number, depth: boolean, format?: TextureFormat, filterMode?: FilterMode, ctx?: GLContext);
    update(): void;
    setData(pixels: ArrayBufferView | TexImageSource): void;
}
export {};
