import { mul, quat, vec3, Vector3 } from "zogra-renderer";
import { EntityType } from "../entity";
import { Plane, Sphere } from "../shape";
import { NarrowPhase } from "./contact";

export const SpherePlaneNarrowPhase: NarrowPhase<Sphere, Plane> = {
    generateContact(self, selfEntity, other, otherEntity)
    {
        const normal = other.normal.clone();
        if (otherEntity.type === EntityType.Rigidbody)
            quat.rotate(normal, otherEntity.orientation, normal);
        
        const center = vec3.plus(self.offset, selfEntity.position);
        const d = center.dot(normal);
        if (d - other.offset > self.radius)
            return null;
        
        const separation = self.radius - (d - other.offset);

        return {
            entites: [selfEntity, otherEntity],
            normal,
            point: vec3.minus(center, mul(normal, self.radius - separation)),
            separation: self.radius - (d - other.offset)
        }
    }
}