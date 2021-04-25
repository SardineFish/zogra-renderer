"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGLFormat = exports.TextureFormat = void 0;
var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["RGB"] = WebGL2RenderingContext.RGB] = "RGB";
    TextureFormat[TextureFormat["RGBA"] = WebGL2RenderingContext.RGBA] = "RGBA";
    TextureFormat[TextureFormat["LUMINANCE_ALPHA"] = WebGL2RenderingContext.LUMINANCE_ALPHA] = "LUMINANCE_ALPHA";
    TextureFormat[TextureFormat["LUMINANCE"] = WebGL2RenderingContext.LUMINANCE] = "LUMINANCE";
    TextureFormat[TextureFormat["ALPHA"] = WebGL2RenderingContext.ALPHA] = "ALPHA";
    TextureFormat[TextureFormat["R8"] = WebGL2RenderingContext.R8] = "R8";
    TextureFormat[TextureFormat["R16F"] = WebGL2RenderingContext.R16F] = "R16F";
    TextureFormat[TextureFormat["R32F"] = WebGL2RenderingContext.R32F] = "R32F";
    TextureFormat[TextureFormat["R8UI"] = WebGL2RenderingContext.R8UI] = "R8UI";
    TextureFormat[TextureFormat["RG8"] = WebGL2RenderingContext.RG8] = "RG8";
    TextureFormat[TextureFormat["RG16F"] = WebGL2RenderingContext.RG16F] = "RG16F";
    TextureFormat[TextureFormat["RG32F"] = WebGL2RenderingContext.RG32F] = "RG32F";
    TextureFormat[TextureFormat["RG8UI"] = WebGL2RenderingContext.RG8UI] = "RG8UI";
    TextureFormat[TextureFormat["RGB8"] = WebGL2RenderingContext.RGB8] = "RGB8";
    TextureFormat[TextureFormat["SRGB8"] = WebGL2RenderingContext.SRGB8] = "SRGB8";
    TextureFormat[TextureFormat["RGB565"] = WebGL2RenderingContext.RGB565] = "RGB565";
    TextureFormat[TextureFormat["R11F_G11F_B10F"] = WebGL2RenderingContext.R11F_G11F_B10F] = "R11F_G11F_B10F";
    TextureFormat[TextureFormat["RGB9_E5"] = WebGL2RenderingContext.RGB9_E5] = "RGB9_E5";
    TextureFormat[TextureFormat["RGB16F"] = WebGL2RenderingContext.RGB16F] = "RGB16F";
    TextureFormat[TextureFormat["RGB32F"] = WebGL2RenderingContext.RGB32F] = "RGB32F";
    TextureFormat[TextureFormat["RGB8UI"] = WebGL2RenderingContext.RGB8UI] = "RGB8UI";
    TextureFormat[TextureFormat["RGBA8"] = WebGL2RenderingContext.RGBA8] = "RGBA8";
    TextureFormat[TextureFormat["SRGB8_ALPHA8"] = WebGL2RenderingContext.SRGB8_ALPHA8] = "SRGB8_ALPHA8";
    TextureFormat[TextureFormat["RGB5_A1"] = WebGL2RenderingContext.RGB5_A1] = "RGB5_A1";
    TextureFormat[TextureFormat["RGB10_A2"] = WebGL2RenderingContext.RGB10_A2] = "RGB10_A2";
    TextureFormat[TextureFormat["RGBA4"] = WebGL2RenderingContext.RGBA4] = "RGBA4";
    TextureFormat[TextureFormat["RGBA16F"] = WebGL2RenderingContext.RGBA16F] = "RGBA16F";
    TextureFormat[TextureFormat["RGBA32F"] = WebGL2RenderingContext.RGBA32F] = "RGBA32F";
    TextureFormat[TextureFormat["RGBA8UI"] = WebGL2RenderingContext.RGBA8UI] = "RGBA8UI";
    TextureFormat[TextureFormat["DEPTH_COMPONENT"] = WebGL2RenderingContext.DEPTH_COMPONENT] = "DEPTH_COMPONENT";
    TextureFormat[TextureFormat["DEPTH_STENCIL"] = WebGL2RenderingContext.DEPTH_STENCIL] = "DEPTH_STENCIL";
})(TextureFormat = exports.TextureFormat || (exports.TextureFormat = {}));
;
function mapGLFormat(gl, format) {
    const map = {
        [TextureFormat.RGB]: [gl.RGB, gl.RGB, gl.UNSIGNED_BYTE],
        [TextureFormat.RGBA]: [gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.LUMINANCE_ALPHA]: [gl.LUMINANCE_ALPHA, gl.LUMINANCE_ALPHA, gl.UNSIGNED_BYTE],
        [TextureFormat.LUMINANCE]: [gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE],
        [TextureFormat.ALPHA]: [gl.ALPHA, gl.ALPHA, gl.UNSIGNED_BYTE],
        [TextureFormat.R8]: [gl.R8, gl.RED, gl.UNSIGNED_BYTE],
        [TextureFormat.R16F]: [gl.R16F, gl.RED, gl.HALF_FLOAT],
        [TextureFormat.R32F]: [gl.R32F, gl.RED, gl.FLOAT],
        [TextureFormat.R8UI]: [gl.R8UI, gl.RED_INTEGER, gl.UNSIGNED_BYTE],
        [TextureFormat.RG8]: [gl.RG8, gl.RG, gl.UNSIGNED_BYTE],
        [TextureFormat.RG16F]: [gl.RG16F, gl.RG, gl.HALF_FLOAT],
        [TextureFormat.RG32F]: [gl.RG32F, gl.RG, gl.FLOAT],
        [TextureFormat.RG8UI]: [gl.RG8UI, gl.RG_INTEGER, gl.UNSIGNED_BYTE],
        [TextureFormat.RGB8]: [gl.RGB8, gl.RGB, gl.UNSIGNED_BYTE],
        [TextureFormat.SRGB8]: [gl.SRGB8, gl.RGB, gl.UNSIGNED_BYTE],
        [TextureFormat.RGB565]: [gl.RGB565, gl.RGB, gl.UNSIGNED_BYTE],
        [TextureFormat.R11F_G11F_B10F]: [gl.R11F_G11F_B10F, gl.RGB, gl.UNSIGNED_INT_10F_11F_11F_REV],
        [TextureFormat.RGB9_E5]: [gl.RGB9_E5, gl.RGB, gl.HALF_FLOAT],
        [TextureFormat.RGB16F]: [gl.RGB16F, gl.RGB, gl.HALF_FLOAT],
        [TextureFormat.RGB32F]: [gl.RGB32F, gl.RGB, gl.FLOAT],
        [TextureFormat.RGB8UI]: [gl.RGB8UI, gl.RGB_INTEGER, gl.UNSIGNED_BYTE],
        [TextureFormat.RGBA8]: [gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.SRGB8_ALPHA8]: [gl.SRGB8_ALPHA8, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.RGB5_A1]: [gl.RGB5_A1, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.RGB10_A2]: [gl.RGB10_A2, gl.RGBA, gl.UNSIGNED_INT_2_10_10_10_REV],
        [TextureFormat.RGBA4]: [gl.RGBA4, gl.RGBA, gl.UNSIGNED_BYTE],
        [TextureFormat.RGBA16F]: [gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT],
        [TextureFormat.RGBA32F]: [gl.RGBA32F, gl.RGBA, gl.FLOAT],
        [TextureFormat.RGBA8UI]: [gl.RGBA8UI, gl.RGBA_INTEGER, gl.UNSIGNED_BYTE],
        [TextureFormat.DEPTH_COMPONENT]: [gl.DEPTH_COMPONENT, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT],
        [TextureFormat.DEPTH_STENCIL]: [gl.DEPTH_STENCIL, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT],
    };
    return map[format];
}
exports.mapGLFormat = mapGLFormat;
//# sourceMappingURL=texture-format.js.map