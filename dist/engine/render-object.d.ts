import { Mesh } from "../core/mesh";
import { Material } from "../core/core";
import { Entity, EntityEvents } from "./entity";
import { RenderContext, RenderData } from "../render-pipeline/rp";
import { IEventSource, EventKeys } from "../core/event";
interface RenderObjectEvents extends EntityEvents {
    "render": (obj: RenderObject, context: RenderContext, data: RenderData) => void;
}
export declare class RenderObject extends Entity implements IEventSource<RenderObjectEvents> {
    meshes: Mesh[];
    materials: Material[];
    constructor(ctx?: import("../core/global").GLContext);
    on<T extends EventKeys<RenderObjectEvents>>(event: T, listener: RenderObjectEvents[T]): void;
    off<T extends EventKeys<RenderObjectEvents>>(event: T, listener: RenderObjectEvents[T]): void;
    __onRender(context: RenderContext, data: RenderData): void;
}
export {};
