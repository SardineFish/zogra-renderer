import { Transform } from "./transform";
import { BufferStructure, DefaultVertexData, Mesh } from "zogra-renderer";
import { Material } from "zogra-renderer";
import { GlobalContext } from "zogra-renderer";
import { Entity, EntityEvents } from "./entity";
import { RenderContext, RenderData } from "../render-pipeline";
import { EventEmitter, IEventSource, EventKeys } from "zogra-renderer";

export interface RenderObjectEvents<
    VertexStruct extends BufferStructure = typeof DefaultVertexData,
    TMaterial extends Material<VertexStruct> = Material<VertexStruct>
> extends EntityEvents
{
    "render": (obj: RenderObject<VertexStruct, TMaterial>, context: RenderContext, data: RenderData) => void;
}

export class RenderObject<
    VertexStruct extends BufferStructure = typeof DefaultVertexData,
    TMaterial extends Material<VertexStruct> = Material<VertexStruct>
> extends Entity implements IEventSource<RenderObjectEvents<VertexStruct, TMaterial>>
{
    meshes: Mesh<VertexStruct>[] = [];
    materials: TMaterial[] = [];
    constructor(ctx = GlobalContext())
    {
        super();
        (this.materials as unknown as Material<typeof DefaultVertexData>[]) = [ctx.assets.materials.default];
    }
    on<T extends EventKeys<RenderObjectEvents<VertexStruct, TMaterial>>>(event: T, listener: RenderObjectEvents<VertexStruct, TMaterial>[T])
    {
        this.eventEmitter.with<RenderObjectEvents<VertexStruct, TMaterial>>().on(event, listener);
    }
    off<T extends EventKeys<RenderObjectEvents<VertexStruct, TMaterial>>>(event: T, listener: RenderObjectEvents<VertexStruct, TMaterial>[T])
    {
        this.eventEmitter.with<RenderObjectEvents<VertexStruct, TMaterial>>().off(event, listener);
    }

    /** @internal */
    render(context: RenderContext, data: RenderData)
    {
        this.eventEmitter.with<RenderObjectEvents<VertexStruct, TMaterial>>().emit("render", this, context, data);

        for (let i = 0; i < this.meshes.length; i++)
        {
            context.renderer.drawMesh(this.meshes[i], this.localToWorldMatrix, this.materials[i]);
        }
    }
}