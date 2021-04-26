export interface Keyframe<T> {
    time: number;
    values: T;
}
interface AnimationFrameState<T> {
    time: number;
    frameTime: number;
    deltaTime: number;
    progress: number;
    frame: T;
    animator: AnimationPlayback<T>;
}
interface SimpleTimeline<T> {
    loop?: boolean;
    duration: number;
    frames: {
        [key: number]: T;
    };
}
export interface Timeline<T> {
    loop: boolean;
    duration: number;
    frames: Keyframe<T>[];
}
export declare function Timeline<T>(timeline: SimpleTimeline<T>): Timeline<T>;
declare type AnimationCallback<T> = (frame: AnimationFrameState<T>) => void;
export interface IPlayback<T> {
    finished: boolean;
    play(): Promise<T>;
    stop(): void;
    update(dt: number): void;
}
export declare class AnimationPlayback<T> implements IPlayback<AnimationPlayback<T>> {
    frameTime: number;
    time: number;
    timeScale: number;
    updater: AnimationCallback<T> | null;
    timeline: Timeline<T>;
    loop: boolean;
    state: "pending" | "playing" | "stopped";
    currentFrame: T;
    duration: number;
    private resolver?;
    constructor(timeline: Timeline<T>, time?: number);
    get playing(): boolean;
    get finished(): boolean;
    play(time?: number): Promise<this>;
    stop(): void;
    update(dt: number): void;
    private updateAnimation;
    private updateFrame;
    private interpolate;
    private checkEnd;
}
export declare class Animator<Frame = unknown> {
    tracks: IPlayback<Frame>[];
    play<T>(timeline: Timeline<T>, updater: AnimationCallback<T>, playDuration?: number, loop?: boolean, time?: number): Promise<AnimationPlayback<T>>;
    playProcedural(time: number, updater?: (t: number) => void, startTime?: number): Promise<void>;
    update(dt: number): void;
}
export {};
