import { vec2 } from "../types/vec2";
import { GPUAsset } from "./asset";
import { GLContext } from "./global";
import { ColorAttachment, DepthAttachment } from "./frame-buffer";
import { TextureFormat } from "./texture-format";
export declare type MSAASamples = 0 | 2 | 4 | 8;
export declare class RenderBuffer extends GPUAsset implements ColorAttachment {
    size: vec2;
    multiSampling: MSAASamples;
    format: TextureFormat;
    private _glBuf;
    constructor(width: number, height: number, format?: TextureFormat, multiSampling?: MSAASamples, ctx?: GLContext);
    get width(): number;
    get height(): number;
    resize(width: number, height: number): this;
    updateParams(): void;
    init(): boolean;
    bindFramebuffer(attachment: number): void;
    destroy(): void;
}
export declare class DepthBuffer extends GPUAsset implements DepthAttachment {
    size: vec2;
    multiSampling: MSAASamples;
    format: TextureFormat;
    protected glBuf: WebGLRenderbuffer;
    constructor(width: number, height: number, multiSampling?: MSAASamples, ctx?: GLContext);
    get width(): number;
    set width(w: number);
    get height(): number;
    set height(h: number);
    updateParams(): void;
    init(): boolean;
    bindFramebuffer(): void;
    destroy(): void;
}
