import { GLContext } from "./global";
import { TextureFormat } from "./texture-format";
import { BindingData } from "./types";
import { Asset } from "./asset";
export declare enum FilterMode {
    Linear,
    Nearest
}
export declare enum WrapMode {
    Repeat,
    Clamp,
    Mirror
}
export declare abstract class Texture extends Asset {
    abstract ctx: GLContext;
    abstract format: TextureFormat;
    abstract width: number;
    abstract height: number;
    abstract mipmapLevel: number;
    abstract glTex: WebGLTexture;
    abstract filterMode: FilterMode;
    abstract wrapMode: WrapMode;
    abstract bind: (location: WebGLUniformLocation, data: BindingData) => void;
}
declare class TextureBase extends Asset implements Texture {
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
    bind(location: WebGLUniformLocation, data: BindingData): void;
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
