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
    abstract format: TextureFormat;
    abstract width: number;
    abstract height: number;
    abstract mipmapLevel: number;
    abstract filterMode: FilterMode;
    abstract wrapMode: WrapMode;
    abstract glTex(): WebGLTexture;
    abstract bind: (location: WebGLUniformLocation, data: BindingData) => void;
}
export declare enum ResizeContent {
    Discard = 0,
    Stretch = 1,
    Cover = 2,
    Fit = 3,
    PaddingHigher = 4,
    PaddingLower = 5,
    Center = 6
}
declare class TextureBase extends Asset implements Texture {
    protected ctx: GLContext;
    format: TextureFormat;
    width: number;
    height: number;
    mipmapLevel: number;
    filterMode: FilterMode;
    wrapMode: WrapMode;
    protected _glTex: WebGLTexture;
    protected initialized: boolean;
    protected created: boolean;
    constructor(width: number, height: number, format?: TextureFormat, filterMode?: FilterMode, ctx?: GLContext);
    glTex(): WebGLTexture;
    bind(location: WebGLUniformLocation, data: BindingData): void;
    destroy(): void;
    resize(textureContent?: ResizeContent): void;
    /**
     * Create & allocate texture if not
     */
    protected create(): void;
    protected setData(pixels: ArrayBufferView | TexImageSource): void;
    protected tryInit(required?: boolean): boolean;
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
    constructor(width: number, height: number, depth?: boolean, format?: TextureFormat, filterMode?: FilterMode, ctx?: GLContext);
    setData(pixels: ArrayBufferView | TexImageSource): void;
    destroy(): void;
}
export {};
