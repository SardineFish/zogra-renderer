import { GL, GLContext, GlobalContext } from "./global";
import { TextureFormat, mapGLFormat } from "./texture-format";
import { panic } from "../utils/util";
import { BindingData } from "./types";
import { Asset } from "./asset";

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
    abstract ctx: GLContext;
    abstract format: TextureFormat;
    abstract width: number;
    abstract height: number;
    abstract mipmapLevel: number;
    abstract glTex: WebGLTexture;
    abstract filterMode: FilterMode;
    abstract wrapMode: WrapMode;

    abstract bind: (location: WebGLUniformLocation, data: BindingData) => void;
}

class TextureBase extends Asset implements Texture
{
    ctx: GLContext;
    format: TextureFormat;
    width: number;
    height: number;
    mipmapLevel: number = 0;
    glTex: WebGLTexture;
    filterMode: FilterMode;
    wrapMode = WrapMode.Repeat;

    constructor(width: number, height: number, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = GlobalContext())
    {
        super();
        const gl = ctx.gl;
        this.ctx = ctx;
        this.format = format;
        this.width = width;
        this.height = height;
        this.filterMode = filterMode;
        this.glTex = gl.createTexture() ?? panic("Failed to create texture.");
    }

    protected setup()
    {
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapMode);
    }

    bind(location: WebGLUniformLocation, data: BindingData)
    {
        const gl = data.gl;
        gl.activeTexture(gl.TEXTURE0 + data.nextTextureUnit);
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        gl.uniform1i(location, data.nextTextureUnit);
        data.nextTextureUnit++;
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
        super.setup();
        const gl = this.ctx.gl;

        const [internalFormat, format, type] = mapGLFormat(gl, this.format);
        if ((pixels as TexImageSource).width !== undefined && (pixels as TexImageSource).height !== undefined)
        {
            pixels = pixels as TexImageSource;
            this.width = pixels.width;
            this.height = pixels.height;
            gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
        }
        else
            gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);

        flipTexture(this.ctx, this.glTex, pixels, this.width, this.height, this.format, this.filterMode, this.wrapMode, this.mipmapLevel);
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
        super.setup();
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);

        const [internalFormat, format, type] = mapGLFormat(gl, TextureFormat.DEPTH_COMPONENT);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);

    }
}

export class RenderTexture extends TextureBase
{
    depthTexture: DepthTexture | null = null;
    constructor(width: number, height: number, depth: boolean, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = GlobalContext())
    {
        super(width, height, format, filterMode, ctx);

        if (depth)
        {
            this.depthTexture = new DepthTexture(width, height, ctx);
        }
        this.update();
    }
    update()
    {
        super.setup();
        const gl = this.ctx.gl;
        const [internalFormat, format, type] = mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
    }
    setData(pixels: ArrayBufferView | TexImageSource)
    {
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);

        const [internalFormat, format, type] = mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
        flipTexture(this.ctx, this.glTex, pixels, this.width, this.height, this.format, this.filterMode, this.wrapMode, this.mipmapLevel);
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
    gl.useProgram(shader.program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, srcTex);
    gl.uniform1i(shader.builtinUniformLocations.mainTex, 0);

    const mesh = ctx.assets.meshes.screenQuad;
    mesh.bind(shader, gl);

    gl.drawElements(gl.TRIANGLE_STRIP, mesh.triangles.length, gl.UNSIGNED_INT, 0);

    gl.deleteFramebuffer(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteTexture(srcTex);
}