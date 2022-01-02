import { quat, vec3, Vector3 } from "zogra-renderer";
import { RaycastHit, WorldQuery } from ".";
import { Plane } from "..";
import { Rigidbody, Particle, EntityType } from "../entity";

export const QueryPlane: WorldQuery<Plane> = {
    raycast: function (self: Plane, selfEntity: Rigidbody | Particle, origin: Readonly<Vector3>, dir: Readonly<Vector3>): RaycastHit | null
    {
        const normal = self.normal.clone();
        if (selfEntity.type === EntityType.Rigidbody)
            quat.rotate(normal, selfEntity.orientation, normal);

        const project = normal.dot(dir);
        if (project === 0)
            return null;
        
        const w = vec3(self.offset);
        
        const div = (dir.dot(normal) - dir.dot(w));
        if (div === 0)
            return null;
        const t = -(normal.dot(origin) - origin.dot(w)) / div;

        return {
            collider: self,
            entity: selfEntity,
            distance: t,
            normal,
            point: vec3.mul(dir, t).plus(origin)
        }
    }
}

