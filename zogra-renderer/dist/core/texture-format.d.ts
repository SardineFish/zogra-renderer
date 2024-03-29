export declare enum TextureFormat {
    RGB,
    RGBA,
    LUMINANCE_ALPHA,
    LUMINANCE,
    ALPHA,
    R8,
    R16F,
    R32F,
    R8UI,
    RG8,
    RG16F,
    RG32F,
    RG8UI,
    RGB8,
    SRGB8,
    RGB565,
    R11F_G11F_B10F,
    RGB9_E5,
    RGB16F,
    RGB32F,
    RGB8UI,
    RGBA8,
    SRGB8_ALPHA8,
    RGB5_A1,
    RGB10_A2,
    RGBA4,
    RGBA16F,
    RGBA32F,
    RGBA8UI,
    DEPTH_COMPONENT,
    DEPTH_STENCIL,
    DEPTH24_STENCIL8,
    DEPTH32F_STENCIL8,
    DEPTH_COMPONENT24,
    DEPTH_COMPONENT32F
}
export declare function mapGLFormat(gl: WebGL2RenderingContext, format: TextureFormat): [GLenum, GLenum, GLenum];
