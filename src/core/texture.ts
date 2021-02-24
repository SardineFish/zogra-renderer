import { GL, GLContext, GlobalContext } from "./global";
import { TextureFormat, mapGLFormat } from "./texture-format";
import { panic } from "../utils/util";
import { BindingData } from "./types";
import { Asset, ICloneable } from "./asset";
import { BuiltinUniformNames } from "../builtin-assets/shaders";
import { vec2 } from "../types/vec2";
import { imageResize, ImageSizing } from "../utils/image-sizing";

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
    // abstract mipmapLevel: number;
    abstract filterMode: FilterMode;
    abstract wrapMode: WrapMode;

    abstract glTex(): WebGLTexture;
    abstract get size(): vec2;

    abstract bind: (unit: number) => void;
}

export enum TextureResizing
{
    Discard = 0,
    Stretch = 1,
    Cover = 2,
    Contain = 3,
    KeepLower = 4,
    KeepHigher = 5,
    Center = 6,
}

export type TextureData = ArrayBufferView | TexImageSource;

class TextureBase extends Asset implements Texture
{
    protected ctx: GLContext;
    format: TextureFormat;
    width: number;
    height: number;
    autoMipmap: boolean = true;
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

    get size() { return vec2(this.width, this.height) }

    glTex()
    { 
        this.create();
        return this._glTex;
    }

    bind(unit: number)
    {
        this.create();

        const gl = this.ctx.gl;

        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        // gl.uniform1i(location, data.nextTextureUnit);
        // data.nextTextureUnit++;
    }
    unbind(unit: number)
    {
        this.create();

        const gl = this.ctx.gl;

        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    destroy()
    {
        if (!this.initialized || this.destroyed)
            return;
        const gl = this.ctx.gl;
        gl.deleteTexture(this._glTex);
        super.destroy();
    }

    resize(width: number, height: number, textureContent = TextureResizing.Discard)
    {
        this.tryInit(true);
        const gl = this.ctx.gl;

        let oldTex = TextureBase.wrapGlTex(this._glTex, this.width, this.height, this.format, this.filterMode, this.ctx);
        let newTex = new RenderTexture(width, height, false, this.format, this.filterMode, this.ctx);
        newTex.create();

        const prevSize = this.size;
        this.width = width;
        this.height = height;
        
        switch (textureContent)
        {
            case TextureResizing.Discard:
                break;
            default:
                const [srcRect, dstrEect] = imageResize(prevSize, newTex.size, textureContent as unknown as ImageSizing);
                this.ctx.renderer.blit(oldTex, newTex, this.ctx.assets.materials.blitCopy, srcRect, dstrEect);
                break;
        }

        this._glTex = newTex._glTex;

        gl.deleteTexture(oldTex._glTex);
    }

    generateMipmap()
    {
        this.create();

        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        gl.generateMipmap(gl.TEXTURE_2D);
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
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, this.width, this.height, 0, format, type, null);

        this.created = true;
    }

    protected setData(pixels: TextureData)
    {
        this.create();
        const gl = this.ctx.gl;

        gl.bindTexture(gl.TEXTURE_2D, this._glTex);

        flipTexture(this.ctx, this._glTex, pixels, this.width, this.height, this.format, this.filterMode, this.wrapMode, 0);

        
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
    
    protected static wrapGlTex(glTex: WebGLTexture, width: number, height: number, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = GlobalContext()): TextureBase
    {
        var texture = new TextureBase(width, height, format, filterMode, ctx);
        texture._glTex = glTex;
        texture.initialized = true;
        texture.created = true;
        return texture;
    }
}

export class Texture2D extends TextureBase implements ICloneable
{
    constructor(width = 0, height = 0, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = GlobalContext())
    {
        super(width, height, format, filterMode, ctx);
    }
    setData(pixels: TextureData)
    {
        if ((pixels as TexImageSource).width !== undefined && (pixels as TexImageSource).height !== undefined)
        {
            pixels = pixels as TexImageSource;
            this.width = pixels.width;
            this.height = pixels.height;
        }

        super.setData(pixels);
    }
    clone(): Texture2D
    {
        if (!this.created)
            this.create();

        let rt = new RenderTexture(this.width, this.height, false, this.format, this.filterMode, this.ctx);

        this.ctx.renderer.blit(this, rt);
        let tex = new Texture2D(this.width, this.height, this.format, this.filterMode, this.ctx);
        tex._glTex = rt.glTex();
        tex.initialized = true;
        tex.created = true;
        return tex;
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
    setData(pixels: TextureData)
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
    const renderer = ctx.renderer;
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


    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, null);

    gl.deleteFramebuffer(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteTexture(srcTex);
}