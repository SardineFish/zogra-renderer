import { Scene } from "./scene";
import { ZograRenderPipeline, ZograRenderPipelineConstructor } from "../render-pipeline/render-pipeline";
import { PreviewRenderer } from "../render-pipeline/preview-renderer";
import { Camera } from "./camera";
import { ZograRenderer } from "../core/core";
import { EventEmitter } from "../core/event";

export interface Time
{
    time: Readonly<number>,
    deltaTime: Readonly<number>,
}

interface ZograEngineEvents
{
    update: (t: Time) => void;
    render: (cameras: Camera[]) => void;
    start: () => void;
    stop: () => void;
}

export class ZograEngine
{
    scene: Scene;
    renderer: ZograRenderer;
    renderPipeline: ZograRenderPipeline;
    eventEmitter: EventEmitter;
    private _time: Time = { deltaTime: 0, time: 0 };
    get time(): Readonly<Time> { return this._time; }
    constructor(canvas:HTMLCanvasElement, RenderPipeline: ZograRenderPipelineConstructor = PreviewRenderer)
    {
        this.renderer = new ZograRenderer(canvas, canvas.width, canvas.height);
        this.renderPipeline = new RenderPipeline(this.renderer);
        this.scene = new Scene();
        this.eventEmitter = new EventEmitter();
    }
    renderScene()
    {
        const cameras = this.scene.getEntitiesOfType(Camera);
        this.renderPipeline.render({
            renderer: this.renderer,
            scene: this.scene
        }, cameras);
    }
    private updateEntities(time: Time)
    {
        const entities = this.scene.rootEntities();
        for (const entity of entities)
            entity.__updateRecursive(time);
    }
    start()
    {
        let previousDelay = 0;
        let startDelay = 0;
        const update = (delay: number) =>
        {
            if (previousDelay === 0)
            {
                startDelay = previousDelay = delay;
                requestAnimationFrame(update);
                return;
            }

            const time = (delay - startDelay) / 1000;
            const dt = (delay - previousDelay) / 1000;
            previousDelay = delay;
            const t: Time = {
                time: time,
                deltaTime: dt
            };
            this._time = t;
            this.emit("update", t);
            this.updateEntities(t);
            this.emit("render", this.scene.getEntitiesOfType(Camera));

            this.renderScene();

            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
    on<T extends keyof ZograEngineEvents>(event: T, listener: ZograEngineEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    off<T extends keyof ZograEngineEvents>(event: T, listener: ZograEngineEvents[T])
    {
        this.eventEmitter.off(event, listener);
    }
    emit<T extends keyof ZograEngineEvents>(event: T, ...args: Parameters<ZograEngineEvents[T]>)
    {
        this.eventEmitter.emit(event, ...args);
    }
    
}