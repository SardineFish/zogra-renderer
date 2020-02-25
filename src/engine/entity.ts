import { Transform } from "./transform";
import { IAsset, AssetManager } from "../core/asset";
import { EventDefinitions, IEventSource, EventEmitter, EventKeys } from "../core/event";
import { Time } from "./zogra-engine";

export interface EntityEvents extends EventDefinitions
{
    "update": (entity: Entity, time: Time) => void;    
}

export interface IEntity
{
    assetID: number;
    name: string;
}

export class Entity extends Transform implements IAsset, IEventSource<EntityEvents>, IEntity
{
    assetID: number = AssetManager.newAssetID(this);
    name: string = `Entity_${this.assetID}`;
    protected eventEmitter = new EventEmitter<EntityEvents>();
    protected destroyed: boolean = false;
    on<T extends EventKeys<EntityEvents>>(event: T, listener: EntityEvents[T]): void
    {
        return this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<EntityEvents>>(event: T, listener: EntityEvents[T]): void
    {
        this.eventEmitter.off(event, listener);
    }
    __updateRecursive(time: Time)
    {
        type t = Parameters<EntityEvents["update"]>;
        this.eventEmitter.emit("update", this, time);
        for (const entity of this.children)
            (entity as Entity).__updateRecursive(time);
    }
    destroy()
    {
        this.destroyed = true;
        AssetManager.destroy(this.assetID);
    }
}

export class EntityManager<T extends Entity = Entity>
{
    protected entityMap: Map<number, T> = new Map();
    protected _entities: Entity[] = [];
    get entities() { return this._entities; }
    add(entity: T)
    {
        this.entityMap.set(entity.assetID, entity);
        this._entities = Array.from(this.entityMap.values());
    }
    remove(entity: T)
    {
        this.entityMap.delete(entity.assetID);
        this._entities = Array.from(this.entityMap.values());
    }
}