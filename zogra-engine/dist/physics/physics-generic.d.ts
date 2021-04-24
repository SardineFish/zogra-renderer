import { Entity } from "../engine/entity";
import { Scene } from "../engine/scene";
import { Time } from "../engine/zogra-engine";
export interface IPhysicsSystem {
    update(time: Readonly<Time>): void;
}
export declare type IPhysicsSystemClass<T extends IPhysicsSystemClass<T>> = (new (...args: any[]) => IPhysicsSystem) & {
    current(scene: Scene): InstanceType<T>;
};
export declare class UnknownPhysics implements IPhysicsSystem {
    __getColliders(): never[];
    update(): void;
}
export interface ICollider {
    entity: Entity | null;
}
export declare class ColliderBase<PhysicsSystem extends IPhysicsSystem> implements ICollider {
    private _physicsSystem;
    get physics(): PhysicsSystem | null;
    private _entity;
    get entity(): Entity | null;
}
