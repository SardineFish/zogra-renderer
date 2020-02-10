import { ZograEngine, Camera, vec3, Entity, rgb, EventEmitter, EventDefinitions, IEventSource, EventKeys } from "zogra-renderer";
import { initCamera } from "./camera-controller";
import { initScene } from "./sample-scene";

interface ZograEditorEvents extends EventDefinitions
{
    "selectchange": (selections: Entity[]) => void;
}

export class ZograEditor implements IEventSource<ZograEditorEvents>
{
    engine: ZograEngine;
    eventEmitter = new EventEmitter<ZograEditorEvents>();
    constructor(engine: ZograEngine)
    {
        this.engine = engine;
    }
    init()
    {
        this.engine.start();
        initCamera(this);
        initScene(this.engine);
    }
    selectEntities(entities: Entity[])
    {
        this.eventEmitter.emit("selectchange", entities);
    }
    on<T extends EventKeys<ZograEditorEvents>>(event: T, listener: ZograEditorEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<ZograEditorEvents>>(event: T, listener: ZograEditorEvents[T])
    {
        this.eventEmitter.off(event, listener);
    }
}
