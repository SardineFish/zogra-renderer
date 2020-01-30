import { Entity, EntityManager } from "./entity";
import { Camera } from "./camera";
import { RenderObject } from "./render-object";
import { Light } from "./light";

export class Scene extends EntityManager<Entity>
{
    private managers = new Map<Function, EntityManager>();

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
    }
    rootEntities()
    {
        return this._entities.filter(entity => entity.parent === null);
    }
    getEntities()
    {
        return this._entities;
    }
    getEntitiesOfType<T extends typeof Entity>(type: T): InstanceType<T>[]
    {
        return (this.managers.get(type)?.entities ?? []) as any as InstanceType<T>[];
    }
}