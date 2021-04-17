"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleBuffer = void 0;
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