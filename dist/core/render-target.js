"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderTarget = void 0;
const global_1 = require("./global");
const util_1 = require("../utils/util");
const FrameBufferAttachment = {
    canvasOutput: { tex: null, attachPoint: WebGL2RenderingContext.BACK },
    fromRenderTexture: (rt) => ({ tex: rt.glTex() })
};
class RenderTarget {
    constructor(width = 0, height = 0, ctx = global_1.GlobalContext()) {
        var _a;
        this.colorAttachments = [];
        this.depthAttachment = FrameBufferAttachment.canvasOutput;
        this.isCanvasTarget = true;
        this.width = width;
        this.height = height;
        if (!ctx)
            this.frameBuffer = null;
        else
            this.frameBuffer = (_a = ctx.gl.createFramebuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create frame buffer");
    }
    addColorAttachment(rt) {
        if (rt === null) {
            return;
        }
        this.isCanvasTarget = false;
        if (this.width == 0 && this.height == 0) {
            this.width = rt.width;
            this.height = rt.height;
        }
        if (this.width != rt.width || this.height != rt.height)
            throw new Error("Framebuffer attachments must in same resolution.");
        this.colorAttachments.push(FrameBufferAttachment.fromRenderTexture(rt));
    }
    setDepthAttachment(rt) {
        var _a;
        if (this.width == 0 && this.height == 0) {
            this.width = rt.width;
            this.height = rt.height;
        }
        if (this.width != rt.width || this.height != rt.height)
            throw new Error("Framebuffer attachments must in same resolution.");
        this.depthAttachment = { tex: (_a = rt === null || rt === void 0 ? void 0 : rt.glTex) !== null && _a !== void 0 ? _a : null, attachPoint: WebGL2RenderingContext.DEPTH_ATTACHMENT };
    }
    bind(ctx = global_1.GlobalContext()) {
        const gl = ctx.gl;
        if (this.isCanvasTarget) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, ctx.width, ctx.height);
        }
        else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
            let attachIdx = 0;
            for (let i = 0; i < this.colorAttachments.length; i++) {
                if (this.colorAttachments[i].tex) {
                    this.colorAttachments[i].attachPoint = gl.COLOR_ATTACHMENT0 + attachIdx++;
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, this.colorAttachments[i].attachPoint, gl.TEXTURE_2D, this.colorAttachments[i].tex, 0);
                }
            }
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthAttachment.tex, 0);
            gl.viewport(0, 0, this.width, this.height);
            const buffers = this.colorAttachments.map(t => t.attachPoint);
            gl.drawBuffers(buffers);
        }
    }
    release(ctx = global_1.GlobalContext()) {
        if (this.isCanvasTarget)
            return;
        const gl = ctx.gl;
        gl.deleteFramebuffer(this.frameBuffer);
    }
}
exports.RenderTarget = RenderTarget;
RenderTarget.CanvasTarget = Object.freeze(new RenderTarget());
//# sourceMappingURL=render-target.js.map