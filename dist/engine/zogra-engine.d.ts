import { Scene } from "./scene";
import { ZograRenderPipeline, ZograRenderPipelineConstructor } from "../render-pipeline/render-pipeline";
import { Camera } from "./camera";
import { ZograRenderer } from "../core/core";
import { EventEmitter } from "./event";
export interface Time {
    time: Readonly<number>;
    deltaTime: Readonly<number>;
}
interface ZograEngineEvents {
    update: (t: Time) => void;
    render: (cameras: Camera[]) => void;
    start: () => void;
    stop: () => void;
}
export declare class ZograEngine {
    scene: Scene;
    renderer: ZograRenderer;
    renderPipeline: ZograRenderPipeline;
    eventEmitter: EventEmitter;
    private _time;
    get time(): Readonly<Time>;
    constructor(canvas: HTMLCanvasElement, RenderPipeline?: ZograRenderPipelineConstructor);
    renderScene(): void;
    private updateEntities;
    start(): void;
    on<T extends keyof ZograEngineEvents>(event: T, listener: ZograEngineEvents[T]): void;
    off<T extends keyof ZograEngineEvents>(event: T, listener: ZograEngineEvents[T]): void;
    emit<T extends keyof ZograEngineEvents>(event: T, ...args: Parameters<ZograEngineEvents[T]>): void;
}
export {};
