import { quat, vec3 } from "zogra-renderer";
import { EntityType } from "../entity";
export const QuerySphere = {
    raycast: function (self, selfEntity, origin, dir) {
        const center = self.offset.clone();
        if (selfEntity.type === EntityType.Rigidbody)
            quat.rotate(center, selfEntity.orientation, center);
        center.plus(selfEntity.position);
        const delta = vec3.minus(origin, center);
        const b = delta.dot(dir);
        const c = delta.magnitudeSqr - self.radius * self.radius;
        const d = b * b - c;
        if (d < 0)
            return null;
        const t = -b - Math.sqrt(b * b - c);
        if (t < 0)
            return null;
        const point = vec3.mul(dir, t).plus(origin);
        return {
            entity: selfEntity,
            collider: self,
            point,
            normal: vec3.minus(point, center).normalize(),
            distance: t,
        };
    }
};
//# sourceMappingURL=sphere.js.map