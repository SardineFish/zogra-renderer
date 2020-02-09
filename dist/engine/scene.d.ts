import { Entity, EntityManager } from "./entity";
import { EventDefinitions, IEventSource, EventKeys } from "./event";
import { ConstructorType } from "../utils/util";
interface SceneEvents extends EventDefinitions {
    "entity-add": (entity: Entity, parent: Entity | null) => void;
    "entity-remove": (entity: Entity, parent: Entity | null) => void;
}
export declare class Scene extends EntityManager<Entity> implements IEventSource<SceneEvents> {
    private managers;
    private eventEmitter;
    add(entity: Entity, parent?: Entity): void;
    remove(entity: Entity): void;
    rootEntities(): Entity[];
    getEntities(): Entity[];
    getEntitiesOfType<T>(type: ConstructorType<T>): T[];
    on<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T]): void;
    off<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T]): void;
}
export {};
