import { Quaternion, Vector3 } from "zogra-renderer";
import { Particle, PhysicsEntity, Rigidbody } from "../entity";
import { Plane, Shape, ShapeType, Sphere } from "../shape";
import { SpherePlaneNarrowPhase } from "./sphere-plane";
import { SphereSphereNarrowPhase } from "./sphere-sphere";

export interface Contact<Self extends PhysicsEntity = PhysicsEntity, Other extends PhysicsEntity = PhysicsEntity>
{
    entites: [Self, Other],

    point: Vector3,

    /** normal on contact point at other entity toward self */
    normal: Vector3,

    separation: number,
}

export interface NarrowPhase<Self extends Shape, Other extends Shape>
{
    generateContact(self: Self, selfEntity: Particle | Rigidbody, other: Other, otherEntity: Particle | Rigidbody): Contact | null;
}

export const NarrowPhase = {
    [pair(Sphere, Sphere)]: SphereSphereNarrowPhase,
    [pair(Sphere, Plane)]: SpherePlaneNarrowPhase,
    
    get<Self extends Shape, Other extends Shape>(shape1: ShapeType<Self>, shape2: ShapeType<Other>) : NarrowPhase<Self, Other> | undefined
    {
        return this[pair(shape1, shape2)] as unknown as NarrowPhase<Self, Other> | undefined;
    }
};

function pair<Self extends Shape, Other extends Shape>(shape1: ShapeType<Self>, shape2: ShapeType<Other>)
{
    return (shape1.id << 4) | shape2.id;
}