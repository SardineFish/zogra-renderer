import { Vector3 } from "zogra-renderer";
import { IConstraint } from ".";
import { IPositionEntity } from "../entity";
declare type GradientFn<T> = (this: T) => Vector3;
export interface IXPBDConstraint extends IConstraint {
    compliance: number;
}
export interface XPBDPositionalConstraint<T extends Vector3[]> extends IXPBDConstraint {
    multiplier: number;
    evaluate(): number;
    gradients: {
        [key in keyof T]: GradientFn<this>;
    };
    entites: {
        [key in keyof T]: IPositionEntity;
    };
}
export interface IXPBDDampedConstraint extends IXPBDConstraint {
    damping: number;
}
export interface XPBDDampedPositionalConstraint<T extends Vector3[]> extends IXPBDDampedConstraint {
    evaluate(): number;
    gradients: {
        [key in keyof T]: GradientFn<this>;
    };
    entites: {
        [key in keyof T]: IPositionEntity;
    };
    multipliers: {
        [key in keyof T]: number;
    };
    accumulateMultipliers(multipliers: {
        [key in keyof T]: number;
    }): void;
}
export declare function solvePositionalXPBD<T extends XPBDPositionalConstraint<Vector3[]>>(constraint: T, dt: number): void;
export declare function solveDampedPositionalXPBD<T extends XPBDDampedPositionalConstraint<Vector3[]>>(constraint: T, dt: number): void;
export {};
