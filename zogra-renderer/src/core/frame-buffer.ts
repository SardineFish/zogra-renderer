import { RenderTexture, DepthTexture } from "./texture";
import { GL, GlobalContext, GLContext } from "./global";
import { panic } from "../utils/util";
import { vec2 } from "../types/vec2";
import { DepthBuffer, RenderBuffer } from "./render-buffer";
import { Asset, GPUAsset, IAsset } from "./asset";

interface FrameBufferAttachment
{
    tex: WebGLTexture | null;
    attachPoint: number;
}
const FrameBufferAttachment = {
    canvasOutput: { tex: null, attachPoint: WebGL2RenderingContext.BACK } as FrameBufferAttachment,
    fromRenderTexture: (rt: RenderTexture) => ({ tex: rt.glTex() } as FrameBufferAttachment)
};

export interface ColorAttachment
{
    width: number;
    height: number;
    bindFramebuffer(attachment: number): void,
}

export interface DepthAttachment
{
    width: number;
    height: number;
    bindFramebuffer(): void,
}

export interface IFrameBuffer
{
    readonly width: number;
    readonly height: number;
    readonly size: Readonly<vec2>;
    bind(): void;
    destroy(): void;
}

class CanvasBuffer implements IFrameBuffer
{
    get name() { return "" }
    get assetID() { return -1 }
    get width() { return GlobalContext().width }
    get height() { return GlobalContext().height }
    get size() { return GlobalContext().renderer.canvasSize }
    bind()
    {
        const gl = GlobalContext().gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.width, this.height);
    }

    destroy() { }
    
}

export class FrameBuffer extends GPUAsset implements IFrameBuffer
{
    readonly size: vec2;
    get width() { return this.size.x }
    get height() { return this.size.y }

    private frameBuffer: WebGLFramebuffer = null as any;
    private _colorAttachments: Array<ColorAttachment | null> = [];
    private _depthAttachment: DepthAttachment | null = null;
    private activeBuffers: number[] = [];
    private dirty = true;

    static CanvasBuffer = Object.freeze(new CanvasBuffer());

    get colorAttachments(): ReadonlyArray<ColorAttachment | null> { return this._colorAttachments }
    get depthAttachment() { return this._depthAttachment }

    constructor(width = 0, height = 0, ctx = GlobalContext())
    {
        super(ctx);
        this.size = vec2(Math.floor(width), Math.floor(height));
        
        this.tryInit(false);
    }

    /** @internal */
    glFBO()
    {
        this.tryInit(true);
        return this.frameBuffer;
    }

    addColorAttachment(attachment: ColorAttachment, attachPoit: number = this._colorAttachments.length)
    {
        if (attachment.width !== this.size.x || attachment.height !== this.size.y)
            console.warn(`Color attachment size [${attachment.width}, ${attachment.height}] missmatch with framebuffer.`);
        this._colorAttachments[attachPoit] = attachment;
        this.dirty = true;
    }

    setDepthAttachment(attachment: DepthAttachment)
    {
        if (attachment.width !== this.size.x || attachment.height !== this.size.y)
            console.warn(`Depth attachment size [${attachment.width}, ${attachment.height}] missmatch with framebuffer.`);
        this._depthAttachment = attachment;
        this.dirty = true;
    }

    reset(width = this.width, height = this.height)
    {
        this.size.x = width;
        this.size.y = height;
        this._colorAttachments = [];
        this._depthAttachment = null;
        this.dirty = true;
    }

    protected init()
    {
        const gl = this.ctx.gl;
        this.frameBuffer = gl.createFramebuffer() ?? panic("Failed to create frame buffer object");

        return true;
    }

    bind()
    {
        this.tryInit(true);
        const gl = this.ctx.gl;
        
        this.activeBuffers = [];
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        for (let i = 0; i < this._colorAttachments.length; i++)
        {
            if (this._colorAttachments[i])
            {
                (this._colorAttachments[i] as ColorAttachment).bindFramebuffer(i);
                this.activeBuffers.push(gl.COLOR_ATTACHMENT0 + i);
            }
            else
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.RENDERBUFFER, null);
        }
        if (this._depthAttachment)
        {
            this._depthAttachment.bindFramebuffer();
        }
        else
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, null);
        
        gl.viewport(0, 0, this.width, this.height);
        gl.drawBuffers(this.activeBuffers);
        
    }
    
    destroy()
    {
        super.destroy();
        const gl = this.ctx.gl;
        gl.deleteFramebuffer(this.frameBuffer);
    }
}