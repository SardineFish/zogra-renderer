"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../types/vec3");
const vec2_1 = require("../types/vec2");
const color_1 = require("../types/color");
const global_1 = require("./global");
const util_1 = require("../utils/util");
const math_1 = require("../types/math");
class Mesh {
    constructor(gl = global_1.GL()) {
        var _a, _b;
        this._verts = [];
        this._triangles = [];
        this._uvs = [];
        this._colors = [];
        this._normals = [];
        this.dirty = true;
        this.uploaded = false;
        this.vertices = new Float32Array(0);
        this.indices = new Uint32Array(0);
        this.gl = gl;
        this.VBO = (_a = gl.createBuffer(), (_a !== null && _a !== void 0 ? _a : util_1.panic("Failed to create vertex buffer.")));
        this.EBO = (_b = gl.createBuffer(), (_b !== null && _b !== void 0 ? _b : util_1.panic("Failed to create element buffer.")));
    }
    get verts() { return this._verts; }
    set verts(verts) {
        this._verts = verts;
        this.dirty = true;
    }
    get triangles() { return this._triangles; }
    set triangles(triangles) {
        this._triangles = triangles;
        this.dirty = true;
    }
    get uvs() { return this._uvs; }
    set uvs(uvs) {
        this._uvs = uvs;
        this.dirty = true;
    }
    get colors() { return this._colors; }
    set colors(colors) {
        this._colors = colors;
        this.dirty = true;
    }
    get normals() { return this._normals; }
    set normals(normals) {
        this._normals = normals;
        this.dirty = true;
    }
    clear() {
        this.verts = [];
        this.uvs = [];
        this.triangles = [];
        this.colors = [];
        this.normals = [];
    }
    // https://schemingdeveloper.com/2014/10/17/better-method-recalculate-normals-unity/
    calculateNormals(angleThreshold = 0) {
        if (this.triangles.length % 3 !== 0)
            throw new Error("Invalid triangles.");
        this.normals = util_1.fillArray(() => vec3_1.vec3(0, 0, 0), this.verts.length);
        for (let i = 0; i < this.triangles.length; i += 3) {
            const a = this.verts[this.triangles[i]];
            const b = this.verts[this.triangles[i + 1]];
            const c = this.verts[this.triangles[i + 2]];
            const u = math_1.minus(b, a);
            const v = math_1.minus(c, a);
            const normal = math_1.cross(u, v).normalize();
            this.normals[this.triangles[i]].plus(normal);
        }
        for (let i = 0; i < this.normals.length; i++)
            this.normals[i] = this.normals[i].normalize();
    }
    update() {
        if (this.dirty) {
            if (this.triangles.length % 3 !== 0)
                throw new Error("Invalid triangles.");
            if (this.colors.length !== this.verts.length)
                this.colors = [...this.colors, ...util_1.fillArray(color_1.Color.white, this.verts.length - this.colors.length)];
            if (this.uvs.length !== this.verts.length)
                this.uvs = [...this.uvs, ...util_1.fillArray(vec2_1.vec2(0, 0), this.verts.length - this.uvs.length)];
            if (this.normals.length !== this.verts.length)
                this.normals = [...this.normals, ...util_1.fillArray(vec3_1.vec3(0, 0, 0), this.verts.length - this.normals.length)];
            this.vertices = new Float32Array(this.verts.flatMap((vert, idx) => [
                ...vert,
                ...this.colors[idx],
                ...this.uvs[idx],
                ...this.normals[idx]
            ]));
            if (this.vertices.length != this.verts.length * 12)
                throw new Error("Buffer with invalid length.");
            this.indices = new Uint32Array(this.triangles.flat());
            this.dirty = false;
            this.uploaded = false;
        }
    }
    setup(gl) {
        this.update();
        if (!this.uploaded) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
            this.uploaded = true;
        }
        return [this.VBO, this.EBO];
    }
    bind(shader, gl) {
        this.setup(gl);
        const attributes = shader.attributes;
        // Setup VAO
        const stride = 12 * 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
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
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
    }
}
exports.Mesh = Mesh;
//# sourceMappingURL=mesh.js.map