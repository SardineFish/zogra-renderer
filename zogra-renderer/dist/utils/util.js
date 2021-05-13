import "reflect-metadata";
export function panicNull(t, msg) {
    if (t === null)
        throw new Error(msg);
    return t;
}
export function panic(msg) {
    throw new Error(msg);
}
export function warn(msg) {
    console.warn(msg);
    return null;
}
export function decorator(name, defaultValue = undefined, dataWrapper = v => v) {
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
export function getUniformsLocation(gl, program, uniforms) {
    const out = {};
    for (const key in uniforms) {
        out[key] = gl.getUniformLocation(program, uniforms[key]);
    }
    return out;
}
export function fillArray(element, count) {
    const arr = new Array(count);
    for (let i = 0; i < count; i++)
        arr[i] = typeof (element) === "function" ? element(i) : element;
    return arr;
}
export class DoubleBuffer {
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
export function setImmediate(invoker) {
    setTimeout(invoker, 0);
}
export function cloneUniformValue(value) {
    if (value === null)
        return null;
    if (typeof (value) === "number")
        return value;
    else if (value instanceof Array)
        return value.clone();
    return value;
}
//# sourceMappingURL=util.js.map