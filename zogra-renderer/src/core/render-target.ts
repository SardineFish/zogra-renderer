import { RenderTexture, DepthTexture } from "./texture";
import { GL, GlobalContext, GLContext } from "./global";
import { panic } from "../utils/util";
import { vec2 } from "../types/vec2";

interface FrameBufferAttachment
{
    tex: WebGLTexture | null;
    attachPoint: number;
}
const FrameBufferAttachment = {
    canvasOutput: { tex: null, attachPoint: WebGL2RenderingContext.BACK } as FrameBufferAttachment,
    fromRenderTexture: (rt: RenderTexture) => ({ tex: rt.glTex() } as FrameBufferAttachment)
};

export interface IRenderTarget
{
    readonly width: number;
    readonly height: number;
    readonly size: vec2;
    bind(): void;
    release(): void;
}

class CanvasTarget implements IRenderTarget
{
    get width() { return GlobalContext().width }
    get height() { return GlobalContext().height }
    get size() { return GlobalContext().renderer.canvasSize }
    bind()
    {
        const gl = GlobalContext().gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.width, this.height);
    }
    release() { }
}

export class RenderTarget implements IRenderTarget
{
    width: number;
    height: number;
    private colorAttachments: FrameBufferAttachment[] = [];
    private depthAttachment: FrameBufferAttachment = FrameBufferAttachment.canvasOutput;
    private frameBuffer: WebGLFramebuffer | null;

    isCanvasTarget = false;

    static CanvasTarget = Object.freeze(new CanvasTarget());

    constructor(width = 0, height = 0, ctx = GlobalContext())
    {
        this.width = width;
        this.height = height
        if (!ctx)
            this.frameBuffer = null;
        else
            this.frameBuffer = ctx.gl.createFramebuffer() ?? panic("Failed to create frame buffer");
    }

    get size() { return vec2(this.width, this.height) }

    addColorAttachment(rt: RenderTexture)
    {
        if (rt === null)
        {
            return;
        }
        // this.isCanvasTarget = false;
        if (this.width == 0 && this.height == 0)
        {
            this.width = rt.width;
            this.height = rt.height;
        }
        if (this.width != rt.width || this.height != rt.height)
            throw new Error("Framebuffer attachments must in same resolution.");
        this.colorAttachments.push(FrameBufferAttachment.fromRenderTexture(rt));
    }

    setDepthAttachment(rt: DepthTexture)
    {
        if (this.width == 0 && this.height == 0)
        {
            this.width = rt.width;
            this.height = rt.height;
        }
        if (this.width != rt.width || this.height != rt.height)
            throw new Error("Framebuffer attachments must in same resolution.");
        this.depthAttachment = { tex: rt?.glTex ?? null, attachPoint: WebGL2RenderingContext.DEPTH_ATTACHMENT };
    }

    bind(ctx: GLContext = GlobalContext())
    {
        const gl = ctx.gl;
        if (this.isCanvasTarget)
        {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, ctx.width, ctx.height);
        }
        else
        {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
            let attachIdx = 0;
            for (let i = 0; i < this.colorAttachments.length; i++)
            {
                if (this.colorAttachments[i].tex)
                {
                    this.colorAttachments[i].attachPoint = gl.COLOR_ATTACHMENT0 + attachIdx++;
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, this.colorAttachments[i].attachPoint, gl.TEXTURE_2D, this.colorAttachments[i].tex, 0);
                }
                
            }

            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthAttachment.tex, 0);

            gl.viewport(0, 0, this.width, this.height);
            const buffers = this.colorAttachments.map(t => t.attachPoint);
            gl.drawBuffers(buffers);
        }
    }

    release(ctx: GLContext = GlobalContext())
    {
        if (this.isCanvasTarget)
            return;
        const gl = ctx.gl;
        gl.deleteFramebuffer(this.frameBuffer);
    }
}