export interface Keyframe<T> {
    time: number;
    keyframe: T;
}
interface AnimationFrameState<T> {
    time: number;
    deltaTime: number;
    progress: number;
    frame: T;
    animator: Animator<T>;
}
export declare type Timeline<T> = Keyframe<T>[];
declare type AnimationCallback<T> = (frame: AnimationFrameState<T>) => void;
export declare class Animator<T = {}> {
    time: number;
    duration: number;
    timeScale: number;
    callback: AnimationCallback<T> | null;
    timeline: Timeline<T> | null;
    loop: boolean;
    state: "pending" | "playing" | "stopped";
    currentFrame: T;
    constructor(duration: number, timeline?: Timeline<T> | null, time?: number);
    get playing(): boolean;
    get finished(): boolean;
    play(time?: number): void;
    stop(): void;
    update(dt: number): void;
    private updateAnimation;
    private updateFrame;
    private interpolate;
    private checkEnd;
}
export {};
