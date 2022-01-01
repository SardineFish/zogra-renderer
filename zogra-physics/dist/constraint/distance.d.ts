import { Vector3 } from "zogra-renderer";
import { IXPBDConstraint } from "./interface";
import { IPositionEntity } from "../entity";
export declare class DistanceConstraint implements IXPBDConstraint {
    p0: IPositionEntity;
    p1: IPositionEntity;
    distance: number;
    compliance: number;
    multiplier: number;
    constructor(p1: IPositionEntity, p2: IPositionEntity, distance: number);
    gradientP0(p0: Readonly<Vector3>, p1: Readonly<Vector3>): Vector3;
    gradientP1(p0: Readonly<Vector3>, p1: Readonly<Vector3>): Vector3;
    evaluate(p0: Readonly<Vector3>, p1: Readonly<Vector3>): number;
    solve(dt: number): void;
}
