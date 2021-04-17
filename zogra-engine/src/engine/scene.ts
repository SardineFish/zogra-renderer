import { Entity, EntityManager, IEntity } from "./entity";
import { Camera } from "./camera";
import { RenderObject } from "./render-object";
import { Light } from "./light";
import { EventDefinitions, EventEmitter, IEventSource, EventKeys } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { IAsset, AssetManager } from "zogra-renderer";
import { IPhysicsSystem, IPhysicsSystemClass, UnknownPhysics } from "../physics/physics-generic";
import { Physics2D } from "../2d/physics/physics-2d";
import { Time } from "./zogra-engine";

interface SceneEvents extends EventDefinitions
{
    "entity-add": (entity: Entity, parent: Entity | null) => void;
    "entity-remove": (entity: Entity, parent: Entity | null) => void;
}

export class Scene<Physics extends IPhysicsSystem = IPhysicsSystem> extends EntityManager<Entity> implements IAsset, IEventSource<SceneEvents>
{
    readonly assetID: number;
    name: string;
    physics: Physics;

    //private managers = new Map<Function, EntityManager>();

    private eventEmitter = new EventEmitter<SceneEvents>();
    private addsNextFrame: Map<Entity, Entity | null> = new Map();
    private removesNextFrame: Set<Entity> = new Set();

    constructor(PhysicsSystem: ConstructorType<Physics>)
    {
        super();
        this.assetID = AssetManager.newAssetID(this);
        this.name = `Scene_${this.assetID}`;
        this.physics = new PhysicsSystem();
    }

    add(entity: Entity, parent: Entity | null = null)
    {
        this.addsNextFrame.set(entity, parent);

        for (const child of entity.children)
            this.add(child as Entity, entity);
        
    }
    remove(entity: Entity)
    {
        this.removesNextFrame.add(entity);
    }
    rootEntities()
    {
        return this._entities.filter(entity => entity.parent === null);
    }
    getEntities()
    {
        return this._entities;
    }
    getEntitiesOfType<T>(type: ConstructorType<T>): T[]
    {
        return this.entities.filter(entity => entity instanceof type) as any as T[];
        // return (this.managers.get(type)?.entities ?? []) as any as T[];
    }

    on<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T])
    {
        this.eventEmitter.off(event, listener);
    }
    destroy(): void
    {
        this._entities = [];
        this.entityMap.clear();
        throw new Error("Method not implemented.");
    }
    /** @internal */
    __update(time: Time)
    {
        this.addPendingEntities(time);
        this.removePendingEntites(time);

        const entities = this.rootEntities();
        for (const entity of entities)
            entity.__updateRecursive(time);
        
        this.physics?.update(time);
    }

    private addPendingEntities(time: Time)
    {
        const adds = this.addsNextFrame;
        this.addsNextFrame = new Map();
        for (const [entity, parent] of adds)
        {
            super.add(entity);
            entity.__addToScene(this);

            const type = entity.constructor;
            // if (!this.managers.has(type))
            //     this.managers.set(type, new EntityManager());
            // this.managers.get(type)?.add(entity);


            if (parent)
                entity.parent = parent;

            this.eventEmitter.emit("entity-add", entity, parent ? parent : null);
        }
        for (const [entity, _] of adds)
            entity.__start(time);
    }
    private removePendingEntites(time: Time)
    {
        const removes = this.removesNextFrame;
        this.removesNextFrame = new Set();
        for (const entity of removes)
        {
            super.remove(entity);
            entity.__removeFromScene(this);

            this.eventEmitter.emit("entity-remove", entity, entity.parent as Entity);
        }
        for (const entity of removes)
            entity.__exit(time);
    }
}