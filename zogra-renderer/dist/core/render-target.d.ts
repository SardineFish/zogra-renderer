import { GLContext } from "./global";
import { vec2 } from "../types/vec2";
import { GPUAsset } from "./asset";
export interface ColorAttachment {
    width: number;
    height: number;
    bindFramebuffer(attachment: number): void;
}
export interface DepthAttachment {
    width: number;
    height: number;
    bindFramebuffer(): void;
}
export interface IFrameBuffer {
    readonly width: number;
    readonly height: number;
    readonly size: Readonly<vec2>;
    bind(): void;
    destroy(): void;
}
declare class CanvasBuffer implements IFrameBuffer {
    get name(): string;
    get assetID(): number;
    get width(): number;
    get height(): number;
    get size(): import("../types/vec2").Vector2;
    bind(): void;
    destroy(): void;
}
export declare class FrameBuffer extends GPUAsset implements IFrameBuffer {
    readonly width: number;
    readonly height: number;
    readonly size: Readonly<vec2>;
    private colorAttachments;
    private depthAttachment;
    private frameBuffer;
    private activeBuffers;
    private dirty;
    static CanvasBuffer: Readonly<CanvasBuffer>;
    constructor(width?: number, height?: number, ctx?: GLContext);
    addColorAttachment(rt: ColorAttachment, attachPoit?: number): void;
    setDepthAttachment(attachment: DepthAttachment): void;
    protected init(): boolean;
    bind(): void;
    destroy(): void;
}
export {};
