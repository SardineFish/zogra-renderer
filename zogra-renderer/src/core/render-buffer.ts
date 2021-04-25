import { vec2 } from "../types/vec2";
import { panic } from "../utils/util";
import { Asset, GPUAsset } from "./asset";
import { GLContext, GlobalContext } from "./global";
import { ColorAttachment, DepthAttachment } from "./frame-buffer";
import { TextureFormat } from "./texture-format";

type MultiSamples = 0 | 2 | 4 | 8 | 16;

export class RenderBuffer extends GPUAsset implements ColorAttachment
{
    size: vec2;
    multiSampling: MultiSamples = 0;
    format: TextureFormat = TextureFormat.RGBA8;

    protected glBuf: WebGLRenderbuffer = null as any;
    
    constructor(width: number, height: number, format = TextureFormat.RGBA8, multiSampling: MultiSamples = 0, ctx = GlobalContext())
    {
        super(ctx);
        this.size = vec2(width, height);
        this.format = format;
        this.multiSampling = multiSampling;

        this.tryInit(false);
    }

    get width() { return this.size.x }
    set width(w) { this.size.x = w }
    get height() { return this.size.y }
    set height(h) { this.size.y = h }

    updateParams()
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
    }

    init()
    {
        const gl = this.ctx.gl;

        this.glBuf = gl.createRenderbuffer() ?? panic("Failed to create render buffer.");
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        return true;
    }

    bindFramebuffer(attachment: number)
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + attachment, gl.RENDERBUFFER, this.glBuf);
    }


    destroy()
    {
        super.destroy()
        const gl = this.ctx.gl;
        gl.deleteRenderbuffer(this.glBuf);
    }
}

export class DepthBuffer extends GPUAsset implements DepthAttachment
{
    size: vec2;
    multiSampling: MultiSamples = 0;
    format: TextureFormat = TextureFormat.RGBA8;

    protected glBuf: WebGLRenderbuffer = null as any;

    constructor(width: number, height: number, multiSampling: MultiSamples = 0, ctx = GlobalContext())
    {
        super(ctx);
        this.size = vec2(width, height);
        this.format = TextureFormat.DEPTH_COMPONENT;
        this.multiSampling = multiSampling;

        this.tryInit(false);
    }

    get width() { return this.size.x }
    set width(w) { this.size.x = w }
    get height() { return this.size.y }
    set height(h) { this.size.y = h }

    updateParams()
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
    }

    init()
    {
        const gl = this.ctx.gl;

        this.glBuf = gl.createRenderbuffer() ?? panic("Failed to create render buffer.");
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        return true;
    }

    bindFramebuffer()
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.glBuf);
    }

    destroy()
    {
        super.destroy()
        const gl = this.ctx.gl;
        gl.deleteRenderbuffer(this.glBuf);
    }
}