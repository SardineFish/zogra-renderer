import { Transform } from "./transform";
import { IAsset, AssetManager, EventListener } from "zogra-renderer";
import { EventDefinitions, IEventSource, EventEmitter, EventKeys } from "zogra-renderer";
import { Time } from "./zogra-engine";
import { RenderContext } from "../render-pipeline/rp";
import { ICollider } from "../physics/physics-generic";
import { Scene } from "./scene";

export interface EntityEvents extends EventDefinitions
{
    "update": (entity: Entity, time: Time) => void;
}

export interface IEntity
{
    assetID: number;
    name: string;
    collider: ICollider | null;
}

export class Entity extends Transform implements IAsset, IEventSource<EntityEvents>, IEntity
{
    assetID: number = AssetManager.newAssetID(this);
    name: string = `Entity_${this.assetID}`;
    protected eventEmitter = new EventEmitter<EntityEvents>();
    protected destroyed: boolean = false;

    private _collider: ICollider | null = null;

    get collider() { return this._collider }
    set collider(value: ICollider | null)
    {
        if (this.scene && value)
            value.__bind(this, this.scene);
        if (this._collider && this._collider !== value)
            this._collider.__unbind();
        this._collider = value;
    }

    on<T extends EventKeys<EntityEvents>>(event: T, listener: EntityEvents[T]): void
    {
        return this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<EntityEvents>>(event: T, listener: EntityEvents[T]): void
    {
        this.eventEmitter.off(event, listener);
    }
    destroy()
    {
        this.destroyed = true;
        AssetManager.destroy(this.assetID);
    }

    /** @internal */
    __updateRecursive(time: Time)
    {
        type t = Parameters<EntityEvents["update"]>;
        this.eventEmitter.emit("update", this, time);
        for (const entity of this.children)
            (entity as Entity).__updateRecursive(time);
    }
    /** @internal */
    __addToScene(scene: Scene)
    {
        super.__addToScene(scene);
        this._collider?.__bind(this, scene);
    }
    /** @internal */
    __removeFromScene(scene: Scene)
    {
        super.__removeFromScene(scene);
        this._collider?.__unbindPhysics();
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