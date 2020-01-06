import { GL, GLContext, GlobalContext } from "./global";
import { TextureFormat, mapGLFormat } from "./texture-format";
import { panic } from "../utils/util";

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

export interface Texture
{
    gl: WebGL2RenderingContext;
    format: TextureFormat;
    width: number;
    height: number;
    mipmapLevel: number;
    glTex: WebGLTexture;
    filterMode: FilterMode;
    wrapMode: WrapMode;

    bind: (location: WebGLUniformLocation, unit: number, ctx?: GLContext) => void;
}

class TextureBase implements Texture
{
    gl: WebGL2RenderingContext;
    format: TextureFormat;
    width: number;
    height: number;
    mipmapLevel: number = 0;
    glTex: WebGLTexture;
    filterMode: FilterMode;
    wrapMode = WrapMode.Repeat;

    constructor(width: number, height: number, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, gl = GL())
    {
        this.gl = gl;
        this.format = format;
        this.width = width;
        this.height = height;
        this.filterMode = filterMode;
        this.glTex = gl.createTexture() ?? panic("Failed to create texture.");
    }

    protected setup()
    {
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapMode);
    }

    bind(location: WebGLUniformLocation, unit: number, ctx = GlobalContext())
    {
        const gl = ctx.gl;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        gl.uniform1i(location, unit);
    }
}

export class Texture2D extends TextureBase
{
    constructor(width = 0, height = 0, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, gl = GL())
    {
        super(width, height, format, filterMode, gl);
    }
    setData(pixels: ArrayBufferView | TexImageSource)
    {
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);

        const [internalFormat, format, type] = mapGLFormat(gl, this.format);
        if ((pixels as TexImageSource).width !== undefined && (pixels as TexImageSource).height !== undefined)
        {
            pixels = pixels as TexImageSource;
            this.width = pixels.width;
            this.height = pixels.height;
            gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, format, type, pixels);
        }
        else
        {
            pixels = pixels as ArrayBufferView;
            gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, pixels);
        }

        super.setup();
    }
}

export class DepthTexture extends TextureBase
{
    constructor(width: number, height: number, gl = GL())
    {
        super(width, height, TextureFormat.DEPTH_COMPONENT, FilterMode.Nearest, gl);
    }
    create()
    {
        super.setup();
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);

        const [internalFormat, format, type] = mapGLFormat(gl, TextureFormat.DEPTH_COMPONENT);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);

    }
}

export class RenderTexture extends TextureBase
{
    depthTexture: DepthTexture | null = null;
    constructor(width: number, height: number, depth: boolean, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, gl = GL())
    {
        super(width, height, format, filterMode, gl);

        if (depth)
        {
            this.depthTexture = new DepthTexture(width, height, gl);
        }
    }
    create()
    {
        super.setup();
        const gl = this.gl;
        const [internalFormat, format, type] = mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);

    }
}