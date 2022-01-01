import { vec3 } from "zogra-renderer";
export * from "./constraint";
export class PhysicsSystem {
    constructor() {
        this.particles = [];
        this.constantConstraints = [];
        this.dynamicConstraints = [];
        this.gravity = vec3(0, -9.8, 0);
    }
    simulate(deltaTime, subStep) {
        let dt = deltaTime / subStep;
        for (let i = 0; i < subStep; ++i) {
            this.integrateParticles(dt);
            this.solveParticlesConstraint(dt);
            this.updateParticleVelocity(dt);
        }
    }
    addParticle(position, invMass) {
        this.particles.push({
            position: position.clone(),
            invMass,
            velocity: vec3.zero(),
            prevPosition: position.clone(),
        });
    }
    addConstraint(constraint) {
        this.constantConstraints.push(constraint);
    }
    integrateParticles(deltaTime) {
        for (const particle of this.particles) {
            particle.prevPosition.set(particle.position);
            if (particle.invMass > 0) {
                particle.position.x += particle.velocity.x * deltaTime + this.gravity.x * deltaTime * deltaTime;
                particle.position.y += particle.velocity.y * deltaTime + this.gravity.y * deltaTime * deltaTime;
                particle.position.z += particle.velocity.z * deltaTime + this.gravity.z * deltaTime * deltaTime;
            }
        }
    }
    solveParticlesConstraint(deltaTime) {
        for (const constraint of this.constantConstraints) {
            constraint.solve(deltaTime);
        }
    }
    updateParticleVelocity(deltaTime) {
        for (const particle of this.particles) {
            particle.velocity.x = (particle.position.x - particle.prevPosition.x) / deltaTime;
            particle.velocity.y = (particle.position.y - particle.prevPosition.y) / deltaTime;
            particle.velocity.z = (particle.position.z - particle.prevPosition.z) / deltaTime;
        }
    }
}
//# sourceMappingURL=index.js.map