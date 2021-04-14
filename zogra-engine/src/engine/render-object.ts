import { Transform } from "./transform";
import { Mesh } from "zogra-renderer";
import { Material } from "zogra-renderer";
import { GlobalContext } from "zogra-renderer";
import { Entity, EntityEvents } from "./entity";
import { RenderContext, RenderData } from "../render-pipeline/rp";
import { EventEmitter, IEventSource, EventKeys } from "zogra-renderer";

export interface RenderObjectEvents extends EntityEvents
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
        this.eventEmitter.with<RenderObjectEvents>().on(event, listener);
    }
    off<T extends EventKeys<RenderObjectEvents>>(event: T, listener: RenderObjectEvents[T])
    {
        this.eventEmitter.with<RenderObjectEvents>().off(event, listener);
    }

    /** @internal */
    render(context: RenderContext, data: RenderData)
    {
        this.eventEmitter.with<RenderObjectEvents>().emit("render", this, context, data);

        for (let i = 0; i < this.meshes.length; i++)
        {
            context.renderer.drawMesh(this.meshes[i], this.localToWorldMatrix, this.materials[i]);
        }
    }
}