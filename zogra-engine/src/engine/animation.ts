import { EventEmitter, EventKeys, MathUtils } from "zogra-renderer";

export interface Keyframe<T>
{
    time: number,
    values: T,
}

interface AnimationFrameState<T>
{
    time: number,
    frameTime: number,
    deltaTime: number,
    progress: number,
    frame: T,
    animator: AnimationPlayback<T>,
}

interface SimpleTimeline<T>
{
    loop?: boolean,
    duration: number,
    frames: { [key: number]: T };
}

export interface Timeline<T>
{
    loop: boolean,
    duration: number,
    frames: Keyframe<T>[],
}
export function Timeline<T>(timeline: SimpleTimeline<T>): Timeline<T>
{
    const times = Object.keys(timeline.frames).map(t => ({ key: t, time: parseFloat(t) })).sort((a, b) => a.time - b.time);
    const output: Timeline<T> = {
        loop: timeline.loop || false,
        duration: timeline.duration,
        frames: []
    };
    for (const time of times)
    {
        output.frames.push({
            time: time.time,
            values: timeline.frames[time.key as unknown as number],
        });
    }
    return output;
}

type AnimationCallback<T> = (frame: AnimationFrameState<T>) => void;

export interface IPlayback<T>
{
    finished: boolean;
    play(): Promise<T>;
    stop(): void;
    update(dt: number): void;
}

export class AnimationPlayback<T> implements IPlayback<AnimationPlayback<T>>
{
    frameTime: number = 0;
    time: number = 0;
    timeScale = 1;
    updater: AnimationCallback<T> | null = null; 
    timeline: Timeline<T>;
    loop: boolean;
    state: "pending" | "playing" | "stopped" = "stopped";
    currentFrame: T = {} as any;
    duration: number;

    private resolver?: (t: this) => void;

    constructor(timeline: Timeline<T>, time = 0)
    {
        this.frameTime = time;
        this.timeline = timeline;
        this.loop = timeline.loop;
        this.duration = timeline.duration;
    }
    get playing() { return this.state === "playing" || this.state === "pending" }
    get finished() { return this.state === "stopped" }

    play(time = 0): Promise<this>
    {
        return new Promise((resolve) =>
        {
            this.resolver = resolve;
            this.frameTime = time;
            this.frameTime = time;
            this.state = "pending";
            if (this.timeline && this.timeline.frames.length > 0)
                Object.assign(this.currentFrame, this.timeline.frames[0].values);
        })
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
            time: this.time,
            frameTime: this.frameTime,
            progress: this.frameTime / this.duration
        });
    }

    private updateFrame()
    {
        if (this.timeline && this.timeline.frames.length > 0)
        {
            for (let i = 0; i < this.timeline.frames.length; i++)
            {
                if (this.timeline.frames[i].time >= this.frameTime)
                {
                    if (i === 0 || this.timeline.frames[i].time === this.frameTime)
                        Object.assign(this.currentFrame, this.timeline.frames[i].values);
                    else
                    {
                        this.interpolate(this.currentFrame, this.timeline.frames[i - 1], this.timeline.frames[i]);
                    }

                    return this.currentFrame;
                }
            }
            if (this.loop)
            {
                this.interpolate(this.currentFrame, this.timeline.frames[this.timeline.frames.length - 1], this.timeline.frames[0]);
            }
            else
            {
                Object.assign(this.currentFrame, this.timeline.frames[this.timeline.frames.length - 1].values);
            }
        }
    }

    private interpolate(frame: T, previous: Keyframe<T>, next: Keyframe<T>)
    {
        let t = (this.frameTime - previous.time) / (next.time - previous.time);
        if (next.time < previous.time)
            t = (this.frameTime - previous.time) / (this.timeline.duration + next.time - previous.time);
        for (const key in previous.values)
        {
            frame[key] = previous.values[key];
            if (typeof (previous.values[key]) === "number" && typeof (next.values[key]) === "number")
            {
                frame[key] = MathUtils.lerp(previous.values[key] as any, next.values[key] as any, t) as any;
            }
        }
        return frame;
    }

    private checkEnd()
    {
        if (this.time >= this.duration)
        {
            this.time = this.duration;
            this.state = "stopped";
            this.resolver?.(this);
        }
    }
}

class ProceduralPlayback implements IPlayback<void>
{
    currentTime: number = 0
    totalTime: number;
    state: "pending" | "playing" | "stopped" = "stopped";
    resolver?: () => void;
    updater?: (t: number) => void;
    constructor(time: number, updater?: (t: number) => void)
    {
        this.totalTime = time;
        this.updater = updater;
    }

    get finished() { return this.state === "stopped" }

    play(): Promise<void>
    {
        return new Promise(resolve =>
        {
            if (this.state === "stopped")
                this.state = "pending";
            this.resolver = resolve;
        });
    }
    stop(): void
    {
        this.resolver = undefined;
        this.state = "stopped";
    }
    update(dt: number): void
    {
        switch (this.state)
        {
            case "stopped":
                return;
            case "pending":
                this.state = "playing";
            case "playing":
                this.currentTime += dt;
                this.checkEnd();
                this.updater?.(this.currentTime / this.totalTime);
                break;
        }
    }

    private checkEnd()
    {
        if (this.currentTime >= this.totalTime)
        {
            this.currentTime = this.totalTime;
            this.state = "stopped";
            this.resolver?.();
        }
    }

}

interface AnimatorEvent<T>
{
    start(timeline: AnimationPlayback<T>, time: number): void,
    finish(timeline: AnimationPlayback<T>): void,
}

export class Animator<Frame = unknown>
{
    tracks: IPlayback<Frame>[] = [];

    play<T>(timeline: Timeline<T>, updater: AnimationCallback<T>, playDuration = timeline.duration, loop = timeline.loop, time = 0): Promise<AnimationPlayback<T>>
    {
        const playback = new AnimationPlayback(timeline, time);
        playback.loop = loop;
        playback.duration = playDuration;
        playback.updater = updater;
        const promise = playback.play(time);
        this.tracks.push(playback as any);
        return promise;
    }

    playProcedural(time: number, updater?: (t: number)=>void, startTime = 0): Promise<void>
    {
        const playback = new ProceduralPlayback(time, updater);
        playback.currentTime = startTime;
        const promise = playback.play();
        this.tracks.push(playback as any);
        return promise;
    }

    update(dt: number)
    {
        for (let i = 0; i < this.tracks.length; i++)
        {
            const playback = this.tracks[i];
            playback.update(dt);

            if (playback.finished)
            {
                this.tracks[i] = this.tracks[this.tracks.length - 1];
                this.tracks.length--;
                i--;
            }
        }
    }
}