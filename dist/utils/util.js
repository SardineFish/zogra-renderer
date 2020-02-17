"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function panicNull(t, msg) {
    if (t === null)
        throw new Error(msg);
    return t;
}
exports.panicNull = panicNull;
function panic(msg) {
    throw new Error(msg);
}
exports.panic = panic;
function warn(msg) {
    console.warn(msg);
    return null;
}
exports.warn = warn;
function decorator(name, defaultValue = undefined, dataWrapper = v => v) {
    const metadataKey = Symbol(name);
    return [
        (value) => {
            if (value === undefined)
                value = defaultValue;
            return Reflect.metadata(metadataKey, dataWrapper(value));
        },
        (target, propKey) => {
            if (propKey === undefined)
                return Reflect.getMetadata(metadataKey, target);
            else
                return Reflect.getMetadata(metadataKey, target, propKey);
        }
    ];
}
exports.decorator = decorator;
function getUniformsLocation(gl, program, uniforms) {
    const out = {};
    for (const key in uniforms) {
        out[key] = gl.getUniformLocation(program, uniforms[key]);
    }
    return out;
}
exports.getUniformsLocation = getUniformsLocation;
function fillArray(element, count) {
    const arr = new Array(count);
    for (let i = 0; i < count; i++)
        arr[i] = typeof (element) === "function" ? element(i) : element;
    return arr;
}
exports.fillArray = fillArray;
class DoubleBuffer {
    constructor(init) {
        this.currentIdx = 0;
        this.buffers = [init(), init()];
    }
    get current() { return this.buffers[this.currentIdx % 2]; }
    set current(value) { this.buffers[this.currentIdx % 2] = value; }
    get back() { return this.buffers[(this.currentIdx + 1) % 2]; }
    set back(value) { this.buffers[(this.currentIdx + 1) % 2] = value; }
    update() {
        this.currentIdx++;
    }
}
exports.DoubleBuffer = DoubleBuffer;
//# sourceMappingURL=util.js.map