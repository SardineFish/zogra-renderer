"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animator = exports.AnimationPlayback = exports.Timeline = void 0;
const zogra_renderer_1 = require("zogra-renderer");
function Timeline(timeline) {
    const times = Object.keys(timeline.frames).map(t => ({ key: t, time: parseFloat(t) })).sort((a, b) => a.time - b.time);
    const output = {
        loop: timeline.loop || false,
        duration: timeline.duration,
        frames: [],
        updater: timeline.updater,
    };
    for (const time of times) {
        output.frames.push({
            time: time.time,
            values: timeline.frames[time.key],
        });
    }
    return output;
}
exports.Timeline = Timeline;
class AnimationPlayback {
    constructor(timeline, target, updater) {
        this.frameTime = 0;
        this.time = 0;
        this.timeScale = 1;
        this.target = undefined;
        this.updater = undefined;
        this.state = "stopped";
        this.currentFrame = {};
        this.frameTime = 0;
        this.timeline = timeline;
        this.loop = timeline.loop;
        this.duration = timeline.duration;
        this.target = target;
        this.updater = updater;
        if (!this.updater && target && timeline.updater) {
            this.updater = (frame) => {
                timeline.updater(frame.frame, target);
            };
        }
    }
    get playing() { return this.state === "playing" || this.state === "pending"; }
    get finished() { return this.state === "stopped"; }
    play(time = 0) {
        return new Promise((resolve, reject) => {
            this.resolver = resolve;
            this.rejector = reject;
            this.frameTime = time;
            this.frameTime = time;
            this.state = "pending";
            if (this.timeline && this.timeline.frames.length > 0)
                Object.assign(this.currentFrame, this.timeline.frames[0].values);
        });
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
    reject() {
        var _a;
        (_a = this.rejector) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    updateAnimation(dt) {
        if (!this.updater)
            return;
        if (this.loop)
            this.frameTime = this.time % this.timeline.duration;
        else
            this.frameTime = this.time;
        this.updateFrame();
        this.updater({
            deltaTime: dt,
            frame: this.currentFrame,
            animator: this,
            target: this.target,
            time: this.time,
            frameTime: this.frameTime,
            progress: this.frameTime / this.duration
        });
    }
    updateFrame() {
        if (this.timeline && this.timeline.frames.length > 0) {
            for (let i = 0; i < this.timeline.frames.length; i++) {
                if (this.timeline.frames[i].time >= this.frameTime) {
                    if (i === 0 || this.timeline.frames[i].time === this.frameTime)
                        Object.assign(this.currentFrame, this.timeline.frames[i].values);
                    else {
                        this.interpolate(this.currentFrame, this.timeline.frames[i - 1], this.timeline.frames[i]);
                    }
                    return this.currentFrame;
                }
            }
            if (this.loop) {
                this.interpolate(this.currentFrame, this.timeline.frames[this.timeline.frames.length - 1], this.timeline.frames[0]);
            }
            else {
                Object.assign(this.currentFrame, this.timeline.frames[this.timeline.frames.length - 1].values);
            }
        }
    }
    interpolate(frame, previous, next) {
        let t = (this.frameTime - previous.time) / (next.time - previous.time);
        if (next.time < previous.time)
            t = (this.frameTime - previous.time) / (this.timeline.duration + next.time - previous.time);
        for (const key in previous.values) {
            frame[key] = previous.values[key];
            if (typeof (previous.values[key]) === "number" && typeof (next.values[key]) === "number") {
                frame[key] = zogra_renderer_1.MathUtils.lerp(previous.values[key], next.values[key], t);
            }
        }
        return frame;
    }
    checkEnd() {
        var _a;
        if (this.time >= this.duration) {
            this.time = this.duration;
            this.state = "stopped";
            (_a = this.resolver) === null || _a === void 0 ? void 0 : _a.call(this, this);
        }
    }
}
exports.AnimationPlayback = AnimationPlayback;
class ProceduralPlayback {
    constructor(time, updater) {
        this.currentTime = 0;
        this.state = "stopped";
        this.totalTime = time;
        this.updater = updater;
    }
    get finished() { return this.state === "stopped"; }
    play() {
        return new Promise((resolve, reject) => {
            this.rejector = reject;
            this.resolver = resolve;
            if (this.state === "stopped")
                this.state = "pending";
        });
    }
    stop() {
        this.resolver = undefined;
        this.state = "stopped";
    }
    update(dt) {
        var _a;
        switch (this.state) {
            case "stopped":
                return;
            case "pending":
                this.state = "playing";
            case "playing":
                this.currentTime += dt;
                this.checkEnd();
                (_a = this.updater) === null || _a === void 0 ? void 0 : _a.call(this, this.currentTime / this.totalTime);
                break;
        }
    }
    reject() {
        var _a;
        (_a = this.rejector) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    checkEnd() {
        var _a;
        if (this.currentTime >= this.totalTime) {
            this.currentTime = this.totalTime;
            this.state = "stopped";
            (_a = this.resolver) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    }
}
class Animator {
    constructor(target) {
        this.tracks = [];
        this.defaultTarget = target;
    }
    play(timeline, target = this.defaultTarget, duration = timeline.duration, updater) {
        const playback = new AnimationPlayback(timeline, target, updater);
        playback.duration = duration;
        const promise = playback.play();
        this.tracks.push(playback);
        return promise;
    }
    playProcedural(time, updater, startTime = 0) {
        const playback = new ProceduralPlayback(time, updater);
        playback.currentTime = startTime;
        const promise = playback.play();
        this.tracks.push(playback);
        return promise;
    }
    update(dt) {
        for (let i = 0; i < this.tracks.length; i++) {
            const playback = this.tracks[i];
            playback.update(dt);
            if (playback.finished) {
                this.tracks[i] = this.tracks[this.tracks.length - 1];
                this.tracks.length--;
                i--;
            }
        }
    }
    clear() {
        for (const track of this.tracks)
            track.reject();
        this.tracks.length = 0;
    }
}
exports.Animator = Animator;
//# sourceMappingURL=animation.js.map