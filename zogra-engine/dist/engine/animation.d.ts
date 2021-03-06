export interface Keyframe<T> {
    time: number;
    values: T;
}
interface AnimationFrameState<Frame, Target> {
    time: number;
    frameTime: number;
    deltaTime: number;
    progress: number;
    frame: Frame;
    target?: Target;
    animator: AnimationPlayback<Frame, Target>;
}
interface SimpleTimeline<Frame, Target = unknown> {
    loop?: boolean;
    duration: number;
    frames: {
        [key: number]: Frame;
    };
    updater?: SimpleUpdater<Frame, Target>;
}
declare type SimpleUpdater<Frame, Target> = (frame: Frame, target: Target) => void;
export interface Timeline<Frame, Target = unknown> {
    loop: boolean;
    duration: number;
    frames: Keyframe<Frame>[];
    updater?: SimpleUpdater<Frame, Target>;
}
export declare function Timeline<Frame, Target = unknown>(timeline: SimpleTimeline<Frame, Target>): Timeline<Frame, Target>;
declare type AnimationCallback<Frame, Target> = (frame: AnimationFrameState<Frame, Target>) => void;
export interface IPlayback<T> {
    finished: boolean;
    play(): Promise<T>;
    stop(): void;
    update(dt: number): void;
    reject(): void;
}
export declare class AnimationPlayback<Frame, Target> implements IPlayback<AnimationPlayback<Frame, Target>> {
    frameTime: number;
    time: number;
    timeScale: number;
    target: Target | undefined;
    updater: AnimationCallback<Frame, Target> | undefined;
    timeline: Timeline<Frame, Target>;
    loop: boolean;
    state: "pending" | "playing" | "stopped";
    currentFrame: Frame;
    duration: number;
    private resolver?;
    private rejector?;
    constructor(timeline: Timeline<Frame, Target>, target?: Target, updater?: AnimationCallback<Frame, Target>);
    get playing(): boolean;
    get finished(): boolean;
    play(time?: number): Promise<this>;
    stop(): void;
    update(dt: number): void;
    reject(): void;
    private updateAnimation;
    private updateFrame;
    private interpolate;
    private checkEnd;
}
export interface AnimationPlaybackOptions<Frame, Target = unknown> {
    updater: AnimationCallback<Frame, Target>;
    playDuration: number;
    loop: boolean;
    startTime: number;
}
export declare class Animator<AnimatorFrame = unknown, AnimatorTarget = undefined> {
    defaultTarget: AnimatorTarget | undefined;
    tracks: Array<IPlayback<unknown> | undefined>;
    constructor(target?: AnimatorTarget);
    playOn<Frame = AnimatorFrame, Target = AnimatorTarget>(track: number, timeline: Timeline<Frame, Target>, target?: Target, duration?: number, updater?: AnimationCallback<Frame, Target>): Promise<AnimationPlayback<Frame, Target>>;
    play<Frame = AnimatorFrame, Target = AnimatorTarget>(timeline: Timeline<Frame, Target>, target?: Target, duration?: number, updater?: AnimationCallback<Frame, Target>): Promise<AnimationPlayback<Frame, Target>>;
    playProceduralOn(track: number, time: number, updater?: (t: number, dt: number) => void, startTime?: number): Promise<void>;
    playProcedural(time: number, updater?: (t: number, dt: number) => void, startTime?: number): Promise<void>;
    wait(time: number, callback: () => void): void;
    update(dt: number): void;
    clear(): void;
}
export {};
