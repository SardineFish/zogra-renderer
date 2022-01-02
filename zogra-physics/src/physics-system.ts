import { Color, Debug, quat, Quaternion, ray, vec3, Vector3 } from "zogra-renderer";
import { Contact, NarrowPhase } from "./collision";
import { IConstraint } from "./constraint";
import { ContactConstraint } from "./constraint/contact";
import { IXPBDConstraint } from "./constraint/xpbd";
import { EntityData, EntityType, IPositionEntity, Particle, PhysicsEntity, PhysicsEntityBuffer, Rigidbody } from "./entity";
import { EntityBuffer, ShapeBuffer, ShapeExt } from "./entity-buffer";
import { RaycastHit, WorldQuery } from "./query/query";
import { AllShapes, Plane, Shape, ShapeType, Sphere } from "./shape";

export class PhysicsSystem
{
    particles = new PhysicsEntityBuffer<Particle>();
    rigidbodies = new PhysicsEntityBuffer<Rigidbody>();
    shapes: ShapeBuffer[] = AllShapes.map(shape => new ShapeBuffer(shape));

    constantConstraints: IXPBDConstraint[] = [];
    dynamicConstraints: IXPBDConstraint[] = [];
    gravity: Vector3 = vec3(0, -9.8, 0);
    contacts: Contact[] = [];

    simulate(deltaTime: number, subStep: number)
    {
        let dt = deltaTime / subStep;
        for (let i = 0; i < subStep; ++i)
        {
            this.integrateParticles(dt);
            this.generateContact();
            this.solveParticlesConstraint(dt);
            this.updateParticleVelocity(dt);
        }
    }

    addParticle(position: Readonly<Vector3>, invMass: number)
    {
        return this.particles.push(new Particle(position, invMass));
    }

    addRigidbody(position: Readonly<Vector3> = vec3.zero(), orientation: Readonly<Quaternion> = quat.identity(), invMass: number = 0, invInertia: Readonly<Vector3> = vec3.zero()): Rigidbody
    {
        return this.rigidbodies.push(new Rigidbody(position, orientation, invMass, invInertia));
    }

    addConstraint(constraint: IXPBDConstraint)
    {
        this.constantConstraints.push(constraint);
    }

    addShape<T extends Shape>(entity: PhysicsEntity & EntityData, type: ShapeType<T>, shape: T)
    {
        const shapeExt: ShapeExt = this.shapes[type.id].push({ ...shape, entity, });
        entity.shapes.push(shapeExt);
    }

    raycast(origin: Readonly<Vector3>, dir: Readonly<Vector3>): RaycastHit | null
    {
        let nearest = Number.MAX_VALUE;
        let nearestResult: RaycastHit | null = null;

        this.shapes.forEach(shapeBuf =>
        {
            const query = WorldQuery[shapeBuf.type.id];
            if (!query)
                return;

            shapeBuf.buffer.forEach(shape =>
            {
                const result = query.raycast(shape, shape.entity as Rigidbody | Particle, origin, dir);
                if (result && result.distance < nearest)
                {
                    nearest = result.distance;
                    nearestResult = result;
                }
            });
        });

        return nearestResult;
    }

    private generateContact()
    {
        this.contacts = [];
        this.dynamicConstraints = [];

        this.shapes.forEach(selfType =>
        {
            this.shapes.forEach(otherType =>
            {
                // Here narrow phase is not symmetrical e.g. (Sphere, Plane) but no (Plane, Sphere)
                const narrowPhase = NarrowPhase.get(selfType.type, otherType.type);
                if (!narrowPhase)
                    return;

                selfType.buffer.forEach(self =>
                {
                    otherType.buffer.forEach(other =>
                    {
                        if (self === other)
                            return;

                        const contact = narrowPhase.generateContact(self, self.entity as Particle | Rigidbody, other, other.entity as Particle | Rigidbody);
                        if (contact)
                        {
                            Debug().drawRay(contact.point, contact.normal, contact.separation, Color.red);
                            this.contacts.push(contact);
                            this.dynamicConstraints.push(new ContactConstraint(contact as Contact<IPositionEntity, IPositionEntity>));
                        }
                    })
                });
            })
        })
    }

    private integrateParticles(deltaTime: number)
    {
        for (const particle of this.particles.buffer)
        {
            particle.prevPosition.set(particle.position);
            if (particle.invMass > 0)
            {
                particle.position.x += particle.velocity.x * deltaTime + this.gravity.x * deltaTime * deltaTime;
                particle.position.y += particle.velocity.y * deltaTime + this.gravity.y * deltaTime * deltaTime;
                particle.position.z += particle.velocity.z * deltaTime + this.gravity.z * deltaTime * deltaTime;
            }
        }
    }

    private solveParticlesConstraint(deltaTime: number)
    {
        for (const constraint of this.dynamicConstraints)
        {
            constraint.multiplier = 0;
            constraint.solve(deltaTime);
        }
        for (const constraint of this.constantConstraints)
        {
            constraint.multiplier = 0;
            constraint.solve(deltaTime);
        }
    }

    private updateParticleVelocity(deltaTime: number)
    {
        for (const particle of this.particles.buffer)
        {
            particle.velocity.x = (particle.position.x - particle.prevPosition.x) / deltaTime;
            particle.velocity.y = (particle.position.y - particle.prevPosition.y) / deltaTime;
            particle.velocity.z = (particle.position.z - particle.prevPosition.z) / deltaTime;
        }
    }
}