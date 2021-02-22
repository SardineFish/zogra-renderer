"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderTexture = exports.DepthTexture = exports.Texture2D = exports.Texture = exports.WrapMode = exports.FilterMode = void 0;
const global_1 = require("./global");
const texture_format_1 = require("./texture-format");
const util_1 = require("../utils/util");
const asset_1 = require("./asset");
const shaders_1 = require("../builtin-assets/shaders");
var FilterMode;
(function (FilterMode) {
    FilterMode[FilterMode["Linear"] = WebGL2RenderingContext.LINEAR] = "Linear";
    FilterMode[FilterMode["Nearest"] = WebGL2RenderingContext.NEAREST] = "Nearest";
})(FilterMode = exports.FilterMode || (exports.FilterMode = {}));
var WrapMode;
(function (WrapMode) {
    WrapMode[WrapMode["Repeat"] = WebGL2RenderingContext.REPEAT] = "Repeat";
    WrapMode[WrapMode["Clamp"] = WebGL2RenderingContext.CLAMP_TO_EDGE] = "Clamp";
    WrapMode[WrapMode["Mirror"] = WebGL2RenderingContext.MIRRORED_REPEAT] = "Mirror";
})(WrapMode = exports.WrapMode || (exports.WrapMode = {}));
class Texture extends asset_1.Asset {
}
exports.Texture = Texture;
class TextureBase extends asset_1.Asset {
    constructor(width, height, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        var _a;
        super();
        this.mipmapLevel = 0;
        this.wrapMode = WrapMode.Repeat;
        this.name = `Texture_${this.assetID}`;
        const gl = ctx.gl;
        this.ctx = ctx;
        this.format = format;
        this.width = width;
        this.height = height;
        this.filterMode = filterMode;
        this.glTex = (_a = gl.createTexture()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create texture.");
    }
    setup() {
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapMode);
    }
    bind(location, data) {
        const gl = data.gl;
        gl.activeTexture(gl.TEXTURE0 + data.nextTextureUnit);
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        gl.uniform1i(location, data.nextTextureUnit);
        data.nextTextureUnit++;
    }
    destroy() {
        if (this.destroyed)
            return;
        const gl = this.ctx.gl;
        gl.deleteTexture(this.glTex);
        super.destroy();
    }
}
class Texture2D extends TextureBase {
    constructor(width = 0, height = 0, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        super(width, height, format, filterMode, ctx);
    }
    setData(pixels) {
        super.setup();
        const gl = this.ctx.gl;
        const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, this.format);
        if (pixels.width !== undefined && pixels.height !== undefined) {
            pixels = pixels;
            this.width = pixels.width;
            this.height = pixels.height;
            gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
        }
        else
            gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
        flipTexture(this.ctx, this.glTex, pixels, this.width, this.height, this.format, this.filterMode, this.wrapMode, this.mipmapLevel);
    }
}
exports.Texture2D = Texture2D;
class DepthTexture extends TextureBase {
    constructor(width, height, ctx = global_1.GlobalContext()) {
        super(width, height, texture_format_1.TextureFormat.DEPTH_COMPONENT, FilterMode.Nearest, ctx);
    }
    create() {
        super.setup();
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, texture_format_1.TextureFormat.DEPTH_COMPONENT);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
    }
}
exports.DepthTexture = DepthTexture;
class RenderTexture extends TextureBase {
    constructor(width, height, depth, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        super(width, height, format, filterMode, ctx);
        this.depthTexture = null;
        if (depth) {
            this.depthTexture = new DepthTexture(width, height, ctx);
        }
        this.update();
    }
    update() {
        super.setup();
        const gl = this.ctx.gl;
        const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
    }
    setData(pixels) {
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.glTex);
        const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, this.mipmapLevel, internalFormat, this.width, this.height, 0, format, type, null);
        flipTexture(this.ctx, this.glTex, pixels, this.width, this.height, this.format, this.filterMode, this.wrapMode, this.mipmapLevel);
    }
    destroy() {
        var _a;
        if (this.destroyed)
            return;
        (_a = this.depthTexture) === null || _a === void 0 ? void 0 : _a.destroy();
        super.destroy();
    }
}
exports.RenderTexture = RenderTexture;
function flipTexture(ctx, dst, src, width, height, texFormat, filterMode, wrapMode, mipmapLevel) {
    var _a, _b;
    const gl = ctx.gl;
    const srcTex = (_a = gl.createTexture()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create texture.");
    const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, texFormat);
    gl.bindTexture(gl.TEXTURE_2D, srcTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapMode);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapMode);
    if (src.width !== undefined && src.height !== undefined) {
        src = src;
        gl.texImage2D(gl.TEXTURE_2D, mipmapLevel, internalFormat, format, type, src);
    }
    else {
        src = src;
        gl.texImage2D(gl.TEXTURE_2D, mipmapLevel, internalFormat, width, height, 0, format, type, src);
    }
    const fbo = (_b = gl.createFramebuffer()) !== null && _b !== void 0 ? _b : util_1.panic("Failed to create frame buffer");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dst, 0);
    gl.viewport(0, 0, width, height);
    gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
    const shader = ctx.assets.shaders.FlipTexture;
    shader.use();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, srcTex);
    gl.uniform1i(shader.uniformLocation(shaders_1.BuiltinUniformNames.mainTex), 0);
    const mesh = ctx.assets.meshes.screenQuad;
    mesh.bind(shader);
    gl.drawElements(gl.TRIANGLE_STRIP, mesh.triangles.length, gl.UNSIGNED_INT, 0);
    gl.deleteFramebuffer(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteTexture(srcTex);
}
//# sourceMappingURL=texture.js.map