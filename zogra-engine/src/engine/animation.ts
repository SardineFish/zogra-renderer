import { EventEmitter, EventKeys, MathUtils } from "zogra-renderer";

export interface Keyframe<T>
{
    time: number,
    values: T,
}

interface AnimationFrameState<Frame, Target>
{
    time: number,
    frameTime: number,
    deltaTime: number,
    progress: number,
    frame: Frame,
    target?: Target,
    animator: AnimationPlayback<Frame, Target>,
}

interface SimpleTimeline<Frame, Target = unknown>
{
    loop?: boolean,
    duration: number,
    frames: { [key: number]: Frame },
    updater?: SimpleUpdater<Frame, Target>,
}

type SimpleUpdater<Frame, Target> = (frame: Frame, target: Target) => void;

export interface Timeline<Frame, Target = unknown>
{
    loop: boolean,
    duration: number,
    frames: Keyframe<Frame>[],
    updater?: SimpleUpdater<Frame, Target>,
}
export function Timeline<Frame, Target = unknown>(timeline: SimpleTimeline<Frame, Target>): Timeline<Frame, Target>
{
    const times = Object.keys(timeline.frames).map(t => ({ key: t, time: parseFloat(t) })).sort((a, b) => a.time - b.time);
    const output: Timeline<Frame, Target> = {
        loop: timeline.loop || false,
        duration: timeline.duration,
        frames: [],
        updater: timeline.updater,
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

type AnimationCallback<Frame, Target> = (frame: AnimationFrameState<Frame, Target>) => void;

export interface IPlayback<T>
{
    finished: boolean;
    play(): Promise<T>;
    stop(): void;
    update(dt: number): void;
    reject(): void;
}

export class AnimationPlayback<Frame, Target> implements IPlayback<AnimationPlayback<Frame, Target>>
{
    frameTime: number = 0;
    time: number = 0;
    timeScale = 1;
    target: Target | undefined = undefined;
    updater: AnimationCallback<Frame, Target> | undefined = undefined; 
    timeline: Timeline<Frame, Target>;
    loop: boolean;
    state: "pending" | "playing" | "stopped" = "stopped";
    currentFrame: Frame = {} as any;
    duration: number;

    private resolver?: (t: this) => void;
    private rejector?: () => void;

    constructor(timeline: Timeline<Frame, Target>, target?: Target, updater?: AnimationCallback<Frame, Target>)
    {
        this.frameTime = 0;
        this.timeline = timeline;
        this.loop = timeline.loop;
        this.duration = timeline.duration;
        this.target = target;
        this.updater = updater;
        if (!this.updater && target && timeline.updater)
        {
            this.updater = (frame) =>
            {
                (timeline.updater as SimpleUpdater<Frame, Target>)(frame.frame, target);
            }
        }
    }
    get playing() { return this.state === "playing" || this.state === "pending" }
    get finished() { return this.state === "stopped" }

    play(time = 0): Promise<this>
    {
        return new Promise((resolve, reject) =>
        {
            this.resolver = resolve;
            this.rejector = reject;
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

    reject()
    {
        this.rejector?.();
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
            target: this.target,
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

    private interpolate(frame: Frame, previous: Keyframe<Frame>, next: Keyframe<Frame>)
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
    rejector?: () => void;
    updater?: (t: number) => void;
    constructor(time: number, updater?: (t: number) => void)
    {
        this.totalTime = time;
        this.updater = updater;
    }

    get finished() { return this.state === "stopped" }

    play(): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            this.rejector = reject;
            this.resolver = resolve;
            if (this.state === "stopped")
                this.state = "pending";
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
    reject()
    {
        this.rejector?.();
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

interface AnimatorEvent<T, Target>
{
    start(timeline: AnimationPlayback<T, Target>, time: number): void,
    finish(timeline: AnimationPlayback<T, Target>): void,
}

export interface AnimationPlaybackOptions<Frame, Target = unknown>
{
    updater: AnimationCallback<Frame, Target>,
    playDuration: number,
    loop: boolean,
    startTime: number,
}

export class Animator<AnimatorFrame = unknown, AnimatorTarget = undefined>
{
    defaultTarget: AnimatorTarget | undefined;
    tracks: IPlayback<unknown>[] = [];

    constructor(target?: AnimatorTarget)
    {
        this.defaultTarget = target;
    }

    play<Frame = AnimatorFrame, Target = AnimatorTarget>(
        timeline: Timeline<Frame, Target>,
        target: Target = this.defaultTarget as unknown as Target,
        duration: number = timeline.duration,
        updater?: AnimationCallback<Frame, Target>
    ): Promise<AnimationPlayback<Frame, Target>>
    {
        const playback = new AnimationPlayback<Frame, Target>(timeline, target, updater);
        playback.duration = duration;
        const promise = playback.play();
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

    wait(time: number, callback: () => void)
    {
        const playback = new ProceduralPlayback(time);
        const promise = playback.play();
        this.tracks.push(playback);
        promise.then(callback);
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

    clear()
    {
        for (const track of this.tracks)
            track.reject();
        this.tracks.length = 0;
    }
}