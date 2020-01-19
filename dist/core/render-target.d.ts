import { RenderTexture, DepthTexture } from "./texture";
import { GLContext } from "./global";
interface FrameBufferAttachment {
    tex: WebGLTexture | null;
    attachPoint: number;
}
declare const FrameBufferAttachment: {
    canvasOutput: FrameBufferAttachment;
    fromRenderTexture: (rt: RenderTexture) => FrameBufferAttachment;
};
export declare class RenderTarget {
    width: number;
    height: number;
    colorAttachments: FrameBufferAttachment[];
    depthAttachment: FrameBufferAttachment;
    frameBuffer: WebGLFramebuffer | null;
    isCanvasTarget: boolean;
    static CanvasTarget: Readonly<RenderTarget>;
    constructor(width?: number, height?: number, ctx?: GLContext);
    addColorAttachment(rt: RenderTexture): void;
    setDepthAttachment(rt: DepthTexture): void;
    bind(ctx?: GLContext): void;
    release(ctx?: GLContext): void;
}
export {};
