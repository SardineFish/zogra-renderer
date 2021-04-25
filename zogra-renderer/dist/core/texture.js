"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderTexture = exports.DepthTexture = exports.Texture2D = exports.TextureResizing = exports.Texture = exports.WrapMode = exports.FilterMode = void 0;
const global_1 = require("./global");
const texture_format_1 = require("./texture-format");
const util_1 = require("../utils/util");
const asset_1 = require("./asset");
const shaders_1 = require("../builtin-assets/shaders");
const vec2_1 = require("../types/vec2");
const image_sizing_1 = require("../utils/image-sizing");
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
var TextureResizing;
(function (TextureResizing) {
    TextureResizing[TextureResizing["Discard"] = 0] = "Discard";
    TextureResizing[TextureResizing["Stretch"] = 1] = "Stretch";
    TextureResizing[TextureResizing["Cover"] = 2] = "Cover";
    TextureResizing[TextureResizing["Contain"] = 3] = "Contain";
    TextureResizing[TextureResizing["KeepLower"] = 4] = "KeepLower";
    TextureResizing[TextureResizing["KeepHigher"] = 5] = "KeepHigher";
    TextureResizing[TextureResizing["Center"] = 6] = "Center";
})(TextureResizing = exports.TextureResizing || (exports.TextureResizing = {}));
class TextureBase extends asset_1.Asset {
    constructor(width, height, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        super();
        this.autoMipmap = true;
        this.wrapMode = WrapMode.Repeat;
        this._glTex = null;
        this.initialized = false;
        this.created = false;
        this.name = `Texture_${this.assetID}`;
        this.ctx = ctx;
        this.format = format;
        this.width = width;
        this.height = height;
        this.filterMode = filterMode;
        this.tryInit(false);
    }
    get size() { return vec2_1.vec2(this.width, this.height); }
    glTex() {
        this.create();
        return this._glTex;
    }
    bind(unit) {
        this.create();
        const gl = this.ctx.gl;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        // gl.uniform1i(location, data.nextTextureUnit);
        // data.nextTextureUnit++;
    }
    unbind(unit) {
        this.create();
        const gl = this.ctx.gl;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    destroy() {
        if (!this.initialized || this.destroyed)
            return;
        const gl = this.ctx.gl;
        gl.deleteTexture(this._glTex);
        super.destroy();
    }
    resize(width, height, textureContent = TextureResizing.Discard) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        let oldTex = TextureBase.wrapGlTex(this._glTex, this.width, this.height, this.format, this.filterMode, this.ctx);
        let newTex = new RenderTexture(width, height, false, this.format, this.filterMode, this.ctx);
        newTex.wrapMode = this.wrapMode;
        newTex.autoMipmap = this.autoMipmap;
        newTex.create();
        newTex.updateParameters();
        const prevSize = this.size;
        this.width = width;
        this.height = height;
        switch (textureContent) {
            case TextureResizing.Discard:
                break;
            default:
                const [srcRect, dstrEect] = image_sizing_1.imageResize(prevSize, newTex.size, textureContent);
                this.ctx.renderer.blit(oldTex, newTex, this.ctx.assets.materials.blitCopy, srcRect, dstrEect);
                break;
        }
        if (this.autoMipmap)
            newTex.generateMipmap();
        this._glTex = newTex._glTex;
        gl.deleteTexture(oldTex._glTex);
    }
    generateMipmap() {
        this.create();
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        gl.generateMipmap(gl.TEXTURE_2D);
    }
    updateParameters() {
        this.create();
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filterMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapMode);
    }
    /**
     * Create & allocate texture if not
     */
    create() {
        if (this.created)
            return;
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        const [internalFormat, format, type] = texture_format_1.mapGLFormat(gl, this.format);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, this.width, this.height, 0, format, type, null);
        this.created = true;
        this.updateParameters();
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    setData(pixels) {
        this.create();
        const gl = this.ctx.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._glTex);
        flipTexture(this.ctx, this._glTex, pixels, this.width, this.height, this.format, this.filterMode, this.wrapMode, 0);
    }
    tryInit(required = false) {
        var _a;
        if (this.initialized)
            return true;
        const ctx = this.ctx || global_1.GlobalContext();
        if (!ctx) {
            if (required)
                throw new Error("Failed to initialize texture without a global GL context");
            return false;
        }
        const gl = ctx.gl;
        this._glTex = (_a = gl.createTexture()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create texture.");
        this.initialized = true;
        return true;
    }
    static wrapGlTex(glTex, width, height, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        var texture = new TextureBase(width, height, format, filterMode, ctx);
        texture._glTex = glTex;
        texture.initialized = true;
        texture.created = true;
        return texture;
    }
}
class Texture2D extends TextureBase {
    constructor(width = 0, height = 0, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        super(width, height, format, filterMode, ctx);
    }
    setData(pixels) {
        if (pixels.width !== undefined && pixels.height !== undefined) {
            pixels = pixels;
            this.width = pixels.width;
            this.height = pixels.height;
        }
        super.setData(pixels);
    }
    clone() {
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
exports.Texture2D = Texture2D;
class DepthTexture extends TextureBase {
    constructor(width, height, ctx = global_1.GlobalContext()) {
        super(width, height, texture_format_1.TextureFormat.DEPTH_COMPONENT, FilterMode.Nearest, ctx);
    }
    bindFramebuffer() {
        this.create();
        const gl = this.ctx.gl;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this._glTex, 0);
    }
}
exports.DepthTexture = DepthTexture;
class RenderTexture extends TextureBase {
    constructor(width, height, depth = false, format = texture_format_1.TextureFormat.RGBA, filterMode = FilterMode.Linear, ctx = global_1.GlobalContext()) {
        super(width, height, format, filterMode, ctx);
        this.depthTexture = null;
        if (depth) {
            this.depthTexture = new DepthTexture(width, height, ctx);
        }
    }
    setData(pixels) {
        super.setData(pixels);
    }
    destroy() {
        var _a;
        if (!this.initialized || this.destroyed)
            return;
        (_a = this.depthTexture) === null || _a === void 0 ? void 0 : _a.destroy();
        super.destroy();
    }
    bindFramebuffer(attachment) {
        this.create();
        const gl = this.ctx.gl;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + attachment, gl.TEXTURE_2D, this._glTex, 0);
    }
}
exports.RenderTexture = RenderTexture;
function flipTexture(ctx, dst, src, width, height, texFormat, filterMode, wrapMode, mipmapLevel) {
    var _a, _b;
    const gl = ctx.gl;
    const renderer = ctx.renderer;
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
    mesh.bind();
    gl.drawElements(gl.TRIANGLE_STRIP, mesh.indices.length, gl.UNSIGNED_INT, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.deleteFramebuffer(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteTexture(srcTex);
}
//# sourceMappingURL=texture.js.map