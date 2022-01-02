import { Plane, Sphere } from "../shape";
import { SpherePlaneNarrowPhase } from "./sphere-plane";
import { SphereSphereNarrowPhase } from "./sphere-sphere";
export const NarrowPhase = {
    [pair(Sphere, Sphere)]: SphereSphereNarrowPhase,
    [pair(Sphere, Plane)]: SpherePlaneNarrowPhase,
    get(shape1, shape2) {
        return this[pair(shape1, shape2)];
    }
};
function pair(shape1, shape2) {
    return (shape1.id << 4) | shape2.id;
}
//# sourceMappingURL=contact.js.map