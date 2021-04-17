"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animator = exports.DoubleBuffer = void 0;
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
class Animator {
    constructor(callback, duration, time = 0) {
        this.timeScale = 1;
        this.state = "pending";
        this.duration = duration;
        this.time = time;
        this.callback = callback;
    }
    get playing() { return this.state === "playing" || this.state === "pending"; }
    get finished() { return this.state === "stopped"; }
    play(time = 0) {
        this.time = 0;
        this.state = "pending";
    }
    stop() {
        this.state = "stopped";
    }
    update(dt) {
        switch (this.state) {
            case "stopped":
                return;
            case "pending":
                this.state = "playing";
                this.checkEnd();
                this.callback(this.time / this.duration, this);
                break;
            case "playing":
                this.time += dt * this.timeScale;
                this.checkEnd();
                this.callback(this.time / this.duration, this);
                break;
        }
    }
    checkEnd() {
        if (this.time >= this.duration) {
            this.time = this.duration;
            this.state = "stopped";
        }
    }
}
exports.Animator = Animator;
//# sourceMappingURL=util.js.map