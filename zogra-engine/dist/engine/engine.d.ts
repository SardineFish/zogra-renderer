import { Scene } from "./scene";
import { ZograRenderPipeline, PreviewRenderer } from "../render-pipeline";
import { Camera } from "./camera";
import { ZograRenderer } from "zogra-renderer";
import { EventEmitter, IEventSource, EventKeys } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
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
export declare class ZograEngine<RenderPipeline extends ZograRenderPipeline = PreviewRenderer> implements IEventSource<ZograEngineEvents> {
    private _scene;
    renderer: ZograRenderer;
    renderPipeline: RenderPipeline;
    eventEmitter: EventEmitter<ZograEngineEvents>;
    fixedDeltaTime: boolean;
    private _time;
    get time(): Time;
    get scene(): Scene<import("../physics/physics-generic").IPhysicsSystem>;
    set scene(value: Scene<import("../physics/physics-generic").IPhysicsSystem>);
    constructor(canvas: HTMLCanvasElement, RenderPipeline?: ConstructorType<RenderPipeline, [ZograRenderer]>);
    renderScene(): void;
    start(): void;
    update(time: Readonly<Time>): void;
    on<T extends EventKeys<ZograEngineEvents>>(event: T, listener: ZograEngineEvents[T]): void;
    off<T extends EventKeys<ZograEngineEvents>>(event: T, listener: ZograEngineEvents[T]): void;
}
export {};
