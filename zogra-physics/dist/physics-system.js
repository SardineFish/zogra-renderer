import { Color, Debug, quat, vec3 } from "zogra-renderer";
import { NarrowPhase } from "./collision";
import { ContactConstraint } from "./constraint/contact";
import { Particle, PhysicsEntityBuffer, Rigidbody } from "./entity";
import { EntityBuffer, ShapeBuffer } from "./entity-buffer";
import { WorldQuery } from "./query/query";
import { AllShapes } from "./shape";
export class PhysicsSystem {
    constructor() {
        this.particles = new PhysicsEntityBuffer();
        this.rigidbodies = new PhysicsEntityBuffer();
        this.shapes = AllShapes.map(shape => new ShapeBuffer(shape));
        this.constantConstraints = new EntityBuffer();
        this.dynamicConstraints = [];
        this.gravity = vec3(0, -9.8, 0);
        this.contacts = [];
    }
    simulate(deltaTime, subStep) {
        let dt = deltaTime / subStep;
        for (let i = 0; i < subStep; ++i) {
            this.integrateParticles(dt);
            this.generateContact();
            this.solveParticlesConstraint(dt);
            this.updateParticleVelocity(dt);
            this.restoreParticlePosition();
        }
    }
    addParticle(position, invMass) {
        return this.particles.push(new Particle(position, invMass));
    }
    addRigidbody(position = vec3.zero(), orientation = quat.identity(), invMass = 0, invInertia = vec3.zero()) {
        return this.rigidbodies.push(new Rigidbody(position, orientation, invMass, invInertia));
    }
    addConstraint(constraint) {
        return this.constantConstraints.push(constraint);
    }
    removeConstraint(constraint) {
        this.constantConstraints.swapRemove(constraint);
    }
    addShape(entity, type, shape) {
        const shapeExt = this.shapes[type.id].push(Object.assign(Object.assign({}, shape), { entity }));
        entity.shapes.push(shapeExt);
    }
    raycast(origin, dir) {
        let nearest = Number.MAX_VALUE;
        let nearestResult = null;
        this.shapes.forEach(shapeBuf => {
            const query = WorldQuery[shapeBuf.type.id];
            if (!query)
                return;
            shapeBuf.buffer.forEach(shape => {
                const result = query.raycast(shape, shape.entity, origin, dir);
                if (result && result.distance < nearest) {
                    nearest = result.distance;
                    nearestResult = result;
                }
            });
        });
        return nearestResult;
    }
    generateContact() {
        this.contacts = [];
        this.dynamicConstraints = [];
        this.shapes.forEach(selfType => {
            this.shapes.forEach(otherType => {
                // Here narrow phase is not symmetrical e.g. (Sphere, Plane) but no (Plane, Sphere)
                const narrowPhase = NarrowPhase.get(selfType.type, otherType.type);
                if (!narrowPhase)
                    return;
                selfType.buffer.forEach(self => {
                    otherType.buffer.forEach(other => {
                        if (self === other)
                            return;
                        const contact = narrowPhase.generateContact(self, self.entity, other, other.entity);
                        if (contact) {
                            Debug().drawRay(contact.point, contact.normal, contact.separation, Color.red);
                            this.contacts.push(contact);
                            this.dynamicConstraints.push(new ContactConstraint(contact));
                        }
                    });
                });
            });
        });
    }
    integrateParticles(deltaTime) {
        for (const particle of this.particles.buffer) {
            particle.updateCenter();
            particle.prevCenter.set(particle.center);
            if (particle.invMass > 0) {
                particle.center.x += particle.velocity.x * deltaTime + this.gravity.x * deltaTime * deltaTime;
                particle.center.y += particle.velocity.y * deltaTime + this.gravity.y * deltaTime * deltaTime;
                particle.center.z += particle.velocity.z * deltaTime + this.gravity.z * deltaTime * deltaTime;
            }
        }
    }
    solveParticlesConstraint(deltaTime) {
        for (const constraint of this.dynamicConstraints) {
            constraint.resetMultiplier();
            constraint.solve(deltaTime);
        }
        for (const constraint of this.constantConstraints.buffer) {
            constraint.resetMultiplier();
            constraint.solve(deltaTime);
        }
    }
    updateParticleVelocity(deltaTime) {
        for (const particle of this.particles.buffer) {
            particle.velocity.x = (particle.center.x - particle.prevCenter.x) / deltaTime;
            particle.velocity.y = (particle.center.y - particle.prevCenter.y) / deltaTime;
            particle.velocity.z = (particle.center.z - particle.prevCenter.z) / deltaTime;
        }
    }
    restoreParticlePosition() {
        for (const particle of this.particles.buffer) {
            particle.updatePosition();
        }
    }
}
//# sourceMappingURL=physics-system.js.map