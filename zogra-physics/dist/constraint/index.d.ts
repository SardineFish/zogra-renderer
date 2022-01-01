import { Vector3 } from "zogra-renderer";
import { PhysicalParticle } from "..";
export interface Constraint {
    solve(dt: number): void;
}
declare type ParticlesPositionVecRef<T extends PhysicalParticle[]> = {
    [key in keyof T]: Readonly<Vector3>;
};
declare type ParticleGradient<T extends PhysicalParticle[]> = (...positions: ParticlesPositionVecRef<T>) => Vector3;
declare type ParticlesGradientVec<T extends PhysicalParticle[]> = {
    [key in keyof T]: ParticleGradient<T>;
};
export interface PositionalConstraint<T extends PhysicalParticle[]> {
    evaluate(...positions: ParticlesPositionVecRef<T>): number;
    gradients: ParticlesGradientVec<T>;
}
export interface ParticleConstraint<T extends PhysicalParticle[]> {
    particles: T;
    constraint: PositionalConstraint<T>;
}
export * from "./distance";
