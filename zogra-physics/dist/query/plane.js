import { quat, vec3 } from "zogra-renderer";
import { EntityType } from "../entity";
export const QueryPlane = {
    raycast: function (self, selfEntity, origin, dir) {
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
        };
    }
};
//# sourceMappingURL=plane.js.map