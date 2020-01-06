import { RenderTexture, DepthTexture } from "./texture";
import { GL, GlobalContext, GLContext } from "./global";
import { panic } from "../utils/util";

interface FrameBufferAttachment
{
    tex: WebGLTexture | null;
}
const FrameBufferAttachment = {
    canvasOutput: { tex: null } as FrameBufferAttachment,
    fromRenderTexture: (rt: RenderTexture) => ({ tex: rt.glTex } as FrameBufferAttachment)
};

export class RenderTarget
{
    width: number;
    height: number;
    colorAttachments: FrameBufferAttachment[] = [];
    depthAttachment: FrameBufferAttachment = FrameBufferAttachment.canvasOutput;
    frameBuffer: WebGLFramebuffer | null;

    isCanvasTarget = true;

    static CanvasTarget = Object.freeze(new RenderTarget());

    constructor(width = 0, height = 0, ctx = GlobalContext())
    {
        this.width = width;
        this.height = height
        if (!ctx)
            this.frameBuffer = null;
        else
            this.frameBuffer = ctx.gl.createFramebuffer() ?? panic("Failed to create frame buffer");
    }

    addColorAttachment(rt: RenderTexture)
    {
        if (rt === null)
            return;
        this.isCanvasTarget = false;
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
        this.depthAttachment = { tex: rt?.glTex ?? null };
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

            for (let i = 0; i < this.colorAttachments.length; i++)
            {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this.colorAttachments[i].tex, 0);
            }
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthAttachment.tex, 0);


            gl.viewport(0, 0, this.width, this.height);
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