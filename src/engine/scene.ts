import { Entity, EntityManager, IEntity } from "./entity";
import { Camera } from "./camera";
import { RenderObject } from "./render-object";
import { Light } from "./light";
import { EventDefinitions, EventEmitter, IEventSource, EventKeys } from "./event";
import { ConstructorType } from "../utils/util";

interface SceneEvents extends EventDefinitions
{
    "entity-add": (entity: Entity, parent: Entity | null) => void;
    "entity-remove": (entity: Entity, parent: Entity | null) => void;
}

export class Scene extends EntityManager<Entity> implements IEventSource<SceneEvents>
{
    private managers = new Map<Function, EntityManager>();

    private eventEmitter = new EventEmitter<SceneEvents>();

    add(entity: Entity, parent?: Entity)
    {
        super.add(entity);

        const type = entity.constructor;
        if (!this.managers.has(type))
            this.managers.set(type, new EntityManager());
        this.managers.get(type)?.add(entity);
        
        
        if (parent)
            entity.parent = parent;
        for (const child of entity.children)
            this.add(child as Entity, entity);
        
        this.eventEmitter.emit("entity-add", entity, parent ? parent : null);
    }
    remove(entity: Entity)
    {
        super.remove(entity);

        const type = entity.constructor;
        this.managers.get(type)?.remove(entity);
        
        if (entity.parent)
        {
            entity.parent.children.delete(entity);
        }

        this.eventEmitter.emit("entity-remove", entity, entity.parent as Entity);
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
        return (this.managers.get(type)?.entities ?? []) as any as T[];
    }

    on<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<SceneEvents>>(event: T, listener: SceneEvents[T])
    {
        this.eventEmitter.off(event, listener);
    }
}