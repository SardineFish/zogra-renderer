"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZograRenderer = void 0;
const util_1 = require("../utils/util");
const global_1 = require("./global");
const vec3_1 = require("../types/vec3");
const color_1 = require("../types/color");
const mat4_1 = require("../types/mat4");
const render_target_1 = require("./render-target");
const texture_1 = require("./texture");
const vec2_1 = require("../types/vec2");
const assets_1 = require("../builtin-assets/assets");
const quat_1 = require("../types/quat");
const shader_1 = require("./shader");
class ZograRenderer {
    constructor(canvasElement, width, height) {
        this.viewProjectionMatrix = mat4_1.mat4.identity();
        this.viewMatrix = mat4_1.mat4.identity();
        this.projectionMatrix = mat4_1.mat4.identity();
        this.target = render_target_1.RenderTarget.CanvasTarget;
        this.shader = null;
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
            assets: this.assets,
        };
        if (!global_1.GlobalContext())
            this.use();
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
        this.viewProjectionMatrix = mat4_1.mat4.mul(projection, view);
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
        const prevTarget = this.target;
        this.target = dst;
        this.viewProjectionMatrix = mat4_1.mat4.identity();
        this.setGlobalTexture("uMainTex", src);
        this.drawMesh(this.assets.meshes.quad, mat4_1.mat4.rts(quat_1.quat.identity(), vec3_1.vec3(0, 0, 0), vec3_1.vec3(2, 2, 1)), material);
        this.unsetGlobalTexture("uMainTex");
        this.target = prevTarget;
        this.viewProjectionMatrix = prevVP;
    }
    useShader(shader) {
        /*if (shader === this.shader)
            return;*/
        const gl = this.gl;
        this.shader = shader;
        gl.useProgram(shader.program);
        if (shader.settings.depth === shader_1.DepthTest.Disable)
            gl.disable(gl.DEPTH_TEST);
        else {
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(shader.settings.zWrite);
            gl.depthFunc(shader.settings.depth);
        }
        if (shader.settings.blend === shader_1.Blending.Disable)
            gl.disable(gl.BLEND);
        else {
            const [src, dst] = typeof (shader.settings.blend) === "number"
                ? [shader.settings.blend, shader_1.Blending.Zero]
                : shader.settings.blend;
            gl.enable(gl.BLEND);
            gl.blendFunc(src, dst);
        }
        if (shader.settings.cull === shader_1.Culling.Disable)
            gl.disable(gl.CULL_FACE);
        else {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(shader.settings.cull);
            gl.frontFace(gl.CCW);
        }
    }
    setupTransforms(shader, transformModel) {
        const gl = this.gl;
        const mvp = mat4_1.mat4.mul(this.viewProjectionMatrix, transformModel);
        const mit = mat4_1.mat4.transpose(mat4_1.mat4.invert(transformModel));
        const mvit = mat4_1.mat4.transpose(mat4_1.mat4.invert(mat4_1.mat4.mul(this.viewMatrix, transformModel)));
        shader.builtinUniformLocations.matM && gl.uniformMatrix4fv(shader.builtinUniformLocations.matM, false, transformModel);
        shader.builtinUniformLocations.matVP && gl.uniformMatrix4fv(shader.builtinUniformLocations.matVP, false, this.viewProjectionMatrix);
        shader.builtinUniformLocations.matMVP && gl.uniformMatrix4fv(shader.builtinUniformLocations.matMVP, false, mvp);
        shader.builtinUniformLocations.matM_IT && gl.uniformMatrix4fv(shader.builtinUniformLocations.matM_IT, false, mit);
        shader.builtinUniformLocations.matMV_IT && gl.uniformMatrix4fv(shader.builtinUniformLocations.matMV_IT, false, mvit);
    }
    setupGlobalUniforms(shader, data) {
        const gl = this.gl;
        for (const val of this.globalUniforms.values()) {
            const location = gl.getUniformLocation(shader.program, val.name);
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
        for (const tex of this.globalTextures.values()) {
            const location = gl.getUniformLocation(shader.program, tex.name);
            if (!location)
                continue;
            tex.texture.bind(location, data);
        }
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
        this.target.bind(this.ctx);
        this.useShader(material.shader);
        material.setup(data);
        this.setupTransforms(material.shader, transform);
        this.setupGlobalUniforms(material.shader, data);
        mesh.bind(material.shader, gl);
        gl.drawElements(gl.TRIANGLES, mesh.triangles.length, gl.UNSIGNED_INT, 0);
    }
    drawLines(lines, transform, material) {
        const gl = this.gl;
        const data = {
            assets: this.assets,
            gl: gl,
            nextTextureUnit: 0,
            size: vec2_1.vec2(this.width, this.height),
        };
        this.target.bind(this.ctx);
        this.useShader(material.shader);
        material.setup(data);
        this.setupTransforms(material.shader, transform);
        this.setupGlobalUniforms(material.shader, data);
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