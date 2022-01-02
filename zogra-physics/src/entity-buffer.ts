import { PhysicsEntity } from "./entity";
import { Shape, ShapeType } from "./shape";

export class EntityBuffer<T, Additional = {}>
{
    buffer: Array<BufferedEntity<T, this> & Additional> = [];
    push(entity: T & Additional): BufferedEntity<T, this> & Additional
    {
        Object.assign(entity, {
            _index: this.buffer.length,
            _buffer: this,
        });
        this.buffer.push(entity as any);
        return entity as BufferedEntity<T, this> & Additional;
    }
    swapRemove(entity: BufferedEntity<T>)
    {
        if (entity._index < 0)
            return;
        
        this.buffer[entity._index] = this.buffer[this.buffer.length - 1];
        if (entity._index !== this.buffer.length - 1)
        {
            this.buffer[entity._index]._index = entity._index;
        }
        this.buffer.length -= 1;
        entity._index = -1;
    }
}
export type BufferedEntity<T, Buffer extends EntityBuffer<T> = EntityBuffer<T>> = T & {
    _index: number;
    _buffer: Buffer,
};

interface ShapeData
{
    entity: PhysicsEntity
}

export interface ShapeExt extends BufferedEntity<Shape, ShapeBuffer>, ShapeData
{
    
}

export class ShapeBuffer extends EntityBuffer<Shape, ShapeData>
{
    type: ShapeType;
    constructor(type: ShapeType)
    {
        super();
        this.type = type;
    }
}
