import { Scene } from "./scene";
import { ZograRenderPipeline } from "../render-pipeline/render-pipeline";
import { Camera } from "./camera";
import { ZograRenderer } from "../core/core";
import { EventTrigger } from "./event";
interface Time {
    time: number;
    deltaTime: number;
}
interface ZograEngineEvents {
    update: (t: Time) => void;
    render: (t: Time, cameras: Camera[]) => void;
}
export declare class ZograEngine {
    scene: Scene;
    renderer: ZograRenderer;
    renderPipeline: ZograRenderPipeline;
    eventEmitter: EventTrigger;
    constructor(canvas: HTMLCanvasElement, renderPipeline?: ZograRenderPipeline);
    renderScene(): void;
    start(): void;
    on<T extends keyof ZograEngineEvents>(event: T, listener: ZograEngineEvents[T]): void;
    off<T extends keyof ZograEngineEvents>(event: T, listener: ZograEngineEvents[T]): void;
    emit<T extends keyof ZograEngineEvents>(event: T, ...args: Parameters<ZograEngineEvents[T]>): void;
}
export {};
