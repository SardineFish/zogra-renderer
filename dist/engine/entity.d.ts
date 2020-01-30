import { Transform } from "./transform";
import { IAsset } from "../core/asset";
export declare class Entity extends Transform implements IAsset {
    assetID: number;
    name: string;
}
export declare class EntityManager<T extends Entity = Entity> {
    protected entityMap: Map<number, T>;
    protected _entities: Entity[];
    get entities(): Entity[];
    add(entity: T): void;
    remove(entity: T): void;
}
