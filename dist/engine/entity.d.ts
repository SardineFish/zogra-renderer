import { Transform } from "./transform";
import { IAsset } from "../core/asset";
import { EventDefinitions, IEventSource, EventTrigger, EventKeys } from "./event";
import { Time } from "./zogra-engine";
export interface EntityEvents extends EventDefinitions {
    "update": (entity: Entity, time: Time) => void;
}
export interface IEntity {
    assetID: number;
    name: string;
}
export declare class Entity extends Transform implements IAsset, IEventSource<EntityEvents>, IEntity {
    assetID: number;
    name: string;
    protected eventEmitter: EventTrigger<EntityEvents>;
    on<T extends EventKeys<EntityEvents>>(event: T, listener: EntityEvents[T]): void;
    off<T extends EventKeys<EntityEvents>>(event: T, listener: EntityEvents[T]): void;
    __updateRecursive(time: Time): void;
}
export declare class EntityManager<T extends Entity = Entity> {
    protected entityMap: Map<number, T>;
    protected _entities: Entity[];
    get entities(): Entity[];
    add(entity: T): void;
    remove(entity: T): void;
}
