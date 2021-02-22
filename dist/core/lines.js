"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineBuilder = exports.Lines = void 0;
const color_1 = require("../types/color");
const global_1 = require("./global");
const util_1 = require("../utils/util");
const asset_1 = require("./asset");
class Lines extends asset_1.Asset {
    constructor(gl = global_1.GL()) {
        var _a, _b;
        super();
        this._verts = [];
        this._colors = [];
        this._lines = [];
        this.dirty = true;
        this.vertices = new Float32Array(0);
        this.indices = new Uint32Array(0);
        this.name = `Lines_${this.assetID}`;
        this.gl = gl;
        this.VBO = (_a = gl.createBuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create vertex buffer.");
        this.EBO = (_b = gl.createBuffer()) !== null && _b !== void 0 ? _b : util_1.panic("Failed to create element buffer.");
    }
    get verts() { return this._verts; }
    set verts(verts) {
        this._verts = verts;
        this.dirty = true;
    }
    get colors() { return this._colors; }
    set colors(colors) {
        this._colors = colors;
        this.dirty = true;
    }
    get lines() { return this._lines; }
    set lines(lines) {
        this._lines = lines;
        this.dirty = true;
    }
    clear() {
        this.verts = [];
        this.colors = [];
        this.lines = [];
    }
    update() {
        if (this.dirty) {
            const gl = this.gl;
            // Prepare VBO data.
            if (this.lines.length % 2 !== 0)
                throw new Error("Invalid lines.");
            if (this.colors.length !== this.verts.length)
                this.colors = [...this.colors, ...util_1.fillArray(color_1.Color.white, this.verts.length - this.colors.length)];
            this.vertices = new Float32Array(this.verts.flatMap((vert, idx) => [
                ...vert,
                ...this.colors[idx],
            ]));
            if (this.vertices.length != this.verts.length * 7)
                throw new Error("Buffer with invalid length.");
            this.indices = new Uint32Array(this.lines.flat());
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.DYNAMIC_DRAW);
            this.dirty = false;
        }
    }
    bind(shader) {
        const gl = this.gl;
        this.update();
        const attributes = shader.attributes;
        // Setup VAO
        const stride = 7 * 4;
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
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
    }
    destroy() {
        if (this.destroyed)
            return;
        this.gl.deleteBuffer(this.VBO);
        this.gl.deleteBuffer(this.EBO);
        super.destroy();
    }
}
exports.Lines = Lines;
class LineBuilder {
    constructor(capacity = 0, gl = global_1.GL()) {
        this.verts = [];
        this.colors = [];
        this.lines = [];
        this.gl = gl;
    }
    addLine(line, color = color_1.Color.white) {
        const base = this.verts.length;
        const [u, v] = line;
        this.verts.push(u, v);
        this.colors.push(color, color);
        this.lines.push(base, base + 1);
    }
    toLines() {
        const line = new Lines(this.gl);
        line.verts = this.verts;
        line.colors = this.colors;
        line.lines = this.lines;
        line.update();
        return line;
    }
}
exports.LineBuilder = LineBuilder;
//# sourceMappingURL=lines.js.map