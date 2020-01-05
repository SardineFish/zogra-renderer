"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const builtin_asset_1 = require("./builtin-asset");
const global_1 = require("./global");
const color_1 = require("./types/color");
const mat4_1 = require("./types/mat4");
class ZograRenderer {
    constructor(canvasElement, width, height) {
        this.viewProjectionMatrix = mat4_1.mat4.identity();
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.gl = util_1.panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
        this.DefaultMaterial = null; // makeDefaultMateiral(this.gl);
        if (!global_1.GL())
            this.use();
    }
    use() {
        global_1.setGL(this.gl);
    }
    setViewProjection(mat) {
        this.viewProjectionMatrix = mat;
    }
    clear(color = color_1.Color.black, clearDepth = true) {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | (clearDepth ? this.gl.DEPTH_BUFFER_BIT : 0));
    }
    drawMesh(mesh, transform, mateiral) {
        const gl = this.gl;
        mateiral.setup(gl);
        const program = mateiral.shader.program;
        const attributes = mateiral.shader.attributes;
        const locations = util_1.getUniformsLocation(gl, program, builtin_asset_1.DefaultShaderResources.uniforms);
        const mvp = mat4_1.mat4.mul(transform, this.viewProjectionMatrix);
        // Setup transforms
        locations.matM && gl.uniformMatrix4fv(locations.matM, false, transform);
        locations.matVP && gl.uniformMatrix4fv(locations.matVP, false, this.viewProjectionMatrix);
        locations.matMVP && gl.uniformMatrix4fv(locations.matMVP, false, mat4_1.mat4.identity());
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
    }
}
exports.ZograRenderer = ZograRenderer;
//# sourceMappingURL=renderer.js.map