import { Vector3 } from "zogra-renderer";
import { IConstraint } from ".";
import { IPositionEntity } from "../entity";

type GradientFn<T> = (this: T) => Vector3;

export interface IXPBDConstraint extends IConstraint
{
    compliance: number,
    multiplier: number,
}

export interface XPBDPositionalConstraint<T extends Vector3[]> extends IXPBDConstraint
{
    evaluate(): number;
    gradients: { [key in keyof T]: GradientFn<this> };
    entites: { [key in keyof T]: IPositionEntity };
}

export function solvePositionalXPBD<T extends XPBDPositionalConstraint<Vector3[]>>(constraint: T)
{
    const c = constraint.evaluate();
    if (c >= 0)
        return;
    const gradients = constraint.gradients.map(g => g.call(constraint));
    constraint.multiplier += (-c - constraint.compliance * constraint.multiplier)
        / (constraint.compliance + sum(constraint.entites, (entity, idx) => constraint.gradients[idx].call(constraint).magnitudeSqr * entity.invMass));
    
    const dPos = gradients.map((g, idx) => g.mul(constraint.entites[idx].invMass * constraint.multiplier));
    constraint.entites.forEach((entity, idx) => entity.position.plus(dPos[idx]));
}

function sum<T>(arr: T[], selector: (value: T, idx: number) => number): number
{
    return arr.reduce((value, curent, idx) =>
    {
        return value + selector(curent, idx);
    }, 0);
}