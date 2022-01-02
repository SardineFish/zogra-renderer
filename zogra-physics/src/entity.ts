import { quat, Quaternion, vec3, Vector3 } from "zogra-renderer";
import { BufferedEntity, EntityBuffer, ShapeExt } from "./entity-buffer";
import { Shape } from "./shape";

export enum EntityType
{
    Particle,
    Rigidbody,
}

export interface PhysicsEntity
{
    readonly type: EntityType,
}

export interface IPositionEntity extends PhysicsEntity
{
    position: Vector3,
    prevPosition: Vector3,
    velocity: Vector3,
    invMass: number,
}

export interface IOrientationEntity extends PhysicsEntity
{
    orientation: Quaternion,
    prevOrientation: Quaternion,
    angularVelocity: Quaternion,
    invInertia: Vector3,
}

export class Particle implements IPositionEntity, EntityData
{
    readonly type: EntityType.Particle = EntityType.Particle;
    position: Vector3;
    prevPosition: Vector3;
    velocity: Vector3 = vec3.zero();
    invMass: number;

    /**@internal */
    shapes: ShapeExt[] = [];

    constructor(position = vec3.zero(), invMass = 0)
    {
        this.position = position;
        this.prevPosition = position.clone();
        this.invMass = invMass;
    }
}

export class Rigidbody implements IPositionEntity, IOrientationEntity, EntityData
{
    readonly type: EntityType.Rigidbody = EntityType.Rigidbody;
    position: Vector3;
    prevPosition: Vector3;
    velocity: Vector3;
    invMass: number;
    orientation: Quaternion;
    prevOrientation: Quaternion;
    angularVelocity: Quaternion;
    invInertia: Vector3;

    /**@internal */
    shapes: ShapeExt[] = [];

    constructor(position = vec3.zero(), orientation = quat.identity(), invMass: number = 0, invInertia = vec3.zero())
    {
        this.position = position;
        this.orientation = orientation;
        this.prevPosition = position.clone();
        this.prevOrientation = orientation.clone();
        this.invMass = invMass;
        this.invInertia = invInertia;
        this.velocity = vec3.zero();
        this.angularVelocity = quat.identity();
    }
}

export interface EntityData
{
    /** @internal */
    shapes: ShapeExt[]
}

export class PhysicsEntityBuffer<T extends PhysicsEntity & EntityData> extends EntityBuffer<T> {
    get(idx: number): T | undefined
    {
        return this.buffer[idx];
    }
    getUnchecked(idx: number): T
    {
        return this.buffer[idx];
    }
}