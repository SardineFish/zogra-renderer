import { Vector3 } from "zogra-renderer";
import { Plane, Shape, Sphere } from "..";
import { IPositionEntity, Particle, PhysicsEntity, Rigidbody } from "../entity";
import { QueryPlane } from "./plane";
import { QuerySphere } from "./sphere";

export interface RaycastHit
{
    collider: Shape,
    entity: Rigidbody | Particle,
    point: Vector3,
    normal: Vector3,
    distance: number,
}

export interface WorldQuery<T extends Shape>
{
    raycast(self: T, selfEntity: Rigidbody | Particle, origin: Readonly<Vector3>, dir: Readonly<Vector3>): RaycastHit | null;
}

export const WorldQuery: Record<number, WorldQuery<Shape> | undefined> = {
    [Sphere.id]: QuerySphere,
    [Plane.id]: QueryPlane
};