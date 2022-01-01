import { Vector3 } from "zogra-renderer";
import { PositionalConstraint } from ".";
import { PhysicalParticle } from "..";
export declare class DistanceConstraint implements PositionalConstraint<[PhysicalParticle, PhysicalParticle]> {
    p0: PhysicalParticle;
    p1: PhysicalParticle;
    distance: number;
    constructor(p1: PhysicalParticle, p2: PhysicalParticle, distance: number);
    gradients: [(positions_0: Readonly<Vector3>, positions_1: Readonly<Vector3>) => Vector3, (positions_0: Readonly<Vector3>, positions_1: Readonly<Vector3>) => Vector3];
    evaluate(p0: Readonly<Vector3>, p1: Readonly<Vector3>): number;
    solve(dt: number): void;
}
