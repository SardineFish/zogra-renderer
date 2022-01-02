import { Quaternion, Vector3 } from "zogra-renderer";
import { Contact } from "./collision";
import { IXPBDConstraint } from "./constraint/xpbd";
import { EntityData, Particle, PhysicsEntity, PhysicsEntityBuffer, Rigidbody } from "./entity";
import { ShapeBuffer } from "./entity-buffer";
import { Shape, ShapeType } from "./shape";
export declare class PhysicsSystem {
    particles: PhysicsEntityBuffer<Particle>;
    rigidbodies: PhysicsEntityBuffer<Rigidbody>;
    shapes: ShapeBuffer[];
    constantConstraints: IXPBDConstraint[];
    dynamicConstraints: IXPBDConstraint[];
    gravity: Vector3;
    contacts: Contact[];
    simulate(deltaTime: number, subStep: number): void;
    addParticle(position: Readonly<Vector3>, invMass: number): Particle & {
        _index: number;
        _buffer: PhysicsEntityBuffer<Particle>;
    };
    addRigidbody(position?: Readonly<Vector3>, orientation?: Readonly<Quaternion>, invMass?: number, invInertia?: Readonly<Vector3>): Rigidbody;
    addConstraint(constraint: IXPBDConstraint): void;
    addShape<T extends Shape>(entity: PhysicsEntity & EntityData, type: ShapeType<T>, shape: T): void;
    private generateContact;
    private integrateParticles;
    private solveParticlesConstraint;
    private updateParticleVelocity;
}
