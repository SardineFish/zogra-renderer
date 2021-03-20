import { RenderTexture, DepthTexture } from "./texture";
import { GLContext } from "./global";
import { vec2 } from "../types/vec2";
export interface IRenderTarget {
    readonly width: number;
    readonly height: number;
    readonly size: vec2;
    bind(): void;
    release(): void;
}
declare class CanvasTarget implements IRenderTarget {
    get width(): number;
    get height(): number;
    get size(): import("../types/vec2").Vector2;
    bind(): void;
    release(): void;
}
export declare class RenderTarget implements IRenderTarget {
    width: number;
    height: number;
    private colorAttachments;
    private depthAttachment;
    private frameBuffer;
    isCanvasTarget: boolean;
    static CanvasTarget: Readonly<CanvasTarget>;
    constructor(width?: number, height?: number, ctx?: GLContext);
    get size(): import("../types/vec2").Vector2;
    addColorAttachment(rt: RenderTexture): void;
    setDepthAttachment(rt: DepthTexture): void;
    bind(ctx?: GLContext): void;
    release(ctx?: GLContext): void;
}
export {};
