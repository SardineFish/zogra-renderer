import { vec3, Vector3 } from "zogra-renderer";
import { Constraint } from "./constraint";
export * from "./constraint";

export interface PhysicalParticle
{
    position: Vector3,
    invMass: number,
    velocity: Vector3,
    prevPosition: Vector3,
}

export class PhysicsSystem
{
    particles: PhysicalParticle[] = [];
    constantConstraints: Constraint[] = [];
    dynamicConstraints: Constraint[] = [];
    gravity: Vector3 = vec3(0, -9.8, 0);

    simulate(deltaTime: number, subStep: number)
    {
        let dt = deltaTime / subStep;
        for (let i = 0; i < subStep; ++i)
        {
            this.integrateParticles(dt);
            this.solveParticlesConstraint(dt);
            this.updateParticleVelocity(dt);
        }
    }

    addParticle(position: Readonly<Vector3>, invMass: number)
    {
        this.particles.push({
            position: position.clone(),
            invMass,
            velocity: vec3.zero(),
            prevPosition: position.clone(),
        });
    }

    addConstraint(constraint: Constraint)
    {
        this.constantConstraints.push(constraint);
    }

    private integrateParticles(deltaTime: number)
    {
        for (const particle of this.particles)
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
        for (const constraint of this.constantConstraints)
        {
            constraint.solve(deltaTime);
        }
    }

    private updateParticleVelocity(deltaTime: number)
    {
        for (const particle of this.particles)
        {   
            particle.velocity.x = (particle.position.x - particle.prevPosition.x) / deltaTime;
            particle.velocity.y = (particle.position.y - particle.prevPosition.y) / deltaTime;
            particle.velocity.z = (particle.position.z - particle.prevPosition.z) / deltaTime;
        }
    }
}