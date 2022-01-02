import { Vector3 } from "zogra-renderer";
import { IConstraint } from ".";
import { IPositionEntity } from "../entity";
declare type GradientFn<T> = (this: T) => Vector3;
export interface IXPBDConstraint extends IConstraint {
    compliance: number;
    multiplier: number;
}
export interface XPBDPositionalConstraint<T extends Vector3[]> extends IXPBDConstraint {
    evaluate(): number;
    gradients: {
        [key in keyof T]: GradientFn<this>;
    };
    entites: {
        [key in keyof T]: IPositionEntity;
    };
}
export declare function solvePositionalXPBD<T extends XPBDPositionalConstraint<Vector3[]>>(constraint: T, dt: number): void;
export {};
