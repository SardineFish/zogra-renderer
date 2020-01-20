"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../utils/util");
const global_1 = require("./global");
const vec3_1 = require("../types/vec3");
const color_1 = require("../types/color");
const mat4_1 = require("../types/mat4");
const render_target_1 = require("./render-target");
const texture_1 = require("./texture");
const assets_1 = require("../builtin-assets/assets");
const quat_1 = require("../types/quat");
class ZograRenderer {
    constructor(canvasElement, width, height) {
        this.viewProjectionMatrix = mat4_1.mat4.identity();
        this.target = render_target_1.RenderTarget.CanvasTarget;
        this.globalUniforms = new Map();
        this.globalTextures = new Map();
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.gl = util_1.panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
        this.assets = new assets_1.BuiltinAssets(this.gl);
        this.ctx = {
            gl: this.gl,
            width: this.width,
            height: this.height,
            usedTextureUnit: 0,
            assets: this.assets,
        };
        if (!global_1.GlobalContext())
            this.use();
    }
    use() {
        global_1.setGlobalContext(this.ctx);
    }
    setViewProjection(mat) {
        this.viewProjectionMatrix = mat;
    }
    setRenderTarget(colorAttachments, depthAttachment) {
        if (colorAttachments instanceof render_target_1.RenderTarget) {
            if (this.target !== colorAttachments)
                this.target.release();
            this.target = colorAttachments;
        }
        else if (colorAttachments instanceof Array) {
            this.target.release();
            this.target = new render_target_1.RenderTarget(colorAttachments[0].width, colorAttachments[0].height, this.ctx);
            for (let i = 0; i < colorAttachments.length; i++)
                this.target.addColorAttachment(colorAttachments[i]);
        }
        else if (colorAttachments instanceof texture_1.RenderTexture) {
            this.target.release();
            this.target = new render_target_1.RenderTarget(colorAttachments.width, colorAttachments.height, this.ctx);
            this.target.addColorAttachment(colorAttachments);
        }
        if (depthAttachment)
            this.target.setDepthAttachment(depthAttachment);
        this.target.bind(this.ctx);
    }
    clear(color = color_1.Color.black, clearDepth = true) {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | (clearDepth ? this.gl.DEPTH_BUFFER_BIT : 0));
    }
    blit(src, dst, material = this.assets.materials.blitCopy) {
        if (dst instanceof texture_1.RenderTexture) {
            const target = new render_target_1.RenderTarget(dst.width, dst.height, this.ctx);
            target.addColorAttachment(dst);
            dst = target;
        }
        else if (dst instanceof Array) {
            const target = new render_target_1.RenderTarget(0, 0, this.ctx);
            for (let i = 0; i < dst.length; i++) {
                target.addColorAttachment(dst[i]);
            }
            dst = target;
        }
        const prevVP = this.viewProjectionMatrix;
        dst.bind(this.ctx);
        this.viewProjectionMatrix = mat4_1.mat4.identity();
        this.setGlobalTexture("uMainTex", src);
        this.drawMesh(this.assets.meshes.quad, mat4_1.mat4.rts(quat_1.quat.identity(), vec3_1.vec3(0, 0, 0), vec3_1.vec3(2, 2, 1)), material);
        this.unsetGlobalTexture("uMainTex");
        this.target.bind();
        this.viewProjectionMatrix = prevVP;
    }
    drawMesh(mesh, transform, mateiral) {
        const gl = this.gl;
        this.ctx.usedTextureUnit = this.globalTextures.size;
        mateiral.setup(this.ctx);
        const program = mateiral.shader.program;
        const attributes = mateiral.shader.attributes;
        const transformLocations = util_1.getUniformsLocation(gl, program, this.assets.BuiltinUniforms);
        // Setup transforms
        const mvp = mat4_1.mat4.mul(transform, this.viewProjectionMatrix);
        transformLocations.matM && gl.uniformMatrix4fv(transformLocations.matM, false, transform);
        transformLocations.matVP && gl.uniformMatrix4fv(transformLocations.matVP, false, this.viewProjectionMatrix);
        transformLocations.matMVP && gl.uniformMatrix4fv(transformLocations.matMVP, false, mvp);
        // Setup global uniforms
        {
            for (const val of this.globalUniforms.values()) {
                const location = gl.getUniformLocation(program, val.name);
                if (!location)
                    continue;
                switch (val.type) {
                    case "int":
                        gl.uniform1i(location, val.value);
                        break;
                    case "float":
                        gl.uniform1f(location, val.value);
                        break;
                    case "vec2":
                        gl.uniform2fv(location, val.value, 0, 2);
                        break;
                    case "vec3":
                        gl.uniform3fv(location, val.value, 0, 3);
                        break;
                    case "vec4":
                        gl.uniform4fv(location, val.value, 0, 4);
                        break;
                    case "color":
                        gl.uniform4fv(location, val.value, 0, 4);
                        break;
                }
            }
        }
        // Setup global textures
        {
            for (const tex of this.globalTextures.values()) {
                const location = gl.getUniformLocation(program, tex.name);
                if (!location)
                    continue;
                tex.texture.bind(location, this.ctx.usedTextureUnit++, this.ctx);
            }
        }
        const [vertBuffer, elementBuffer] = mesh.setup(gl);
        // Setup VAO
        const stride = 12 * 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        // vert: vec3
        if (attributes.vert >= 0) {
            gl.vertexAttribPointer(attributes.vert, 3, gl.FLOAT, false, stride, 0);
            gl.enableVertexAttribArray(attributes.vert);
        }
        // color: vec4
        if (attributes.color >= 0) {
            gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 3 * 4);
            gl.enableVertexAttribArray(attributes.color);
        }
        // uv: vec2
        if (attributes.uv >= 0) {
            gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, stride, 7 * 4);
            gl.enableVertexAttribArray(attributes.uv);
        }
        // normal: vec3
        if (attributes.normal >= 0) {
            gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, true, stride, 9 * 4);
            gl.enableVertexAttribArray(attributes.uv);
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
        gl.drawElements(gl.TRIANGLE_STRIP, mesh.triangles.length, gl.UNSIGNED_INT, 0);
        this.ctx.usedTextureUnit = 0;
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
    setGlobalTexture(name, texture) {
        this.globalTextures.set(name, {
            name: name,
            texture: texture,
        });
    }
    unsetGlobalTexture(name) {
        this.globalTextures.delete(name);
    }
}
exports.ZograRenderer = ZograRenderer;
//# sourceMappingURL=renderer.js.map