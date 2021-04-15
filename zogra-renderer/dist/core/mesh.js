"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshEx = exports.Mesh = exports.DefaultVertexStructInfo = exports.DefaultVertexData = void 0;
const vec3_1 = require("../types/vec3");
const vec2_1 = require("../types/vec2");
const color_1 = require("../types/color");
const global_1 = require("./global");
const util_1 = require("../utils/util");
const math_1 = require("../types/math");
const asset_1 = require("./asset");
const buffer_1 = require("./buffer");
const VertDataFloatCount = 14;
exports.DefaultVertexData = {
    vert: "vec3",
    color: "vec4",
    normal: "vec3",
    uv: "vec2",
    uv2: "vec2",
};
exports.DefaultVertexStructInfo = buffer_1.BufferStructureInfo.from(exports.DefaultVertexData);
class Mesh extends asset_1.Asset {
    constructor(gl = global_1.GL()) {
        super();
        this._verts = [];
        this._triangles = [];
        this._uvs = [];
        this._uv2 = [];
        this._colors = [];
        this._normals = [];
        this.dirty = true;
        this.uploaded = false;
        this.vertices = new Float32Array(0);
        this.indices = new Uint32Array(0);
        this.VAO = null;
        this.VBO = null;
        this.EBO = null;
        this.initialized = false;
        this.name = `Mesh_${this.assetID}`;
        this.vertexStruct = exports.DefaultVertexStructInfo;
        this.gl = gl;
        this.tryInit(false);
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
    get uv2() { return this._uv2; }
    set uv2(uv) {
        this._uv2 = uv;
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
            this.normals[this.triangles[i + 0]].plus(normal);
            this.normals[this.triangles[i + 1]].plus(normal);
            this.normals[this.triangles[i + 2]].plus(normal);
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
            if (this.uv2.length !== this.verts.length)
                this.uv2 = [...this.uv2, ...util_1.fillArray(vec2_1.vec2(0, 0), this.verts.length - this.uv2.length)];
            if (this.normals.length !== this.verts.length)
                this.normals = [...this.normals, ...util_1.fillArray(vec3_1.vec3(0, 0, 0), this.verts.length - this.normals.length)];
            this.vertices = new Float32Array(this.verts.flatMap((vert, idx) => [
                ...vert,
                ...this.colors[idx],
                ...this.normals[idx],
                ...this.uvs[idx],
                ...this.uv2[idx],
            ]));
            if (this.vertices.length != this.verts.length * VertDataFloatCount)
                throw new Error("Buffer with invalid length.");
            this.indices = new Uint32Array(this.triangles.flat());
            this.dirty = false;
            this.uploaded = false;
        }
    }
    setup() {
        this.update();
        this.tryInit(true);
        const gl = this.gl;
        if (!this.uploaded) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
            this.uploaded = true;
        }
        return [this.VBO, this.EBO];
    }
    bind(shader) {
        this.setup();
        const gl = this.gl;
        // const attributes = shader._internal().attributes;
        // // Setup VAO
        // const stride = VertDataFloatCount * 4;
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        // // vert: vec3
        // if (attributes.vert >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.vert, 3, gl.FLOAT, false, stride, 0);
        //     gl.enableVertexAttribArray(attributes.vert);
        // }
        // // color: vec4
        // if (attributes.color >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 3 * 4);
        //     gl.enableVertexAttribArray(attributes.color);
        // }
        // // uv: vec2
        // if (attributes.uv >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, stride, 7 * 4);
        //     gl.enableVertexAttribArray(attributes.uv);
        // }
        // // uv2: vec2
        // if (attributes.uv2 >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.uv2, 2, gl.FLOAT, false, stride, 9 * 4);
        //     gl.enableVertexAttribArray(attributes.uv2);
        // }
        // if (attributes.uv)
        // // normal: vec3
        // if (attributes.normal >= 0)
        // {
        //     gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, true, stride, 11 * 4);
        //     gl.enableVertexAttribArray(attributes.normal);
        // }
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bindVertexArray(this.VAO);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
        // gl.bindVertexArray(shader.vertexArray);
    }
    unbind() {
        const gl = this.gl;
        // gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }
    destroy() {
        if (!this.initialized)
            return;
        if (this.destroyed)
            return;
        this.gl.deleteBuffer(this.VBO);
        this.gl.deleteBuffer(this.EBO);
        super.destroy();
    }
    tryInit(required = false) {
        var _a, _b;
        if (this.initialized)
            return true;
        const gl = this.gl || global_1.GL();
        if (!gl) {
            if (required)
                throw new Error("Failed to init mesh without global GL context");
            return false;
        }
        this.gl = gl;
        this.VBO = (_a = gl.createBuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create vertex buffer.");
        this.EBO = (_b = gl.createBuffer()) !== null && _b !== void 0 ? _b : util_1.panic("Failed to create element buffer.");
        this.initVAO();
        this.initialized = true;
        return true;
    }
    initVAO() {
        var _a;
        const gl = this.gl;
        this.VAO = (_a = gl.createVertexArray()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create vertex array object.");
        gl.bindVertexArray(this.VAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        for (const element of this.vertexStruct.elements) {
            gl.enableVertexAttribArray(element.location);
            gl.vertexAttribPointer(element.location, element.length, gl.FLOAT, false, this.vertexStruct.byteSize, element.byteOffset);
        }
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}
exports.Mesh = Mesh;
class MeshEx extends asset_1.Asset {
    constructor(...args) {
        super("Mesh");
        this.ctx = null;
        this.initialized = false;
        this.vertexArray = null;
        this.elementBuffer = null;
        this.dirty = true;
        this.triangles = new Uint32Array();
        if (args.length === 0) {
            this.ctx = global_1.GlobalContext();
            this.vertices = new buffer_1.RenderBuffer(exports.DefaultVertexData, 0);
        }
        else if (args.length === 1) {
            if (args[0] instanceof global_1.GLContext) {
                this.ctx = args[0];
                this.vertices = new buffer_1.RenderBuffer(exports.DefaultVertexData, 0);
            }
            else {
                this.ctx = global_1.GlobalContext();
                this.vertices = new buffer_1.RenderBuffer(args[0], 0);
            }
        }
        else {
            this.ctx = args[1] || global_1.GlobalContext();
            this.vertices = new buffer_1.RenderBuffer(args[0], 0);
        }
        this.tryInit(false);
    }
    resize(vertices, indices, keepData = false) {
        this.vertices.resize(vertices, keepData);
        let oldTriangles = this.triangles;
        this.triangles = new Uint32Array(indices);
        if (keepData) {
            if (indices < oldTriangles.length) {
                oldTriangles = new Uint32Array(oldTriangles.buffer, 0, indices);
            }
            this.triangles.set(oldTriangles, 0);
        }
        this.dirty = true;
    }
    update(upload = false) {
        this.dirty = true;
        this.vertices.markDirty();
        if (upload)
            this.upload();
    }
    upload() {
        this.tryInit(true);
        if (!this.dirty)
            return false;
        const gl = this.ctx.gl;
        this.vertices.upload();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.triangles, gl.STATIC_DRAW);
        this.dirty = false;
        return true;
    }
    bind() {
        this.upload();
        const gl = this.ctx.gl;
        gl.bindVertexArray(this.vertexArray);
        // this.vertices.bind();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.triangles, gl.STATIC_DRAW);
    }
    unbind() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }
    tryInit(required = false) {
        var _a, _b;
        if (this.initialized)
            return true;
        this.ctx = this.ctx || global_1.GlobalContext;
        if (!this.ctx) {
            if (required)
                throw new Error("Failed to init mesh without global GL context");
            return false;
        }
        const gl = this.ctx.gl;
        this.elementBuffer = (_a = gl.createBuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create element buffer object.");
        this.vertexArray = (_b = gl.createVertexArray()) !== null && _b !== void 0 ? _b : util_1.panic("Failed to create vertex array object.");
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        gl.bindVertexArray(this.vertexArray);
        this.vertices.bindVertexArray();
        gl.bindVertexArray(null);
        this.initialized = true;
        return true;
    }
}
exports.MeshEx = MeshEx;
//# sourceMappingURL=mesh.js.map