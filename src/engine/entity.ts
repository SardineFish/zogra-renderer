import { Transform } from "./transform";

const NewID = (() =>
{
    let nextId = 10001;
    return () => nextId++;
})();

export class Entity extends Transform
{
    id: number = NewID();
    name: string = `Entity_${this.id}`;
}

export class EntityManager<T extends Entity = Entity>
{
    protected entityMap: Map<number, T> = new Map();
    protected _entities: Entity[] = [];
    get entities() { return this._entities; }
    add(entity: T)
    {
        this.entityMap.set(entity.id, entity);
        this._entities = Array.from(this.entityMap.values());
    }
    remove(entity: T)
    {
        this.entityMap.delete(entity.id);
        this._entities = Array.from(this.entityMap.values());
    }
}