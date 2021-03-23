import { Entity, EntityManager } from "./entity";
import { EventDefinitions, IEventSource, EventKeys } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { IAsset } from "zogra-renderer";
interface SceneEvents extends EventDefinitions {
    "entity-add": (entity: Entity, parent: Entity | null) => void;
    "entity-remove": (entity: Entity, parent: Entity | null) => void;
}
export declare class Scene extends EntityManager<Entity> implements IAsset, IEventSource<SceneEvents> {
    readonly assetID: number;
    name: string;
    private eventEmitter;
    constructor();
    add(entity: Entity, parent?: Entity): void;
    remove(entity: Entity): void;
    rootEntities(): Entity[];
    getEntities(): Entity[];
    getEntitiesOfType<T>(type: ConstructorType<T>): T[];
    on<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T]): void;
    off<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T]): void;
    destroy(): void;
}
export {};
