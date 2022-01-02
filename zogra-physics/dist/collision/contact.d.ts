import { Vector3 } from "zogra-renderer";
import { Particle, PhysicsEntity, Rigidbody } from "../entity";
import { Plane, Shape, ShapeType, Sphere } from "../shape";
export interface Contact<Self extends PhysicsEntity = PhysicsEntity, Other extends PhysicsEntity = PhysicsEntity> {
    entites: [Self, Other];
    point: Vector3;
    /** normal on contact point at other entity toward self */
    normal: Vector3;
    separation: number;
}
export interface NarrowPhase<Self extends Shape, Other extends Shape> {
    generateContact(self: Self, selfEntity: Particle | Rigidbody, other: Other, otherEntity: Particle | Rigidbody): Contact | null;
}
export declare const NarrowPhase: {
    [x: number]: NarrowPhase<Sphere, Sphere> | NarrowPhase<Sphere, Plane>;
    get<Self extends Shape, Other extends Shape>(shape1: ShapeType<Self>, shape2: ShapeType<Other>): NarrowPhase<Self, Other> | undefined;
};
