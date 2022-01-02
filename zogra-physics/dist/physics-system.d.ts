import { Quaternion, Vector3 } from "zogra-renderer";
import { Contact } from "./collision";
import { IXPBDConstraint } from "./constraint/xpbd";
import { EntityData, Particle, PhysicsEntity, PhysicsEntityBuffer, Rigidbody } from "./entity";
import { BufferedEntity, EntityBuffer, ShapeBuffer } from "./entity-buffer";
import { RaycastHit } from "./query/query";
import { Shape, ShapeType } from "./shape";
export declare type Constraint = BufferedEntity<IXPBDConstraint>;
export declare class PhysicsSystem {
    particles: PhysicsEntityBuffer<Particle>;
    rigidbodies: PhysicsEntityBuffer<Rigidbody>;
    shapes: ShapeBuffer[];
    constantConstraints: EntityBuffer<IXPBDConstraint, {}>;
    dynamicConstraints: IXPBDConstraint[];
    gravity: Vector3;
    contacts: Contact[];
    simulate(deltaTime: number, subStep: number): void;
    addParticle(position: Readonly<Vector3>, invMass: number): Particle & {
        _index: number;
        _buffer: PhysicsEntityBuffer<Particle>;
    };
    addRigidbody(position?: Readonly<Vector3>, orientation?: Readonly<Quaternion>, invMass?: number, invInertia?: Readonly<Vector3>): Rigidbody;
    addConstraint(constraint: IXPBDConstraint): Constraint;
    removeConstraint(constraint: BufferedEntity<IXPBDConstraint>): void;
    addShape<T extends Shape>(entity: PhysicsEntity & EntityData, type: ShapeType<T>, shape: T): void;
    raycast(origin: Readonly<Vector3>, dir: Readonly<Vector3>): RaycastHit | null;
    private generateContact;
    private integrateParticles;
    private solveParticlesConstraint;
    private updateParticleVelocity;
}
