import { Quaternion, Vector3 } from "zogra-renderer";
export interface IPositionEntity {
    position: Vector3;
    prevPosition: Vector3;
    velocity: Vector3;
    invMass: number;
}
export interface IOrientationEntity {
    orientation: Quaternion;
    prevOrientation: Quaternion;
    angularVelocity: Quaternion;
    invInertia: Vector3;
}
export interface PhysicalParticle extends IPositionEntity {
}
export interface Rigidbody extends IPositionEntity, IOrientationEntity {
}
