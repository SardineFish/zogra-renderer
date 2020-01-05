import { TextureFormat } from "./texture-format";
export declare enum FilterMode {
    Linear,
    Nearest
}
export declare enum WrapMode {
    Repeat,
    Clamp,
    Mirror
}
export declare class Texture {
    gl: WebGL2RenderingContext;
    format: TextureFormat;
    width: number;
    height: number;
    mipmapLevel: number;
    glTex: WebGLTexture;
    filterMode: FilterMode;
    wrapMode: WrapMode;
    constructor(width: number, height: number, format?: TextureFormat, filterMode?: FilterMode, gl?: WebGL2RenderingContext);
    protected setup(): void;
}
export declare class Texture2D extends Texture {
    constructor(width?: number, height?: number, format?: TextureFormat, filterMode?: FilterMode, gl?: WebGL2RenderingContext);
    setData(pixels: ArrayBufferView | TexImageSource): void;
}
export declare class DepthTexture extends Texture {
    constructor(width: number, height: number, gl?: WebGL2RenderingContext);
    create(): void;
}
export declare class RenderTexture extends Texture {
    depthTexture: DepthTexture | null;
    constructor(width: number, height: number, depth: boolean, format?: TextureFormat, filterMode?: FilterMode, gl?: WebGL2RenderingContext);
    create(): void;
}
