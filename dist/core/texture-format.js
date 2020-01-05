"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["RGB"] = 1] = "RGB";
    TextureFormat[TextureFormat["RGBA"] = 2] = "RGBA";
    TextureFormat[TextureFormat["LUMINANCE_ALPHA"] = 3] = "LUMINANCE_ALPHA";
    TextureFormat[TextureFormat["LUMINANCE"] = 4] = "LUMINANCE";
    TextureFormat[TextureFormat["ALPHA"] = 5] = "ALPHA";
    TextureFormat[TextureFormat["R8"] = 6] = "R8";
    TextureFormat[TextureFormat["R16F"] = 7] = "R16F";
    TextureFormat[TextureFormat["R32F"] = 8] = "R32F";
    TextureFormat[TextureFormat["R8UI"] = 9] = "R8UI";
    TextureFormat[TextureFormat["RG8"] = 10] = "RG8";
    TextureFormat[TextureFormat["RG16F"] = 11] = "RG16F";
    TextureFormat[TextureFormat["RG32F"] = 12] = "RG32F";
    TextureFormat[TextureFormat["RG8UI"] = 13] = "RG8UI";
    TextureFormat[TextureFormat["RGB8"] = 14] = "RGB8";
    TextureFormat[TextureFormat["SRGB8"] = 15] = "SRGB8";
    TextureFormat[TextureFormat["RGB565"] = 16] = "RGB565";
    TextureFormat[TextureFormat["R11F_G11F_B10F"] = 17] = "R11F_G11F_B10F";
    TextureFormat[TextureFormat["RGB9_E5"] = 18] = "RGB9_E5";
    TextureFormat[TextureFormat["RGB16F"] = 19] = "RGB16F";
    TextureFormat[TextureFormat["RGB32F"] = 20] = "RGB32F";
    TextureFormat[TextureFormat["RGB8UI"] = 21] = "RGB8UI";
    TextureFormat[TextureFormat["RGBA8"] = 22] = "RGBA8";
    TextureFormat[TextureFormat["SRGB8_ALPHA8"] = 23] = "SRGB8_ALPHA8";
    TextureFormat[TextureFormat["RGB5_A1"] = 24] = "RGB5_A1";
    TextureFormat[TextureFormat["RGB10_A2"] = 25] = "RGB10_A2";
    TextureFormat[TextureFormat["RGBA4"] = 26] = "RGBA4";
    TextureFormat[TextureFormat["RGBA16F"] = 27] = "RGBA16F";
    TextureFormat[TextureFormat["RGBA32F"] = 28] = "RGBA32F";
    TextureFormat[TextureFormat["RGBA8UI"] = 29] = "RGBA8UI";
    TextureFormat[TextureFormat["DEPTH_COMPONENT"] = 30] = "DEPTH_COMPONENT";
    TextureFormat[TextureFormat["DEPTH_STENCIL"] = 31] = "DEPTH_STENCIL";
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