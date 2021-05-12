import { vec2 } from "../types/vec2";
import { panic } from "../utils/util";
import { GPUAsset } from "./asset";
import { GlobalContext } from "./global";
import { TextureFormat } from "./texture-format";
export class RenderBuffer extends GPUAsset {
    constructor(width, height, format = TextureFormat.RGBA8, multiSampling = 0, ctx = GlobalContext()) {
        super(ctx);
        this.multiSampling = 0;
        this.format = TextureFormat.RGBA8;
        this._glBuf = null;
        this.size = vec2(width, height);
        this.format = format;
        this.multiSampling = multiSampling;
        this.tryInit(false);
    }
    get width() { return this.size.x; }
    set width(w) { this.size.x = w; }
    get height() { return this.size.y; }
    set height(h) { this.size.y = h; }
    /** @internal */
    glBuf() {
        this.tryInit(true);
        return this._glBuf;
    }
    updateParams() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
    }
    init() {
        var _a;
        const gl = this.ctx.gl;
        this._glBuf = (_a = gl.createRenderbuffer()) !== null && _a !== void 0 ? _a : panic("Failed to create render buffer.");
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._glBuf);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.multiSampling, this.format, this.size.x, this.size.y);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        return true;
    }
    bindFramebuffer(attachment) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + attachment, gl.RENDERBUFFER, this._glBuf);
    }
    destroy() {
        super.destroy();
        const gl = this.ctx.gl;
        gl.deleteRenderbuffer(this._glBuf);
    }
}
export class DepthBuffer extends GPUAsset {
    constructor(width, height, multiSampling = 0, ctx = GlobalContext()) {
        super(ctx);
        this.multiSampling = 0;
        this.format = TextureFormat.RGBA8;
        this.glBuf = null;
        this.size = vec2(width, height);
        this.format = TextureFormat.DEPTH_COMPONENT;
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
        this.glBuf = (_a = gl.createRenderbuffer()) !== null && _a !== void 0 ? _a : panic("Failed to create render buffer.");
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
//# sourceMappingURL=render-buffer.js.map