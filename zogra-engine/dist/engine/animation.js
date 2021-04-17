"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animator = void 0;
const zogra_renderer_1 = require("zogra-renderer");
class Animator {
    constructor(duration, timeline = null, time = 0) {
        this.timeScale = 1;
        this.callback = null;
        this.loop = false;
        this.state = "stopped";
        this.currentFrame = {};
        this.duration = duration;
        this.time = time;
        this.timeline = timeline;
    }
    get playing() { return this.state === "playing" || this.state === "pending"; }
    get finished() { return this.state === "stopped"; }
    play(time = 0) {
        this.time = time;
        this.state = "pending";
        if (this.timeline && this.timeline.length > 0)
            Object.assign(this.currentFrame, this.timeline[0].keyframe);
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
                this.updateAnimation(dt);
                break;
            case "playing":
                this.time += dt * this.timeScale;
                this.checkEnd();
                this.updateAnimation(dt);
                break;
        }
    }
    updateAnimation(dt) {
        if (!this.callback)
            return;
        this.updateFrame();
        this.callback({
            deltaTime: dt,
            frame: this.currentFrame,
            animator: this,
            time: this.time,
            progress: this.time / this.duration
        });
    }
    updateFrame() {
        if (this.timeline && this.timeline.length > 0) {
            for (let i = 0; i < this.timeline.length; i++) {
                if (this.timeline[i].time >= this.time) {
                    if (i === 0 || this.timeline[i].time === this.time)
                        Object.assign(this.currentFrame, this.timeline[i].keyframe);
                    else {
                        this.interpolate(this.currentFrame, this.timeline[i - 1], this.timeline[i]);
                    }
                    return this.currentFrame;
                }
            }
            if (this.loop) {
                this.interpolate(this.currentFrame, this.timeline[this.timeline.length - 1], this.timeline[0]);
            }
            else {
                Object.assign(this.currentFrame, this.timeline[this.timeline.length - 1].keyframe);
            }
        }
    }
    interpolate(frame, previous, next) {
        let t = (this.time - previous.time) / (next.time - previous.time);
        if (next.time < previous.time)
            t = (this.time - previous.time) / (this.duration - previous.time + next.time);
        for (const key in previous.keyframe) {
            frame[key] = previous.keyframe[key];
            if (typeof (previous.keyframe[key]) === "number" && typeof (next.keyframe[key]) === "number") {
                frame[key] = zogra_renderer_1.MathUtils.lerp(previous.keyframe[key], next.keyframe[key], t);
            }
        }
        return frame;
    }
    checkEnd() {
        if (this.time >= this.duration) {
            if (this.loop) {
                this.time %= this.duration;
            }
            else {
                this.time = this.duration;
                this.state = "stopped";
            }
        }
    }
}
exports.Animator = Animator;
//# sourceMappingURL=animation.js.map