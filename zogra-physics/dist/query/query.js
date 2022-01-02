import { Plane, Sphere } from "..";
import { QueryPlane } from "./plane";
import { QuerySphere } from "./sphere";
export const WorldQuery = {
    [Sphere.id]: QuerySphere,
    [Plane.id]: QueryPlane
};
//# sourceMappingURL=query.js.map