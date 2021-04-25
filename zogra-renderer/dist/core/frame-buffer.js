"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameBuffer = void 0;
const global_1 = require("./global");
const util_1 = require("../utils/util");
const vec2_1 = require("../types/vec2");
const asset_1 = require("./asset");
const FrameBufferAttachment = {
    canvasOutput: { tex: null, attachPoint: WebGL2RenderingContext.BACK },
    fromRenderTexture: (rt) => ({ tex: rt.glTex() })
};
class CanvasBuffer {
    get name() { return ""; }
    get assetID() { return -1; }
    get width() { return global_1.GlobalContext().width; }
    get height() { return global_1.GlobalContext().height; }
    get size() { return global_1.GlobalContext().renderer.canvasSize; }
    bind() {
        const gl = global_1.GlobalContext().gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.width, this.height);
    }
    destroy() { }
}
class FrameBuffer extends asset_1.GPUAsset {
    constructor(width = 0, height = 0, ctx = global_1.GlobalContext()) {
        super(ctx);
        this.colorAttachments = [];
        this.depthAttachment = null;
        this.frameBuffer = null;
        this.activeBuffers = [];
        this.dirty = true;
        this.size = vec2_1.vec2(Math.floor(width), Math.floor(height));
        this.tryInit(false);
    }
    get width() { return this.size.x; }
    get height() { return this.size.y; }
    addColorAttachment(attachment, attachPoit = this.colorAttachments.length) {
        if (attachment.width !== this.size.x || attachment.height !== this.size.y)
            console.warn(`Color attachment size [${attachment.width}, ${attachment.height}] missmatch with framebuffer.`);
        this.colorAttachments[attachPoit] = attachment;
        this.dirty = true;
    }
    setDepthAttachment(attachment) {
        if (attachment.width !== this.size.x || attachment.height !== this.size.y)
            console.warn(`Depth attachment size [${attachment.width}, ${attachment.height}] missmatch with framebuffer.`);
        this.depthAttachment = attachment;
        this.dirty = true;
    }
    reset(width = this.width, height = this.height) {
        this.size.x = width;
        this.size.y = height;
        this.colorAttachments = [];
        this.depthAttachment = null;
        this.dirty = true;
    }
    init() {
        var _a;
        const gl = this.ctx.gl;
        this.frameBuffer = (_a = gl.createFramebuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create frame buffer object");
        return true;
    }
    bind() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        this.activeBuffers = [];
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        for (let i = 0; i < this.colorAttachments.length; i++) {
            if (this.colorAttachments[i]) {
                this.colorAttachments[i].bindFramebuffer(i);
                this.activeBuffers.push(gl.COLOR_ATTACHMENT0 + i);
            }
            else
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.RENDERBUFFER, null);
        }
        if (this.depthAttachment) {
            this.depthAttachment.bindFramebuffer();
            this.activeBuffers.push(gl.DEPTH_ATTACHMENT);
        }
        else
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, null);
        gl.viewport(0, 0, this.width, this.height);
        gl.drawBuffers(this.activeBuffers);
    }
    destroy() {
        super.destroy();
        const gl = this.ctx.gl;
        gl.deleteFramebuffer(this.frameBuffer);
    }
}
exports.FrameBuffer = FrameBuffer;
FrameBuffer.CanvasBuffer = Object.freeze(new CanvasBuffer());
//# sourceMappingURL=frame-buffer.js.map