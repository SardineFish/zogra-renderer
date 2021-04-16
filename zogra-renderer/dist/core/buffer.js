"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderBuffer = exports.BufferStructureInfo = void 0;
const util_1 = require("../utils/util");
const global_1 = require("./global");
exports.BufferStructureInfo = {
    from(structure) {
        const valueLength = {
            float: 1,
            vec2: 2,
            vec3: 3,
            vec4: 4,
            mat4: 16,
        };
        const structInfo = {
            elements: [],
            byteSize: 0,
            totalSize: 0,
        };
        let location = 0;
        for (const key in structure) {
            const element = {
                key,
                type: structure[key],
                location: location,
                length: valueLength[structure[key]],
            };
            element.byteLength = element.length * 4;
            element.offset = structInfo.totalSize;
            element.byteOffset = structInfo.byteSize;
            structInfo.totalSize += element.length;
            structInfo.byteSize += element.byteLength;
            structInfo.elements.push(element);
            location += structure[key] === "mat4" ? 4 : 1;
        }
        return structInfo;
    }
};
class RenderBuffer extends Array {
    constructor(structure, items, ctx = global_1.GlobalContext()) {
        super(items);
        this.static = true;
        this.dirty = false;
        this.initialized = false;
        this.glBuf = null;
        this.structure = exports.BufferStructureInfo.from(structure);
        // this.structure = structure;
        this.ctx = ctx;
        this.buffer = null;
        this.resize(items);
        this.tryInit(false);
    }
    get byteLength() { return this.length * this.structure.byteSize; }
    resize(length, keepContent = true) {
        const oldBuffer = this.buffer;
        this.buffer = new Float32Array(this.structure.totalSize * length);
        if (keepContent && oldBuffer) {
            if (oldBuffer.length > this.buffer.length) {
                this.buffer.set(new Float32Array(oldBuffer.buffer, 0, this.buffer.length));
            }
            else
                this.buffer.set(oldBuffer, 0);
        }
        this.length = length;
        for (let i = 0; i < this.length; i++) {
            const elementView = {};
            for (const element of this.structure.elements) {
                const bufferOffset = i * this.structure.byteSize + element.byteOffset;
                switch (element.type) {
                    case "float":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 1);
                        break;
                    case "vec2":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 2);
                        break;
                    case "vec3":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 3);
                        break;
                    case "vec4":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 4);
                        break;
                    case "mat4":
                        elementView[element.key] = new Float32Array(this.buffer.buffer, bufferOffset, 16);
                        break;
                }
            }
            this[i] = elementView;
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
    bind() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        this.upload();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
    }
    bindVertexArray(instancing = false, attributes) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuf);
        for (const element of this.structure.elements) {
            const location = attributes
                ? attributes[element.key] || -1
                : element.location;
            if (location < 0)
                continue;
            if (element.type === "mat4") {
                gl.enableVertexAttribArray(element.location + 0);
                gl.enableVertexAttribArray(element.location + 1);
                gl.enableVertexAttribArray(element.location + 2);
                gl.enableVertexAttribArray(element.location + 3);
                gl.vertexAttribPointer(element.location + 0, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 0);
                gl.vertexAttribPointer(element.location + 1, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 1);
                gl.vertexAttribPointer(element.location + 2, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 2);
                gl.vertexAttribPointer(element.location + 3, 4, gl.FLOAT, false, this.structure.byteSize, element.byteOffset + 3);
                if (instancing) {
                    gl.vertexAttribDivisor(element.location + 0, 1);
                    gl.vertexAttribDivisor(element.location + 1, 1);
                    gl.vertexAttribDivisor(element.location + 2, 1);
                    gl.vertexAttribDivisor(element.location + 3, 1);
                }
            }
            else {
                gl.enableVertexAttribArray(element.location);
                gl.vertexAttribPointer(element.location, element.length, gl.FLOAT, false, this.structure.byteSize, element.byteOffset);
                instancing && gl.vertexAttribDivisor(element.location, 1);
            }
        }
    }
    unbindVertexArray(instancing = false, attributes) {
        this.tryInit(true);
        const gl = this.ctx.gl;
        for (const element of this.structure.elements) {
            const location = attributes
                ? attributes[element.key] || -1
                : element.location;
            if (location < 0)
                continue;
            if (element.type === "mat4") {
                gl.disableVertexAttribArray(element.location + 0);
                gl.disableVertexAttribArray(element.location + 1);
                gl.disableVertexAttribArray(element.location + 2);
                gl.disableVertexAttribArray(element.location + 3);
                if (instancing) {
                    gl.vertexAttribDivisor(element.location + 0, 0);
                    gl.vertexAttribDivisor(element.location + 1, 0);
                    gl.vertexAttribDivisor(element.location + 2, 0);
                    gl.vertexAttribDivisor(element.location + 3, 0);
                }
            }
            else {
                gl.disableVertexAttribArray(element.location);
                instancing && gl.vertexAttribDivisor(element.location, 0);
            }
        }
    }
    unbind() {
        this.tryInit(true);
        const gl = this.ctx.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
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
        gl.bufferData(gl.ARRAY_BUFFER, this.byteLength, this.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.initialized = true;
        return true;
    }
}
exports.RenderBuffer = RenderBuffer;
//# sourceMappingURL=buffer.js.map