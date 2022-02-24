import { vec3, Vector3 } from "zogra-renderer";
import { IConstraint } from ".";
import { IPositionEntity } from "../entity";

type GradientFn<T> = (this: T) => Vector3;

export interface IXPBDConstraint extends IConstraint
{
    compliance: number,
}

export interface XPBDPositionalConstraint<T extends Vector3[]> extends IXPBDConstraint
{
    multiplier: number,
    evaluate(): number;
    gradients: { [key in keyof T]: GradientFn<this> };
    entites: { [key in keyof T]: IPositionEntity };
}

export interface IXPBDDampedConstraint extends IXPBDConstraint
{
    damping: number,
}

export interface XPBDDampedPositionalConstraint<T extends Vector3[]> extends IXPBDDampedConstraint
{
    evaluate(): number;
    gradients: { [key in keyof T]: GradientFn<this> };
    entites: { [key in keyof T]: IPositionEntity };
    multipliers: { [key in keyof T]: number };
    accumulateMultipliers(multipliers: { [key in keyof T]: number }): void;
}

export function solvePositionalXPBD<T extends XPBDPositionalConstraint<Vector3[]>>(constraint: T, dt: number)
{
    const c = constraint.evaluate();
    if (c >= 0)
        return;
    
    const compliance = constraint.compliance / (dt * dt);
    
    const gradients = constraint.gradients.map(g => g.call(constraint));
    const deltaMultiplier = (-c - compliance * constraint.multiplier)
        / (compliance + sum(constraint.entites, (entity, idx) => constraint.gradients[idx].call(constraint).magnitudeSqr * entity.invMass));
    
    constraint.multiplier += deltaMultiplier;
    
    const corrections = gradients.map((g, idx) => g.mul(constraint.entites[idx].invMass * deltaMultiplier));

    constraint.entites.forEach((entity, idx) => entity.center.plus(corrections[idx]));
}

export function solveDampedPositionalXPBD<T extends XPBDDampedPositionalConstraint<Vector3[]>>(constraint: T, dt: number)
{
    const c = constraint.evaluate();
    if (c >= 0)
        return;

    const dt2 = dt * dt;
    const compliance = constraint.compliance / dt2;
    const damping = constraint.damping * dt2;
    const gamma = compliance * damping / dt;

    // Can simplify as sum of inv-mass
    const totalInvMass = sum(constraint.entites, (entity, idx) => constraint.gradients[idx].call(constraint).magnitudeSqr * entity.invMass);

    const gradients = constraint.gradients.map(g => g.call(constraint));
    const deltaMultiplier = constraint.multipliers.map((multiplier, i) =>
    {
        const x = constraint.entites[i].center;
        const x0 = constraint.entites[i].prevCenter;
        return (-c - compliance * multiplier - gamma * gradients[i].dot(vec3.minus(x, x0)))
            / ((1 + gamma) * totalInvMass + compliance);
    })
    constraint.accumulateMultipliers(deltaMultiplier);

    const corrections = gradients.map((g, i) => g.mul(constraint.entites[i].invMass * deltaMultiplier[i]));

    constraint.entites.forEach((entity, idx) => entity.center.plus(corrections[idx]));
}

function sum<T>(arr: T[], selector: (value: T, idx: number) => number): number
{
    return arr.reduce((value, curent, idx) =>
    {
        return value + selector(curent, idx);
    }, 0);
}