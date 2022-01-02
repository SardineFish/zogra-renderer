import { PhysicsEntity } from "./entity";
import { Shape, ShapeType } from "./shape";
export declare class EntityBuffer<T, Additional = {}> {
    buffer: Array<BufferedEntity<T, this> & Additional>;
    push(entity: T & Additional): BufferedEntity<T, this> & Additional;
    swapRemove(entity: BufferedEntity<T>): void;
}
export declare type BufferedEntity<T, Buffer extends EntityBuffer<T> = EntityBuffer<T>> = T & {
    _index: number;
    _buffer: Buffer;
};
interface ShapeData {
    entity: PhysicsEntity;
}
export interface ShapeExt extends BufferedEntity<Shape, ShapeBuffer>, ShapeData {
}
export declare class ShapeBuffer extends EntityBuffer<Shape, ShapeData> {
    type: ShapeType;
    constructor(type: ShapeType);
}
export {};
