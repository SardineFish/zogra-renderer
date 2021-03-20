"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderBuffer = void 0;
const util_1 = require("../utils/util");
const global_1 = require("./global");
class RenderBuffer extends Array {
    constructor(structure, items, ctx = global_1.GlobalContext()) {
        super(items);
        this.static = false;
        this.dirty = false;
        this.initialized = false;
        this.glBuf = null;
        this.structure = structure;
        this.ctx = ctx;
        let elementSize = 0;
        for (const key in structure) {
            switch (structure[key]) {
                case "float":
                    elementSize += 1;
                    break;
                case "vec2":
                    elementSize += 2;
                    break;
                case "vec3":
                    elementSize += 3;
                    break;
                case "vec4":
                    elementSize += 4;
                    break;
                case "mat4":
                    elementSize += 16;
                    break;
            }
        }
        const elementBytes = elementSize * 4;
        this.buffer = null;
        this.byteSize = elementBytes * items;
        this.elementSize = elementSize;
        this.elementByteSize = elementBytes;
        this.resize(items);
        this.tryInit(false);
    }
    tryInit(required = false) {
        var _a;
        if (this.initialized)
            return true;
        const ctx = this.ctx || global_1.GlobalContext();
        if (!ctx) {
            if (required)
                throw new Error("Failed to init render buffer without a global GL context.");
            return false;
        }
        this.ctx = ctx;
        const gl = ctx.gl;
        this.glBuf = (_a = gl.createBuffer()) !== null && _a !== void 0 ? _a : util_1.panic("Failed to create render buffer");
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.byteSize, this.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);
        this.initialized = true;
        return true;
    }
    resize(length, keepContent = true) {
        const oldBuffer = this.buffer;
        this.buffer = new Float32Array(this.elementSize * length);
        if (keepContent && oldBuffer) {
            this.buffer.set(oldBuffer, 0);
        }
        this.length = length;
        const elementBytes = this.elementByteSize;
        for (let i = 0; i < this.length; i++) {
            const element = {};
            let offset = 0;
            for (const key in this.structure) {
                switch (this.structure[key]) {
                    case "float":
                        element[key] = new Float32Array(this.buffer.buffer, i * elementBytes + offset * 4, 1);
                        offset += 1;
                        break;
                    case "vec2":
                        element[key] = new Float32Array(this.buffer.buffer, i * elementBytes + offset * 4, 2);
                        offset += 2;
                        break;
                    case "vec3":
                        element[key] = new Float32Array(this.buffer.buffer, i * elementBytes + offset * 4, 3);
                        offset += 3;
                        break;
                    case "vec4":
                        element[key] = new Float32Array(this.buffer.buffer, i * elementBytes + offset * 4, 4);
                        offset += 4;
                        break;
                    case "mat4":
                        element[key] = new Float32Array(this.buffer.buffer, i * elementBytes + offset * 4, 16);
                        offset += 16;
                        break;
                }
            }
            this[i] = element;
        }
        this.dirty = true;
    }
    markDirty() {
        this.dirty = true;
    }
    upload(force = false) {
        this.tryInit(true);
        if (!this.dirty && !force && this.static)
            return false;
        const gl = this.ctx.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.buffer, this.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);
        this.dirty = false;
        return true;
    }
    bindInstanceDraw(shader) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        this.upload() || gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
        const locations = shader.attributes;
        let floatOffset = 0;
        for (const key in this.structure) {
            const loc = locations[key];
            loc >= 0 && gl.enableVertexAttribArray(loc);
            switch (this.structure[key]) {
                case "float":
                    loc >= 0 && gl.vertexAttribPointer(loc, 1, gl.FLOAT, false, this.elementByteSize, floatOffset * 4);
                    floatOffset += 1;
                    break;
                case "vec2":
                    loc >= 0 && gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, this.elementByteSize, floatOffset * 4);
                    floatOffset += 2;
                    break;
                case "vec3":
                    loc >= 0 && gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, this.elementByteSize, floatOffset * 4);
                    floatOffset += 3;
                    break;
                case "vec4":
                    loc >= 0 && gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, this.elementByteSize, floatOffset * 4);
                    floatOffset += 4;
                    break;
                case "mat4":
                    if (loc >= 0) {
                        // Matrix 4x4 takes 4 attribute slots
                        gl.enableVertexAttribArray(loc + 0);
                        gl.enableVertexAttribArray(loc + 1);
                        gl.enableVertexAttribArray(loc + 2);
                        gl.enableVertexAttribArray(loc + 3);
                        gl.vertexAttribPointer(loc + 0, 4, gl.FLOAT, false, this.elementByteSize, (floatOffset + 0) * 4);
                        gl.vertexAttribPointer(loc + 1, 4, gl.FLOAT, false, this.elementByteSize, (floatOffset + 4) * 4);
                        gl.vertexAttribPointer(loc + 2, 4, gl.FLOAT, false, this.elementByteSize, (floatOffset + 8) * 4);
                        gl.vertexAttribPointer(loc + 3, 4, gl.FLOAT, false, this.elementByteSize, (floatOffset + 12) * 4);
                        gl.vertexAttribDivisor(loc + 0, 1);
                        gl.vertexAttribDivisor(loc + 1, 1);
                        gl.vertexAttribDivisor(loc + 2, 1);
                        gl.vertexAttribDivisor(loc + 3, 1);
                    }
                    floatOffset += 16;
                    break;
            }
            loc >= 0 && gl.vertexAttribDivisor(loc, 1);
        }
    }
    cleanupInstanceDraw(shader) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        const locations = shader.attributes;
        for (const key in this.structure) {
            const loc = locations[key];
            switch (this.structure[key]) {
                case "float":
                case "vec2":
                case "vec3":
                case "vec4":
                    loc >= 0 && gl.vertexAttribDivisor(loc, 0);
                    loc >= 0 && gl.disableVertexAttribArray(loc);
                    break;
                case "mat4":
                    if (loc >= 0) {
                        gl.vertexAttribDivisor(loc + 0, 0);
                        gl.vertexAttribDivisor(loc + 1, 0);
                        gl.vertexAttribDivisor(loc + 2, 0);
                        gl.vertexAttribDivisor(loc + 3, 0);
                        gl.disableVertexAttribArray(loc + 0);
                        gl.disableVertexAttribArray(loc + 1);
                        gl.disableVertexAttribArray(loc + 2);
                        gl.disableVertexAttribArray(loc + 3);
                    }
                    break;
            }
        }
    }
}
exports.RenderBuffer = RenderBuffer;
//# sourceMappingURL=buffer.js.map