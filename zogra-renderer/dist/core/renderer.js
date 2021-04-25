"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZograRenderer = void 0;
const util_1 = require("../utils/util");
const global_1 = require("./global");
const color_1 = require("../types/color");
const mat4_1 = require("../types/mat4");
const frame_buffer_1 = require("./frame-buffer");
const texture_1 = require("./texture");
const vec2_1 = require("../types/vec2");
const assets_1 = require("../builtin-assets/assets");
const rect_1 = require("../types/rect");
const mesh_builder_1 = require("../utils/mesh-builder");
const math_1 = require("../types/math");
const shaders_1 = require("../builtin-assets/shaders");
const object_pool_1 = require("../utils/object-pool");
class ZograRenderer {
    constructor(canvasElement, width, height) {
        this.viewProjectionMatrix = mat4_1.mat4.identity();
        this.viewMatrix = mat4_1.mat4.identity();
        this.projectionMatrix = mat4_1.mat4.identity();
        this.target = frame_buffer_1.FrameBuffer.CanvasBuffer;
        this.shader = null;
        this.globalUniforms = new Map();
        this.globalTextures = new Map();
        this.framebufferPool = new object_pool_1.ObjectPool((w, h) => new frame_buffer_1.FrameBuffer(w, h));
        this.blitFramebuffer = [new frame_buffer_1.FrameBuffer(), new frame_buffer_1.FrameBuffer()];
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.scissor = new rect_1.Rect(vec2_1.vec2.zero(), vec2_1.vec2(this.width, this.height));
        this.gl = util_1.panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
        this.gl.getExtension("EXT_color_buffer_float");
        this.gl.getExtension("EXT_color_buffer_half_float");
        this.ctx = new global_1.GLContext();
        Object.assign(this.ctx, {
            gl: this.gl,
            width: this.width,
            height: this.height,
            assets: {},
            renderer: this,
        });
        this.assets = new assets_1.BuiltinAssets(this.ctx);
        this.ctx.assets = this.assets;
        if (!global_1.GlobalContext())
            this.use();
        this.helperAssets = {
            clipBlitMesh: mesh_builder_1.MeshBuilder.ndcQuad(),
            blitMesh: mesh_builder_1.MeshBuilder.ndcTriangle(),
        };
    }
    use() {
        global_1.setGlobalContext(this.ctx);
    }
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ctx.width = width;
        this.ctx.height = height;
    }
    get canvasSize() { return vec2_1.vec2(this.width, this.height); }
    setViewProjection(view, projection) {
        mat4_1.mat4.mul(this.viewProjectionMatrix, projection, view);
    }
    setFramebuffer(colorAttachments, depthAttachment) {
        let newFramebuffer;
        if (colorAttachments === frame_buffer_1.FrameBuffer.CanvasBuffer)
            newFramebuffer = frame_buffer_1.FrameBuffer.CanvasBuffer;
        else if (colorAttachments instanceof frame_buffer_1.FrameBuffer) {
            newFramebuffer = colorAttachments;
        }
        else {
            if (colorAttachments instanceof Array) {
                let width = 0, height = 0;
                if (colorAttachments.length > 0) {
                    width = colorAttachments[0].width;
                    height = colorAttachments[0].height;
                }
                else if (depthAttachment) {
                    width = depthAttachment.width;
                    height = depthAttachment.height;
                }
                const framebuffer = this.getTempFramebuffer(width, height);
                for (let i = 0; i < colorAttachments.length; i++)
                    framebuffer.addColorAttachment(colorAttachments[i], i);
                if (depthAttachment)
                    framebuffer.setDepthAttachment(depthAttachment);
                newFramebuffer = framebuffer;
            }
            else {
                const colorAttachment = colorAttachments;
                const framebuffer = this.getTempFramebuffer(colorAttachment.width, colorAttachment.height);
                framebuffer.addColorAttachment(colorAttachment, 0);
                if (depthAttachment)
                    framebuffer.setDepthAttachment(depthAttachment);
                newFramebuffer = framebuffer;
            }
        }
        if (newFramebuffer !== this.target) {
            this.detachCurrentFramebuffer();
            this.target = newFramebuffer;
        }
        this.scissor.min.set([0, 0]);
        this.scissor.max.set(this.target.size);
        this.target.bind();
    }
    detachCurrentFramebuffer() {
        if (this.target.__isTemp) {
            this.framebufferPool.release(this.target);
        }
    }
    getTempFramebuffer(width, height) {
        const framebuffer = this.framebufferPool.get(width, height);
        framebuffer.__isTemp = true;
        framebuffer.reset(width, height);
        return framebuffer;
    }
    blitCopy(src, dst) {
        const gl = this.gl;
        const [readBuffer, writeBuffer] = this.blitFramebuffer;
        readBuffer.reset(src.width, src.height);
        readBuffer.addColorAttachment(src);
        readBuffer.bind();
        writeBuffer.reset(src.width, src.height);
        // gl.bindFramebuffer(gl.FRAMEBUFFER, readBuffer.glFBO());
        // gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, renderBuffer.glBuf());
        // gl.bindFramebuffer(gl.FRAMEBUFFER, writeBuffer.glFBO());
        // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture.glTex(), 0);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, readBuffer.glFBO());
        src instanceof texture_1.RenderTexture
            ? gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, src.glTex(), 0)
            : gl.framebufferRenderbuffer(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, src.glBuf());
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, writeBuffer.glFBO());
        dst instanceof texture_1.RenderTexture
            ? gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dst.glTex(), 0)
            : gl.framebufferRenderbuffer(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dst.glBuf());
        gl.blitFramebuffer(0, 0, src.width, src.height, 0, 0, dst.width, dst.height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
    }
    clear(color = color_1.Color.black, clearDepth = true) {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | (clearDepth ? this.gl.DEPTH_BUFFER_BIT : 0));
    }
    blit(src, dst, material = this.assets.materials.blitCopy, srcRect, dstRect) {
        const prevTarget = this.target;
        this.setFramebuffer(dst);
        dst = this.target;
        const prevVP = this.viewProjectionMatrix;
        // const prevTarget = this.target;
        let mesh = this.helperAssets.blitMesh;
        let viewport = dst === frame_buffer_1.FrameBuffer.CanvasBuffer ? new rect_1.Rect(vec2_1.vec2.zero(), this.canvasSize) : new rect_1.Rect(vec2_1.vec2.zero(), dst.size.clone());
        if (src && (srcRect || dstRect)) {
            viewport = dstRect || viewport;
            if (srcRect) {
                mesh = this.helperAssets.clipBlitMesh;
                let uvMin = math_1.div(srcRect.min, src.size);
                let uvMax = math_1.div(srcRect.max, src.size);
                mesh.uvs = [
                    vec2_1.vec2(uvMin.x, uvMin.y),
                    vec2_1.vec2(uvMax.x, uvMin.y),
                    vec2_1.vec2(uvMax.x, uvMax.y),
                    vec2_1.vec2(uvMin.x, uvMax.y),
                ];
                mesh.update();
            }
        }
        this.target = dst;
        this.scissor = viewport;
        this.viewProjectionMatrix = mat4_1.mat4.identity();
        if (src)
            material.setProp(shaders_1.BuiltinUniformNames.mainTex, "tex2d", src);
        this.drawMesh(mesh, mat4_1.mat4.identity(), material);
        // this.unsetGlobalTexture(BuiltinUniformNames.mainTex);
        this.setFramebuffer(prevTarget);
        this.viewProjectionMatrix = prevVP;
    }
    useShader(shader) {
        // Shader state may be modified by flip texure.
        // if (shader === this.shader)
        //     return;
        const gl = this.gl;
        this.shader = shader;
        shader.use();
        // shader.setupPipelineStates();
    }
    setupTransforms(shader, transformModel) {
        const gl = this.gl;
        const mvp = mat4_1.mat4.mul(this.viewProjectionMatrix, transformModel);
        const mit = mat4_1.mat4.create();
        if (mat4_1.mat4.invert(mit, transformModel))
            mat4_1.mat4.transpose(mit, mit);
        else
            mit.fill(0);
        const mvit = mat4_1.mat4.mul(this.viewMatrix, transformModel);
        if (mat4_1.mat4.invert(mvit, mvit))
            mat4_1.mat4.transpose(mvit, mvit);
        else
            mvit.fill(0);
        shader.setupBuiltinUniform({
            matM: transformModel,
            matVP: this.viewProjectionMatrix,
            matMVP: mvp,
            matM_IT: mit,
            matMV_IT: mvit,
        });
    }
    setupGlobalUniforms(material) {
        for (const val of this.globalUniforms.values()) {
            material.setUniformDirectly(val.name, val.type, val.value);
        }
    }
    drawMeshInstance(mesh, buffer, material, count) {
        if (!material)
            material = this.assets.materials.error;
        const gl = this.gl;
        const data = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2_1.vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, mat4_1.mat4.identity());
        const elementCount = mesh.bind();
        buffer.bindVertexArray(true, material.shader.attributes);
        gl.drawElementsInstanced(gl.TRIANGLES, elementCount, gl.UNSIGNED_INT, 0, count);
        buffer.unbindVertexArray(true, material.shader.attributes);
        mesh.unbind();
        material.unbindRenderTextures();
    }
    drawMeshProceduralInstance(mesh, material, count) {
        if (!material)
            material = this.assets.materials.error;
        const gl = this.gl;
        const data = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2_1.vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, mat4_1.mat4.identity());
        const elementCount = mesh.bind();
        gl.drawElementsInstanced(gl.TRIANGLES, elementCount, gl.UNSIGNED_INT, 0, count);
        material.unbindRenderTextures();
    }
    drawMesh(mesh, transform, material) {
        if (!material)
            material = this.assets.materials.error;
        const gl = this.gl;
        const data = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2_1.vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, transform);
        this.setupGlobalUniforms(material);
        let elementCount = mesh.bind();
        gl.drawElements(gl.TRIANGLES, elementCount, gl.UNSIGNED_INT, 0);
        mesh.unbind();
        material.unbindRenderTextures();
    }
    drawLines(lines, transform, material) {
        const gl = this.gl;
        const data = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2_1.vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, transform);
        // this.setupGlobalUniforms(material.shader, data);
        lines.bind(material.shader);
        gl.drawElements(gl.LINES, lines.lines.length, gl.UNSIGNED_INT, 0);
    }
    setGlobalUniform(name, type, value) {
        this.globalUniforms.set(name, {
            name: name,
            type: type,
            value: value,
        });
    }
    unsetGlobalUniform(name) {
        this.globalUniforms.delete(name);
    }
    setupScissor() {
        const gl = this.gl;
        gl.viewport(this.scissor.xMin, this.scissor.yMin, this.scissor.size.x, this.scissor.size.y);
    }
}
exports.ZograRenderer = ZograRenderer;
//# sourceMappingURL=renderer.js.map