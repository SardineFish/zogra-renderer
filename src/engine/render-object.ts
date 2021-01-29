import { Transform } from "./transform";
import { Mesh } from "../core/mesh";
import { Material } from "../core/core";
import { GlobalContext } from "../core/global";
import { Entity, EntityEvents } from "./entity";
import { RenderContext, RenderData } from "../render-pipeline/rp";
import { EventEmitter, IEventSource, EventKeys } from "../core/event";

interface RenderObjectEvents extends EntityEvents
{
    "render": (obj: RenderObject, context: RenderContext, data: RenderData) => void;
}

export class RenderObject extends Entity implements IEventSource<RenderObjectEvents>
{
    meshes: Mesh[] = [];
    materials: Material[] = [];
    constructor(ctx = GlobalContext())
    {
        super();
        this.materials = [ctx.assets.materials.default];
    }
    on<T extends EventKeys<RenderObjectEvents>>(event: T, listener: RenderObjectEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<RenderObjectEvents>>(event: T, listener: RenderObjectEvents[T])
    {
        this.eventEmitter.off(event, listener);
    }
    __onRender(context: RenderContext, data: RenderData)
    {
        this.eventEmitter.emit("render", this, context, data);
    }
}