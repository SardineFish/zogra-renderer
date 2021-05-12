import { GlobalContext } from "./global";
import { panic } from "../utils/util";
import { vec2 } from "../types/vec2";
import { GPUAsset } from "./asset";
const FrameBufferAttachment = {
    canvasOutput: { tex: null, attachPoint: WebGL2RenderingContext.BACK },
    fromRenderTexture: (rt) => ({ tex: rt.glTex() })
};
class CanvasBuffer {
    get name() { return ""; }
    get assetID() { return -1; }
    get width() { return GlobalContext().width; }
    get height() { return GlobalContext().height; }
    get size() { return GlobalContext().renderer.canvasSize; }
    bind() {
        const gl = GlobalContext().gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.width, this.height);
    }
    destroy() { }
}
export class FrameBuffer extends GPUAsset {
    constructor(width = 0, height = 0, ctx = GlobalContext()) {
        super(ctx);
        this.frameBuffer = null;
        this._colorAttachments = [];
        this._depthAttachment = null;
        this.activeBuffers = [];
        this.dirty = true;
        this.size = vec2(Math.floor(width), Math.floor(height));
        this.tryInit(false);
    }
    get width() { return this.size.x; }
    get height() { return this.size.y; }
    get colorAttachments() { return this._colorAttachments; }
    get depthAttachment() { return this._depthAttachment; }
    /** @internal */
    glFBO() {
        this.tryInit(true);
        return this.frameBuffer;
    }
    addColorAttachment(attachment, attachPoit = this._colorAttachments.length) {
        if (attachment.width !== this.size.x || attachment.height !== this.size.y)
            console.warn(`Color attachment size [${attachment.width}, ${attachment.height}] missmatch with framebuffer.`);
        this._colorAttachments[attachPoit] = attachment;
        this.dirty = true;
    }
    setDepthAttachment(attachment) {
        if (attachment.width !== this.size.x || attachment.height !== this.size.y)
            console.warn(`Depth attachment size [${attachment.width}, ${attachment.height}] missmatch with framebuffer.`);
        this._depthAttachment = attachment;
        this.dirty = true;
    }
    reset(width = this.width, height = this.height) {
        this.size.x = width;
        this.size.y = height;
        this._colorAttachments = [];
        this._depthAttachment = null;
        this.dirty = true;
    }
    init() {
        var _a;
        const gl = this.ctx.gl;
        this.frameBuffer = (_a = gl.createFramebuffer()) !== null && _a !== void 0 ? _a : panic("Failed to create frame buffer object");
        return true;
    }
    bind() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        this.activeBuffers = [];
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        for (let i = 0; i < this._colorAttachments.length; i++) {
            if (this._colorAttachments[i]) {
                this._colorAttachments[i].bindFramebuffer(i);
                this.activeBuffers.push(gl.COLOR_ATTACHMENT0 + i);
            }
            else
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.RENDERBUFFER, null);
        }
        if (this._depthAttachment) {
            this._depthAttachment.bindFramebuffer();
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
FrameBuffer.CanvasBuffer = Object.freeze(new CanvasBuffer());
//# sourceMappingURL=frame-buffer.js.map