import { vec3 } from "zogra-renderer";
export const SphereSphereNarrowPhase = {
    generateContact: function (self, selfEntity, other, otherEntity) {
        const delta = vec3.plus(self.offset, selfEntity.position).minus(other.offset).minus(otherEntity.position);
        const d2 = delta.magnitudeSqr;
        const r2 = (self.radius + other.radius) * (self.radius + other.radius);
        if (d2 > r2) {
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
};
//# sourceMappingURL=sphere-sphere.js.map