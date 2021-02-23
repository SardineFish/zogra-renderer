import { GL, GLContext, GlobalContext } from "./global";
import { TextureFormat, mapGLFormat } from "./texture-format";
import { panic } from "../utils/util";
import { BindingData } from "./types";
import { Asset } from "./asset";
import { BuiltinUniformNames } from "../builtin-assets/shaders";

export enum FilterMode
{
    Linear = WebGL2RenderingContext.LINEAR,
    Nearest = WebGL2RenderingContext.NEAREST,
}

export enum WrapMode
{
    Repeat = WebGL2RenderingContext.REPEAT,
    Clamp = WebGL2RenderingContext.CLAMP_TO_EDGE,
    Mirror = WebGL2RenderingContext.MIRRORED_REPEAT,
}

export abstract class Texture extends Asset
{
    // abstract ctx: GLContext;
    abstract format: TextureFormat;
    abstract width: number;
    abstract height: number;
    abstract mipmapLevel: number;
    abstract filterMode: FilterMode;
    abstract wrapMode: WrapMode;

    abstract glTex(): WebGLTexture;

    abstract bind: (location: WebGLUniformLocation, data: BindingData) => void;
}

export enum ResizeContent
{
    Discard = 0,
    Stretch = 1,
    Cover = 2,
    Fit = 3,
    PaddingHigher = 4,
    PaddingLower = 5,
    Center = 6,
}

class TextureBase extends Asset implements Texture
{
    protected ctx: GLContext;
    format: TextureFormat;
    width: number;
    height: number;
    mipmapLevel: number = 0;
    filterMode: FilterMode;
    wrapMode = WrapMode.Repeat;


    protected _glTex: WebGLTexture = null as any;
    protected initialized = false;
    protected created = false;

    constructor(width: number, height: number, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = GlobalContext())
    {
        super();
        this.name = `Texture_${this.assetID}`;
        this.ctx = ctx;
        this.format = format;
        this.width = width;
        this.height = height;
        this.filterMode = filterMode;

        this.tryInit(false);
    }

    glTex()
    { 
        this.create();
        return this._glTex;
    }

    bind(location: WebGLUniformLocation, data: BindingData)
    {
        this.create();

        const gl = data.gl;
        gl.activeTexture(gl.TEXTURE0 + data.nextTextureUnit);
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        gl.uniform1i(location, data.nextTextureUnit);
        data.nextTextureUnit++;
    }
    destroy()
    {
        if (!this.initialized || this.destroyed)
            return;
        const gl = this.ctx.gl;
        gl.deleteTexture(this._glTex);
        super.destroy();
    }

    resize(textureContent = ResizeContent.Discard)
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        let oldTex = this._glTex;
        const tex = gl.createTexture() ?? panic("Failed to create texture.");

        this._glTex = tex;

        this.created = false;
        this.create();

        switch (textureContent)
        {
            case ResizeContent.Discard:
                break;
            default:
                throw new Error("Not implement")
        }

        gl.deleteTexture(oldTex);
    }

    /**
     * Create & allocate texture if not
     */
    protected create()
    {
        if (this.created)
            return;
        
        this.tryInit(true);
        const gl = this.ctx.gl;

        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapMode);

        const [internalFormat, format, type] = mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);

        this.created = true;
    }

    protected setData(pixels: ArrayBufferView | TexImageSource)
    {
        this.create();
        const gl = this.ctx.gl;

        gl.bindTexture(gl.TEXTURE_2D, this._glTex);

        flipTexture(this.ctx, this._glTex, pixels, this.width, this.height, this.format, this.filterMode, this.wrapMode, this.mipmapLevel);
    }

    protected tryInit(required = false): boolean
    {
        if (this.initialized)
            return true;
        
        const ctx = this.ctx || GlobalContext();
        if (!ctx)
        {
            if (required)
                throw new Error("Failed to initialize texture without a global GL context");
            return false;
        }

        const gl = ctx.gl;

        this._glTex = gl.createTexture() ?? panic("Failed to create texture.");

        this.initialized = true;
        return true;
    }
}

export class Texture2D extends TextureBase
{
    constructor(width = 0, height = 0, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = GlobalContext())
    {
        super(width, height, format, filterMode, ctx);
    }
    setData(pixels: ArrayBufferView | TexImageSource)
    {
        if ((pixels as TexImageSource).width !== undefined && (pixels as TexImageSource).height !== undefined)
        {
            pixels = pixels as TexImageSource;
            this.width = pixels.width;
            this.height = pixels.height;
        }

        super.setData(pixels);
    }
}

export class DepthTexture extends TextureBase
{
    constructor(width: number, height: number, ctx = GlobalContext())
    {
        super(width, height, TextureFormat.DEPTH_COMPONENT, FilterMode.Nearest, ctx);
    }
    create()
    {
        super.create();
    }
}

export class RenderTexture extends TextureBase
{
    depthTexture: DepthTexture | null = null;
    constructor(width: number, height: number, depth: boolean = false, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = GlobalContext())
    {
        super(width, height, format, filterMode, ctx);

        if (depth)
        {
            this.depthTexture = new DepthTexture(width, height, ctx);
        }
    }
    setData(pixels: ArrayBufferView | TexImageSource)
    {
        super.setData(pixels);
    }
    destroy()
    {
        if (!this.initialized || this.destroyed)
            return;
        this.depthTexture?.destroy();
        super.destroy();
    }
}

function flipTexture(
    ctx: GLContext,
    dst: WebGLTexture,
    src: ArrayBufferView | TexImageSource,
    width: number,
    height: number,
    texFormat: TextureFormat,
    filterMode: FilterMode,
    wrapMode: WrapMode,
    mipmapLevel: number)
{
    const gl = ctx.gl;
    const srcTex = gl.createTexture() ?? panic("Failed to create texture.");
    const [internalFormat, format, type] = mapGLFormat(gl, texFormat);
    gl.bindTexture(gl.TEXTURE_2D, srcTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapMode);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapMode);
    if ((src as TexImageSource).width !== undefined && (src as TexImageSource).height !== undefined)
    {
        src = src as TexImageSource;
        gl.texImage2D(gl.TEXTURE_2D, mipmapLevel, internalFormat, format, type, src);

    }
    else
    {
        src = src as ArrayBufferView;
        gl.texImage2D(gl.TEXTURE_2D, mipmapLevel, internalFormat, width, height, 0, format, type, src);
    }

    const fbo = gl.createFramebuffer() ?? panic("Failed to create frame buffer");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dst, 0);
    gl.viewport(0, 0, width, height);
    gl.drawBuffers([gl.COLOR_ATTACHMENT0]);

    const shader = ctx.assets.shaders.FlipTexture;
    shader.use();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, srcTex);
    gl.uniform1i(shader.uniformLocation(BuiltinUniformNames.mainTex), 0);

    const mesh = ctx.assets.meshes.screenQuad;
    mesh.bind(shader);

    gl.drawElements(gl.TRIANGLE_STRIP, mesh.triangles.length, gl.UNSIGNED_INT, 0);

    gl.deleteFramebuffer(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteTexture(srcTex);
}