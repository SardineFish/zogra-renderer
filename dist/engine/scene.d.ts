import { Entity, EntityManager } from "./entity";
export declare class Scene extends EntityManager<Entity> {
    private managers;
    add(entity: Entity, parent?: Entity): void;
    remove(entity: Entity): void;
    rootEntities(): Entity[];
    getEntities(): Entity[];
    getEntitiesOfType<T extends typeof Entity>(type: T): InstanceType<T>[];
}
