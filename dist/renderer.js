"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const builtin_asset_1 = require("./builtin-asset");
const global_1 = require("./global");
const gl_matrix_1 = require("gl-matrix");
class ZograRenderer {
    constructor(canvasElement, width, height) {
        this.viewProjectionMatrix = gl_matrix_1.mat4.create();
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.gl = util_1.panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
        this.DefaultMaterial = null; // makeDefaultMateiral(this.gl);
        gl_matrix_1.mat4.identity(this.viewProjectionMatrix);
        if (!global_1.GL())
            this.use();
    }
    use() {
        global_1.setGL(this.gl);
    }
    setViewProjection(mat) {
        this.viewProjectionMatrix = mat;
    }
    drawMesh(mesh, transform, mateiral) {
        var _a, _b, _c;
        const gl = this.gl;
        mateiral.setup(gl);
        const program = mateiral.shader.program;
        const attributes = mateiral.shader.attributes;
        const locations = util_1.getUniformsLocation(gl, program, builtin_asset_1.DefaultShaderResources.uniforms);
        const mvp = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.mul(mvp, transform, this.viewProjectionMatrix);
        // Setup transforms
        _a = locations.matM, (_a !== null && _a !== void 0 ? _a : gl.uniformMatrix4fv(locations.matM, false, transform));
        _b = locations.matVP, (_b !== null && _b !== void 0 ? _b : gl.uniformMatrix4fv(locations.matVP, false, this.viewProjectionMatrix));
        _c = locations.matMVP, (_c !== null && _c !== void 0 ? _c : gl.uniformMatrix4fv(locations.matMVP, false, mvp));
        const [vertBuffer, elementBuffer] = mesh.setup(gl);
        // Setup VAO
        const stride = 12 * 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        // vert: vec3
        gl.vertexAttribPointer(attributes.vert, 3, gl.FLOAT, false, stride, 0);
        gl.enableVertexAttribArray(attributes.vert);
        // color: vec4
        gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 3 * 4);
        gl.enableVertexAttribArray(attributes.color);
        // uv: vec2
        gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, stride, 7 * 4);
        gl.enableVertexAttribArray(attributes.uv);
        // normal: vec3
        gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, true, stride, 9 * 4);
        gl.enableVertexAttribArray(attributes.uv);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
        gl.drawElements(gl.TRIANGLES, mesh.triangles.length, gl.UNSIGNED_INT, 0);
    }
}
exports.ZograRenderer = ZograRenderer;
//# sourceMappingURL=renderer.js.map