import { Vector3 } from "zogra-renderer";
import { PhysicalParticle } from "..";

export interface Constraint
{
    solve(dt: number): void;
}

type ParticlesPositionVec<T extends PhysicalParticle[]> = {
    [key in keyof T]: Vector3
};

type ParticlesPositionVecRef<T extends PhysicalParticle[]> = {
    [key in keyof T]: Readonly<Vector3>
};


type ParticleGradient<T extends PhysicalParticle[]> = (...positions: ParticlesPositionVecRef<T>) => Vector3;
type ParticlesGradientVec<T extends PhysicalParticle[]> = {
    [key in keyof T]: ParticleGradient<T>
};

export interface PositionalConstraint<T extends PhysicalParticle[]>
{
    evaluate(...positions: ParticlesPositionVecRef<T>): number;
    gradients: ParticlesGradientVec<T>;
}

export interface ParticleConstraint<T extends PhysicalParticle[]>
{
    particles: T;
    constraint: PositionalConstraint<T>;
}

export * from "./distance";