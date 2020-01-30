import { Transform } from "./transform";
import { IAsset, AssetManager } from "../core/asset";


export class Entity extends Transform implements IAsset
{
    assetID: number = AssetManager.newAssetID();
    name: string = `Entity_${this.assetID}`;
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