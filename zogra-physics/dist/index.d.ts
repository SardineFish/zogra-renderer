import { Vector3 } from "zogra-renderer";
import { Constraint } from "./constraint";
export * from "./constraint";
export interface PhysicalParticle {
    position: Vector3;
    invMass: number;
    velocity: Vector3;
    prevPosition: Vector3;
}
export declare class PhysicsSystem {
    particles: PhysicalParticle[];
    constantConstraints: Constraint[];
    dynamicConstraints: Constraint[];
    gravity: Vector3;
    simulate(deltaTime: number, subStep: number): void;
    addParticle(position: Readonly<Vector3>, invMass: number): void;
    addConstraint(constraint: Constraint): void;
    private integrateParticles;
    private solveParticlesConstraint;
    private updateParticleVelocity;
}
