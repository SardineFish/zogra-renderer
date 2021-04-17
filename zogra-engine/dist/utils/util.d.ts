export interface Into<T> {
    into<T>(): T;
}
export declare type ConstructorType<T, TArgs extends any[] = any[]> = new (...args: TArgs) => T;
export declare class DoubleBuffer<T> {
    private currentIdx;
    private buffers;
    get current(): T;
    set current(value: T);
    get back(): T;
    set back(value: T);
    constructor(init: () => T);
    update(): void;
}
export declare class Animator {
    time: number;
    duration: number;
    timeScale: number;
    callback: (progress: number, animator: Animator) => void;
    state: "pending" | "playing" | "stopped";
    constructor(callback: (progress: number, animator: Animator) => void, duration: number, time?: number);
    get playing(): boolean;
    get finished(): boolean;
    play(time?: number): void;
    stop(): void;
    update(dt: number): void;
    private checkEnd;
}
