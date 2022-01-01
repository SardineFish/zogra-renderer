import { Vector3 } from "zogra-renderer";
import { IPositionEntity } from "../entity";
import { XPBDPositionalConstraint } from "./xpbd";
export declare class DistanceConstraint implements XPBDPositionalConstraint<[Vector3, Vector3]> {
    p0: IPositionEntity;
    p1: IPositionEntity;
    distance: number;
    compliance: number;
    multiplier: number;
    gradients: [(this: this) => Vector3, (this: this) => Vector3];
    entites: [IPositionEntity, IPositionEntity];
    constructor(p1: IPositionEntity, p2: IPositionEntity, distance: number);
    gradientP0(): Vector3;
    gradientP1(): Vector3;
    evaluate(): number;
    solve(dt: number): void;
}
