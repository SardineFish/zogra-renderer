import { ConstructorType } from "zogra-renderer/dist/utils/util";
import { Entity } from "../engine/entity";
import { Scene } from "../engine/scene";
import { Time } from "../engine/zogra-engine";
import { Into } from "../utils/util";

export interface IPhysicsSystem
{
    /** @internal */
    __addCollider(collider: ICollider): void;

    /** @internal */
    __removeCollider(collider: ICollider): void;

    /** @internal */
    __getColliders<T extends ICollider>(): T[];

    update(time: Readonly<Time>): void;
}

export type IPhysicsSystemClass<T extends IPhysicsSystemClass<T>> = (new (...args: any[]) => IPhysicsSystem) & { current(scene: Scene): InstanceType<T> };

export class UnknownPhysics implements IPhysicsSystem
{
    /** @internal */
    __addCollider() { }

    /** @internal */
    __removeCollider() { }

    __getColliders() { return [] }

    update() { }
}

export interface ICollider
{
    entity: Entity | null;
    /** @internal */
    __bind(entity: Entity, scene: Scene): void;
    /** @internal */
    __unbind(): void;
    /** @internal */
    __unbindPhysics(): void;
}

export class ColliderBase<PhysicsSystem extends IPhysicsSystem> implements ICollider
{
    private _physicsSystem: PhysicsSystem | null = null;
    get physics() { return this._physicsSystem }

    private _entity: Entity | null = null;
    get entity() { return this._entity }

    /** @internal */
    __bind(entity: Entity, scene: Scene)
    {
        if (this.entity && this.entity !== entity)
            throw new Error("Collider should only be bound to single entity.");
        this._entity = entity;
        this._physicsSystem = scene.physics as PhysicsSystem;
        this._physicsSystem.__addCollider(this);
    }
    /** @internal */
    __unbind()
    {
        this._entity = null;
        this.__unbindPhysics();
    }
    /** @internal */
    __unbindPhysics()
    {
        this._physicsSystem?.__removeCollider(this);
        this._physicsSystem = null;
    }
}
