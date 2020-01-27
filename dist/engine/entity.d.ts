import { Transform } from "./transform";
export declare class Entity extends Transform {
    id: number;
    name: string;
}
export declare class EntityManager<T extends Entity = Entity> {
    protected entityMap: Map<number, T>;
    protected _entities: Entity[];
    get entities(): Entity[];
    add(entity: T): void;
    remove(entity: T): void;
}
