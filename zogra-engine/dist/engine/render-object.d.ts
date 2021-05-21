import { BufferStructure, DefaultVertexData, Mesh } from "zogra-renderer";
import { Material } from "zogra-renderer";
import { Entity, EntityEvents } from "./entity";
import { RenderContext, RenderData } from "../render-pipeline";
import { IEventSource, EventKeys } from "zogra-renderer";
export interface RenderObjectEvents<VertexStruct extends BufferStructure = typeof DefaultVertexData, TMaterial extends Material<VertexStruct> = Material<VertexStruct>> extends EntityEvents {
    "render": (obj: RenderObject<VertexStruct, TMaterial>, context: RenderContext, data: RenderData) => void;
}
export declare class RenderObject<VertexStruct extends BufferStructure = typeof DefaultVertexData, TMaterial extends Material<VertexStruct> = Material<VertexStruct>> extends Entity implements IEventSource<RenderObjectEvents<VertexStruct, TMaterial>> {
    meshes: Mesh<VertexStruct>[];
    materials: TMaterial[];
    constructor(ctx?: import("zogra-renderer").GLContext);
    on<T extends EventKeys<RenderObjectEvents<VertexStruct, TMaterial>>>(event: T, listener: RenderObjectEvents<VertexStruct, TMaterial>[T]): void;
    off<T extends EventKeys<RenderObjectEvents<VertexStruct, TMaterial>>>(event: T, listener: RenderObjectEvents<VertexStruct, TMaterial>[T]): void;
}
