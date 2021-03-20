import { Transform } from "./transform";
import { IAsset, AssetManager } from "zogra-renderer";
import { EventDefinitions, IEventSource, EventEmitter, EventKeys } from "zogra-renderer";
import { Time } from "./zogra-engine";
import { RenderContext } from "../render-pipeline/rp";

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
    protected removeRecursive(entity: T)
    {
        this.entityMap.delete(entity.assetID);
        for (const child of entity.children)
            this.removeRecursive(child as T);
    }
    remove(entity: T)
    {
        this.removeRecursive(entity);

        if (entity.parent)
        {
            entity.parent.children.delete(entity);
        }
        
        this._entities = Array.from(this.entityMap.values());
    }
}