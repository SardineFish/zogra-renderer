import { Vector3 } from "zogra-renderer";
import { Shape } from "..";
import { Particle, Rigidbody } from "../entity";
export interface RaycastHit {
    collider: Shape;
    entity: Rigidbody | Particle;
    point: Vector3;
    normal: Vector3;
    distance: number;
}
export interface WorldQuery<T extends Shape> {
    raycast(self: T, selfEntity: Rigidbody | Particle, origin: Readonly<Vector3>, dir: Readonly<Vector3>): RaycastHit | null;
}
export declare const WorldQuery: Record<number, WorldQuery<Shape> | undefined>;
