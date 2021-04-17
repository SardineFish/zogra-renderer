import { Scene } from "./scene";
import { ZograRenderPipeline, ZograRenderPipelineConstructor } from "../render-pipeline/rp";
import { Camera } from "./camera";
import { ZograRenderer } from "zogra-renderer";
import { EventEmitter, IEventSource, EventKeys } from "zogra-renderer";
interface GameTime {
    time: Readonly<number>;
    deltaTime: Readonly<number>;
}
export declare type Time = Readonly<GameTime>;
interface ZograEngineEvents {
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
    get time(): Time;
    get scene(): Scene<import("../physics/physics-generic").IPhysicsSystem>;
    set scene(value: Scene<import("../physics/physics-generic").IPhysicsSystem>);
    constructor(canvas: HTMLCanvasElement, RenderPipeline?: ZograRenderPipelineConstructor);
    renderScene(): void;
    start(): void;
    on<T extends EventKeys<ZograEngineEvents>>(event: T, listener: ZograEngineEvents[T]): void;
    off<T extends EventKeys<ZograEngineEvents>>(event: T, listener: ZograEngineEvents[T]): void;
}
export {};
