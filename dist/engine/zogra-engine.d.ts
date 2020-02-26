import { Scene } from "./scene";
import { ZograRenderPipeline, ZograRenderPipelineConstructor } from "../render-pipeline/render-pipeline";
import { Camera } from "./camera";
import { ZograRenderer } from "../core/core";
import { EventEmitter, EventDefinitions, IEventSource, EventKeys } from "../core/event";
export interface Time {
    time: Readonly<number>;
    deltaTime: Readonly<number>;
}
interface ZograEngineEvents extends EventDefinitions {
    update: (t: Time) => void;
    render: (cameras: Camera[]) => void;
    start: () => void;
    stop: () => void;
    "scene-change": (scene: Scene, previous: Scene) => void;
}
export declare class ZograEngine implements IEventSource<ZograEngineEvents> {
    private _scene;
    renderer: ZograRenderer;
    renderPipeline: ZograRenderPipeline;
    eventEmitter: EventEmitter<ZograEngineEvents>;
    private _time;
    get time(): Readonly<Time>;
    get scene(): Scene;
    set scene(value: Scene);
    constructor(canvas: HTMLCanvasElement, RenderPipeline?: ZograRenderPipelineConstructor);
    renderScene(): void;
    private updateEntities;
    start(): void;
    on<T extends EventKeys<ZograEngineEvents>>(event: T, listener: ZograEngineEvents[T]): void;
    off<T extends EventKeys<ZograEngineEvents>>(event: T, listener: ZograEngineEvents[T]): void;
}
export {};
