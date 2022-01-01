import { Vector3 } from "zogra-renderer";
import { IXPBDConstraint } from "./constraint/xpbd";
import { PhysicalParticle } from "./entity";
export declare class PhysicsSystem {
    particles: PhysicalParticle[];
    constantConstraints: IXPBDConstraint[];
    dynamicConstraints: IXPBDConstraint[];
    gravity: Vector3;
    simulate(deltaTime: number, subStep: number): void;
    addParticle(position: Readonly<Vector3>, invMass: number): void;
    addConstraint(constraint: IXPBDConstraint): void;
    private integrateParticles;
    private solveParticlesConstraint;
    private updateParticleVelocity;
}
