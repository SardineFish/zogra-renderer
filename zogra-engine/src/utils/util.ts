import { Time } from "../engine/zogra-engine";

export interface Into<T>
{
    into<T>(): T;
}

export type ConstructorType<T, TArgs extends any[] = any[]> = new (...args: TArgs) => T;

export class DoubleBuffer<T>
{
    private currentIdx = 0;
    private buffers: T[];
    get current() { return this.buffers[this.currentIdx % 2] }
    set current(value: T) { this.buffers[this.currentIdx % 2] = value}
    get back() { return this.buffers[(this.currentIdx + 1) % 2] }
    set back(value: T) { this.buffers[(this.currentIdx + 1) % 2] = value }
    
    constructor(init: () => T)
    {
        this.buffers = [init(), init()];
    }
    update()
    {
        this.currentIdx++;
    }
}

export class Animator
{
    time: number;
    duration: number;
    timeScale = 1;
    callback: (progress: number, animator: Animator) => void;
    state: "pending" | "playing" | "stopped" = "pending";

    constructor(callback: (progress: number, animator: Animator) => void, duration: number, time = 0)
    {
        this.duration = duration;
        this.time = time;
        this.callback = callback;
    }
    get playing() { return this.state === "playing" || this.state === "pending" }
    get finished() { return this.state === "stopped" }

    play(time = 0)
    {
        this.time = 0;
        this.state = "pending";
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
                this.callback(this.time / this.duration, this);
                break;
            case "playing":
                this.time += dt * this.timeScale;
                this.checkEnd();
                this.callback(this.time / this.duration, this);
                break;
        }
    }

    private checkEnd()
    {
        if (this.time >= this.duration)
        {
            this.time = this.duration;
            this.state = "stopped";
        }
    }
}