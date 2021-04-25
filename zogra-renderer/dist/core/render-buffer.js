"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepthBuffer = exports.RenderBuffer = void 0;
const vec2_1 = require("../types/vec2");
const util_1 = require("../utils/util");
const asset_1 = require("./asset");
const global_1 = require("./global");
const texture_format_1 = require("./texture-format");
class RenderBuffer extends asset_1.GPUAsset {
    constructor(width, height, format = texture_format_1.TextureFormat.RGBA8, multiSampling = 0, ctx = global_1.GlobalContext()) {
        super(ctx);
        this.multiSampling = 0;
        this.format = texture_format_1.TextureFormat.RGBA8;
        this.glBuf = null;
        this.size = vec2_1.vec2(width, height);
        this.format = format;
        this.multiSampling = multiSampling;
        this.tryInit(false);
    }
    get width() { return this.size.x; }
    set width(w) { this.size.x = w; }
    get height() { return this.size.y; }
    set height(h) { this.size.y = h; }
    updateParams() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
    }
    init() {
        var _a;
        const gl = this.ctx.gl;
        this.glBuf = (_a = gl.createRenderbuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create render buffer.");
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        return true;
    }
    bindFramebuffer(attachment) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + attachment, gl.RENDERBUFFER, this.glBuf);
    }
    destroy() {
        super.destroy();
        const gl = this.ctx.gl;
        gl.deleteRenderbuffer(this.glBuf);
    }
}
exports.RenderBuffer = RenderBuffer;
class DepthBuffer extends asset_1.GPUAsset {
    constructor(width, height, multiSampling = 0, ctx = global_1.GlobalContext()) {
        super(ctx);
        this.multiSampling = 0;
        this.format = texture_format_1.TextureFormat.RGBA8;
        this.glBuf = null;
        this.size = vec2_1.vec2(width, height);
        this.format = texture_format_1.TextureFormat.DEPTH_COMPONENT;
        this.multiSampling = multiSampling;
        this.tryInit(false);
    }
    get width() { return this.size.x; }
    set width(w) { this.size.x = w; }
    get height() { return this.size.y; }
    set height(h) { this.size.y = h; }
    updateParams() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
    }
    init() {
        var _a;
        const gl = this.ctx.gl;
        this.glBuf = (_a = gl.createRenderbuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create render buffer.");
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        return true;
    }
    bindFramebuffer() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.glBuf);
    }
    destroy() {
        super.destroy();
        const gl = this.ctx.gl;
        gl.deleteRenderbuffer(this.glBuf);
    }
}
exports.DepthBuffer = DepthBuffer;
//# sourceMappingURL=render-buffer.js.map