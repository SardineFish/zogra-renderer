import { Transform } from "./transform";
import { IAsset } from "zogra-renderer";
import { IEventSource, EventEmitter, EventKeys } from "zogra-renderer";
import { Time } from "./zogra-engine";
import { ICollider } from "../physics/physics-generic";
export interface EntityEvents {
    update(entity: Entity, time: Time): void;
    start(entity: Entity, time: Time): void;
    exit(entity: Entity, time: Time): void;
}
export interface IEntity {
    assetID: number;
    name: string;
    collider: ICollider | null;
}
export declare class Entity extends Transform implements IAsset, IEventSource<EntityEvents>, IEntity {
    assetID: number;
    name: string;
    protected eventEmitter: EventEmitter<EntityEvents>;
    protected destroyed: boolean;
    private _collider;
    get collider(): ICollider | null;
    set collider(value: ICollider | null);
    on<T extends EventKeys<EntityEvents>>(event: T, listener: EntityEvents[T]): void;
    off<T extends EventKeys<EntityEvents>>(event: T, listener: EntityEvents[T]): void;
    destroy(): void;
    protected start(time: Time): void;
    protected update(time: Time): void;
    protected exit(time: Time): void;
}
export declare class EntityManager<T extends Entity = Entity> {
    protected entityMap: Map<number, T>;
    protected _entities: Entity[];
    get entities(): Entity[];
    add(entity: T): void;
    protected removeRecursive(entity: T): void;
    remove(entity: T): void;
}
