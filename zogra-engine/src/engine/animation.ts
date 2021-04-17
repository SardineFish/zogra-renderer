import { MathUtils } from "zogra-renderer";

export interface Keyframe<T>
{
    time: number,
    keyframe: T,
}

interface AnimationFrameState<T>
{
    time: number,
    deltaTime: number,
    progress: number,
    frame: T,
    animator: Animator<T>,
}

export type Timeline<T> = Keyframe<T>[];

type AnimationCallback<T> = (frame: AnimationFrameState<T>) => void;

export class Animator<T = {}>
{
    time: number;
    duration: number;
    timeScale = 1;
    callback: AnimationCallback<T> | null = null;
    timeline: Timeline<T> | null;
    loop = false;
    state: "pending" | "playing" | "stopped" = "stopped";
    currentFrame: T = {} as any;

    constructor(duration: number, timeline: Timeline<T> | null = null, time = 0)
    {
        this.duration = duration;
        this.time = time;
        this.timeline = timeline;
    }
    get playing() { return this.state === "playing" || this.state === "pending" }
    get finished() { return this.state === "stopped" }

    play(time = 0)
    {
        this.time = time;
        this.state = "pending";
        if (this.timeline && this.timeline.length > 0)
            Object.assign(this.currentFrame, this.timeline[0].keyframe);
    }
    stop()
    {
        this.state = "stopped";
    }

    update(dt: number)
    {
        switch (this.state)
        {
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

    private updateAnimation(dt: number)
    {
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

    private updateFrame()
    {
        if (this.timeline && this.timeline.length > 0)
        {
            for (let i = 0; i < this.timeline.length; i++)
            {
                if (this.timeline[i].time >= this.time)
                {
                    if (i === 0 || this.timeline[i].time === this.time)
                        Object.assign(this.currentFrame, this.timeline[i].keyframe);
                    else
                    {
                        this.interpolate(this.currentFrame, this.timeline[i - 1], this.timeline[i]);
                    }

                    return this.currentFrame;
                }
            }
            if (this.loop)
            {
                this.interpolate(this.currentFrame, this.timeline[this.timeline.length - 1], this.timeline[0]);
            }
            else
            {
                Object.assign(this.currentFrame, this.timeline[this.timeline.length - 1].keyframe);
            }
        }
    }

    private interpolate(frame: T, previous: Keyframe<T>, next: Keyframe<T>)
    {
        let t = (this.time - previous.time) / (next.time - previous.time);
        if (next.time < previous.time)
            t = (this.time - previous.time) / (this.duration - previous.time + next.time);
        for (const key in previous.keyframe)
        {
            frame[key] = previous.keyframe[key];
            if (typeof (previous.keyframe[key]) === "number" && typeof (next.keyframe[key]) === "number")
            {
                frame[key] = MathUtils.lerp(previous.keyframe[key] as any, next.keyframe[key] as any, t) as any;
            }
        }
        return frame;
    }

    private checkEnd()
    {
        if (this.time >= this.duration)
        {
            if (this.loop)
            {
                this.time %= this.duration;
            }
            else
            {
                this.time = this.duration;
                this.state = "stopped";
            }
        }
    }
}