import { GLContext } from "./global";
import { TextureFormat } from "./texture-format";
import { Asset, ICloneable } from "./asset";
import { vec2 } from "../types/vec2";
import { ColorAttachment, DepthAttachment, FrameBuffer } from "./frame-buffer";
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
    abstract filterMode: FilterMode;
    abstract wrapMode: WrapMode;
    abstract glTex(): WebGLTexture;
    abstract get size(): vec2;
    abstract bind: (unit: number) => void;
}
export declare enum TextureResizing {
    Discard = 0,
    Stretch = 1,
    Cover = 2,
    Contain = 3,
    KeepLower = 4,
    KeepHigher = 5,
    Center = 6
}
export declare type TextureData = ArrayBufferView | TexImageSource;
declare class TextureBase extends Asset implements Texture {
    protected ctx: GLContext;
    format: TextureFormat;
    width: number;
    height: number;
    autoMipmap: boolean;
    filterMode: FilterMode;
    wrapMode: WrapMode;
    protected _glTex: WebGLTexture;
    protected initialized: boolean;
    protected created: boolean;
    constructor(width: number, height: number, format?: TextureFormat, filterMode?: FilterMode, ctx?: GLContext);
    get size(): import("../types/vec2").Vector2;
    glTex(): WebGLTexture;
    bind(unit: number): void;
    unbind(unit: number): void;
    destroy(): void;
    resize(width: number, height: number, textureContent?: TextureResizing): this;
    generateMipmap(): void;
    updateParameters(): void;
    /**
     * Create & allocate texture if not
     */
    protected create(): void;
    protected setData(pixels: TextureData): void;
    protected tryInit(required?: boolean): boolean;
    protected static wrapGlTex(glTex: WebGLTexture, width: number, height: number, format?: TextureFormat, filterMode?: FilterMode, ctx?: GLContext): TextureBase;
}
export declare class Texture2D extends TextureBase implements ICloneable {
    constructor(width?: number, height?: number, format?: TextureFormat, filterMode?: FilterMode, ctx?: GLContext);
    setData(pixels: TextureData): void;
    clone(): Texture2D;
}
export declare class DepthTexture extends TextureBase implements DepthAttachment {
    constructor(width: number, height: number, ctx?: GLContext);
    bindFramebuffer(): void;
}
export declare class RenderTexture extends TextureBase implements ColorAttachment {
    depthTexture: DepthTexture | null;
    constructor(width: number, height: number, depth?: boolean, format?: TextureFormat, filterMode?: FilterMode, ctx?: GLContext);
    setData(pixels: TextureData): void;
    destroy(): void;
    bindFramebuffer(attachment: number): void;
    createFramebuffer(): FrameBuffer;
}
export {};
