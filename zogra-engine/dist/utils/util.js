export class DoubleBuffer {
    get current() { return this.buffers[this.currentIdx % 2]; }
    set current(value) { this.buffers[this.currentIdx % 2] = value; }
    get back() { return this.buffers[(this.currentIdx + 1) % 2]; }
    set back(value) { this.buffers[(this.currentIdx + 1) % 2] = value; }
    constructor(init) {
        this.currentIdx = 0;
        this.buffers = [init(), init()];
    }
    update() {
        this.currentIdx++;
    }
}
//# sourceMappingURL=util.js.map