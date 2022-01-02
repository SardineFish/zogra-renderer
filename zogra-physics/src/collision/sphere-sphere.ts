import { Vector3, Quaternion, vec3 } from "zogra-renderer";
import { Particle, PhysicsEntity, Rigidbody } from "../entity";
import { Sphere } from "../shape";
import { Contact, NarrowPhase } from "./contact";

export const SphereSphereNarrowPhase: NarrowPhase<Sphere, Sphere> = {
    generateContact: function (self: Sphere, selfEntity: Particle | Rigidbody, other: Sphere, otherEntity: Particle | Rigidbody): Contact | null
    {
        const delta = vec3.plus(self.offset, selfEntity.position).minus(other.offset).minus(otherEntity.position);
        const d2 = delta.magnitudeSqr;
        const r2 = (self.radius + other.radius) * (self.radius + other.radius);
        if (d2 > r2)
        {
            return null;
        }

        const normal = delta.normalize();
        const point = vec3.mul(normal, other.radius).plus(otherEntity.position).plus(other.offset);
        const separation = Math.sqrt(r2) - Math.sqrt(d2);

        return {
            entites: [selfEntity, otherEntity],
            normal,
            point,
            separation,
        };
    }
}