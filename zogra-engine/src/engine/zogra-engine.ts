import { Scene } from "./scene";
import { ZograRenderPipeline, ZograRenderPipelineConstructor, PreviewRenderer } from "../render-pipeline/rp";
import { Camera } from "./camera";
import { ZograRenderer } from "zogra-renderer";
import { EventEmitter, EventDefinitions, IEventSource, EventKeys } from "zogra-renderer";
import { UnknownPhysics } from "../physics/physics-generic";
import { ConstructorType } from "../utils/util";

interface GameTime
{
    time: Readonly<number>,
    deltaTime: Readonly<number>,
}

export type Time = Readonly<GameTime>;

interface ZograEngineEvents
{
    update: (t: Time) => void;
    render: (cameras: Camera[]) => void;
    start: () => void;
    stop: () => void;
    "scene-change": (scene: Scene, previous: Scene) => void;
}

export class ZograEngine<RenderPipeline extends ZograRenderPipeline = PreviewRenderer> implements IEventSource<ZograEngineEvents>
{
    private _scene: Scene;
    renderer: ZograRenderer;
    renderPipeline: RenderPipeline;
    eventEmitter: EventEmitter<ZograEngineEvents>;
    fixedDeltaTime = false;
    private _time: Time = { deltaTime: 0, time: 0 };
    get time(): Time { return this._time; }
    get scene() { return this._scene }
    set scene(value)
    {
        const previous = this._scene;
        this._scene = value;
        this.eventEmitter.emit("scene-change", value, previous);
    }
    constructor(canvas:HTMLCanvasElement, RenderPipeline: ConstructorType<RenderPipeline, [ZograRenderer]> = PreviewRenderer as any)
    {
        this.renderer = new ZograRenderer(canvas, canvas.width, canvas.height);
        this.renderPipeline = new RenderPipeline(this.renderer);
        this._scene = new Scene(UnknownPhysics);
        this.eventEmitter = new EventEmitter();
    }
    renderScene()
    {
        const cameras = this.scene.getEntitiesOfType(Camera);
        this.renderPipeline.render({
            renderer: this.renderer
        }, this.scene, cameras);
    }
    start()
    {
        let previousDelay = 0;
        let startDelay = 0;
        let currentTime = 0;
        const update = (delay: number) =>
        {
            if (previousDelay === 0)
            {
                startDelay = previousDelay = delay;
                requestAnimationFrame(update);
                return;
            }

            if (this.fixedDeltaTime)
                currentTime += 16;
            else
                currentTime = delay;
            const time = (currentTime - startDelay) / 1000;
            const dt = (currentTime - previousDelay) / 1000;
            previousDelay = currentTime;
            const t: Time = {
                time: time,
                deltaTime: dt
            };
            this._time = t;
            this.eventEmitter.emit("update", t);
            this.scene.__update(t);
            this.eventEmitter.emit("render", this.scene.getEntitiesOfType(Camera));

            this.renderScene();

            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
    on<T extends EventKeys<ZograEngineEvents>>(event: T, listener: ZograEngineEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<ZograEngineEvents>>(event: T, listener: ZograEngineEvents[T])
    {
        this.eventEmitter.off(event, listener);
    }
    /*emit<T extends keyof ZograEngineEvents>(event: T, ...args: Parameters<ZograEngineEvents[T]>)
    {
        this.eventEmitter.emit(event, ...args);
    }*/
    
}