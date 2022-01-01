import { panicNull } from "../utils/util";
import { setGlobalContext, GLContext, GlobalContext } from "./global";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { FrameBuffer } from "./frame-buffer";
import { RenderTexture, DepthTexture } from "./texture";
import { vec2 } from "../types/vec2";
import { BuiltinAssets } from "../builtin-assets/assets";
import { Rect } from "../types/rect";
import { MeshBuilder } from "../utils/mesh-builder";
import { div } from "../types/math";
import { BuiltinUniformNames } from "../builtin-assets/shaders";
import { ObjectPool } from "../utils/object-pool";
import { DepthBuffer } from ".";
export class ZograRenderer {
    constructor(canvasElement, width, height) {
        this.viewProjectionMatrix = mat4.identity();
        this.viewMatrix = mat4.identity();
        this.projectionMatrix = mat4.identity();
        this.target = FrameBuffer.CanvasBuffer;
        this.shader = null;
        this.globalUniforms = new Map();
        this.globalTextures = new Map();
        this.framebufferPool = new ObjectPool((w, h) => new FrameBuffer(w, h));
        this.blitFramebuffer = [new FrameBuffer(), new FrameBuffer()];
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.scissor = new Rect(vec2.zero(), vec2(this.width, this.height));
        this.gl = panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
        this.gl.getExtension("EXT_color_buffer_float");
        this.gl.getExtension("EXT_color_buffer_half_float");
        this.gl.getExtension("WEBGL_depth_texture");
        console.log(this.gl.getExtension('WEBGL_depth_texture') || this.gl.getExtension('MOZ_WEBGL_depth_texture') || this.gl.getExtension('WEBKIT_WEBGL_depth_texture'));
        console.log(this.gl.getSupportedExtensions());
        this.ctx = new GLContext();
        Object.assign(this.ctx, {
            gl: this.gl,
            width: this.width,
            height: this.height,
            assets: {},
            renderer: this,
        });
        this.assets = new BuiltinAssets(this.ctx);
        this.ctx.assets = this.assets;
        if (!GlobalContext())
            this.use();
        this.helperAssets = {
            clipBlitMesh: MeshBuilder.ndcQuad(),
            blitMesh: MeshBuilder.ndcTriangle(),
            depthBlitTex: new DepthTexture(this.width, this.height),
        };
    }
    use() {
        setGlobalContext(this.ctx);
    }
    setSize(width, height) {
        width = Math.floor(width);
        height = Math.floor(height);
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ctx.width = width;
        this.ctx.height = height;
    }
    get canvasSize() { return vec2(this.width, this.height); }
    setViewProjection(view, projection) {
        mat4.mul(this.viewProjectionMatrix, projection, view);
    }
    setFramebuffer(colorAttachments, depthAttachment) {
        let newFramebuffer;
        if (colorAttachments === FrameBuffer.CanvasBuffer)
            newFramebuffer = FrameBuffer.CanvasBuffer;
        else if (colorAttachments instanceof FrameBuffer) {
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
        src instanceof RenderTexture
            ? gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, src.glTex(), 0)
            : gl.framebufferRenderbuffer(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, src.glBuf());
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, writeBuffer.glFBO());
        dst instanceof RenderTexture
            ? gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dst.glTex(), 0)
            : gl.framebufferRenderbuffer(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, dst.glBuf());
        gl.blitFramebuffer(0, 0, src.width, src.height, 0, 0, dst.width, dst.height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
    }
    blitCopyDepth(src, dst) {
        const gl = this.gl;
        if (src instanceof DepthBuffer) {
            const depthTex = this.helperAssets.depthBlitTex;
            depthTex.resize(src.width, src.height);
            const [readBuffer, writeBuffer] = this.blitFramebuffer;
            readBuffer.reset(src.width, src.height);
            readBuffer.bind();
            writeBuffer.reset(src.width, src.height);
            writeBuffer.bind();
            gl.bindFramebuffer(gl.READ_FRAMEBUFFER, readBuffer.glFBO());
            gl.framebufferRenderbuffer(gl.READ_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, src.glBuf());
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, writeBuffer.glFBO());
            gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTex.glTex(), 0);
            gl.blitFramebuffer(0, 0, src.width, src.height, 0, 0, dst.width, dst.height, gl.DEPTH_BUFFER_BIT, gl.NEAREST);
            src = depthTex;
        }
        this.blit(src, dst);
    }
    clear(color = Color.black, clearDepth = true) {
        this.target.bind();
        this.setupScissor();
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clearDepth(1.0);
        this.gl.depthMask(clearDepth);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
    }
    blit(src, dst, material = this.assets.materials.blitCopy, srcRect, dstRect) {
        const prevTarget = this.target;
        this.setFramebuffer(dst);
        dst = this.target;
        const prevVP = this.viewProjectionMatrix;
        // const prevTarget = this.target;
        let mesh = this.helperAssets.blitMesh;
        let viewport = dst === FrameBuffer.CanvasBuffer ? new Rect(vec2.zero(), this.canvasSize) : new Rect(vec2.zero(), dst.size.clone());
        if (src && (srcRect || dstRect)) {
            viewport = dstRect || viewport;
            if (srcRect) {
                mesh = this.helperAssets.clipBlitMesh;
                let uvMin = div(srcRect.min, src.size);
                let uvMax = div(srcRect.max, src.size);
                mesh.uvs = [
                    vec2(uvMin.x, uvMin.y),
                    vec2(uvMax.x, uvMin.y),
                    vec2(uvMax.x, uvMax.y),
                    vec2(uvMin.x, uvMax.y),
                ];
                mesh.update();
            }
        }
        this.target = dst;
        this.scissor = viewport;
        this.viewProjectionMatrix = mat4.identity();
        if (src)
            material.setProp(BuiltinUniformNames.mainTex, "tex2d", src);
        this.drawMesh(mesh, mat4.identity(), material);
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
        const mvp = mat4.mul(this.viewProjectionMatrix, transformModel);
        const mit = mat4.create();
        if (mat4.invert(mit, transformModel))
            mat4.transpose(mit, mit);
        else
            mit.fill(0);
        const mvit = mat4.mul(this.viewMatrix, transformModel);
        if (mat4.invert(mvit, mvit))
            mat4.transpose(mvit, mvit);
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
            size: vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, mat4.identity());
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
            size: vec2(this.width, this.height),
        };
        this.target.bind();
        this.setupScissor();
        this.useShader(material.shader);
        material.upload(data);
        this.setupTransforms(material.shader, mat4.identity());
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
            size: vec2(this.width, this.height),
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
            size: vec2(this.width, this.height),
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
//# sourceMappingURL=renderer.js.map