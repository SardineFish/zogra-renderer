import { GL } from "./global";
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

export class Texture
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
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapMode);
    }

    
}

export class Texture2D extends Texture
{
    constructor(width = 0, height = 0, format = TextureFormat.RGBA, filterMode = FilterMode.Linear, gl = GL())
    {
        super(width, height, format, filterMode, gl);
    }
    setData(pixels: ArrayBufferView | TexImageSource)
    {
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);

        const [internalFormat, format, type] = mapGLFormat(gl, TextureFormat.DEPTH_COMPONENT);
        if (pixels.hasOwnProperty("width") && pixels.hasOwnProperty("height"))
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

export class DepthTexture extends Texture
{
    constructor(width: number, height: number, gl = GL())
    {
        super(width, height, TextureFormat.DEPTH_COMPONENT, FilterMode.Nearest, gl);
    }
    create()
    {
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);

        const [internalFormat, format, type] = mapGLFormat(gl, TextureFormat.DEPTH_COMPONENT);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);

        super.setup();
    }
}

export class RenderTexture extends Texture
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
        const gl = this.gl;
        const [internalFormat, format, type] = mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);

        super.setup();
    }
}