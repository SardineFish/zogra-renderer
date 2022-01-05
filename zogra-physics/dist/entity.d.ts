import { Quaternion, Vector3 } from "zogra-renderer";
import { EntityBuffer } from "./entity-buffer";
export declare enum EntityType {
    Particle = 0,
    Rigidbody = 1
}
export interface PhysicsEntity {
    readonly type: EntityType;
}
export interface IPositionEntity extends PhysicsEntity {
    position: Vector3;
    /** Position of center-of-mass in world space */
    center: Vector3;
    prevCenter: Vector3;
    velocity: Vector3;
    invMass: number;
}
export interface IOrientationEntity extends PhysicsEntity {
    orientation: Quaternion;
    /** Position of center-of-mass in world space */
    center: Vector3;
    prevOrientation: Quaternion;
    angularVelocity: Quaternion;
    invInertia: Vector3;
}
export declare class Particle implements IPositionEntity, EntityData {
    readonly type: EntityType.Particle;
    position: Vector3;
    center: Vector3;
    localCenter: Vector3;
    prevCenter: Vector3;
    velocity: Vector3;
    invMass: number;
    constructor(position?: Vector3, invMass?: number);
}
export declare class Rigidbody implements IPositionEntity, IOrientationEntity, EntityData {
    readonly type: EntityType.Rigidbody;
    position: Vector3;
    center: Vector3;
    prevCenter: Vector3;
    velocity: Vector3;
    invMass: number;
    orientation: Quaternion;
    prevOrientation: Quaternion;
    angularVelocity: Quaternion;
    invInertia: Vector3;
    constructor(position?: Vector3, orientation?: Quaternion, invMass?: number, invInertia?: Vector3);
}
export interface EntityData {
}
export declare class PhysicsEntityBuffer<T extends PhysicsEntity & EntityData> extends EntityBuffer<T> {
    get(idx: number): T | undefined;
    getUnchecked(idx: number): T;
}
