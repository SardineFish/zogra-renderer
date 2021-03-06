import { Entity, EntityManager } from "./entity";
import { EventDefinitions, IEventSource, EventKeys } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { IAsset } from "zogra-renderer";
import { IPhysicsSystem } from "../physics/physics-generic";
interface SceneEvents extends EventDefinitions {
    "entity-add": (entity: Entity, parent: Entity | null) => void;
    "entity-remove": (entity: Entity, parent: Entity | null) => void;
}
export declare class Scene<Physics extends IPhysicsSystem = IPhysicsSystem> extends EntityManager<Entity> implements IAsset, IEventSource<SceneEvents> {
    readonly assetID: number;
    name: string;
    physics: Physics;
    private eventEmitter;
    private addsNextFrame;
    private removesNextFrame;
    constructor(PhysicsSystem: ConstructorType<Physics>);
    add(entity: Entity, parent?: Entity | null): void;
    remove(entity: Entity): void;
    rootEntities(): Entity[];
    getEntities(): Entity[];
    getEntitiesOfType<T>(type: ConstructorType<T>): T[];
    withPhysics<Physics extends IPhysicsSystem>(physics: Physics): Scene<Physics>;
    on<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T]): void;
    off<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T]): void;
    clearAll(): void;
    destroy(): void;
    private addPendingEntities;
    private removePendingEntites;
}
export {};
