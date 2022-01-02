import { quat, vec3 } from "zogra-renderer";
import { EntityBuffer } from "./entity-buffer";
export var EntityType;
(function (EntityType) {
    EntityType[EntityType["Particle"] = 0] = "Particle";
    EntityType[EntityType["Rigidbody"] = 1] = "Rigidbody";
})(EntityType || (EntityType = {}));
export class Particle {
    constructor(position = vec3.zero(), invMass = 0) {
        this.type = EntityType.Particle;
        this.velocity = vec3.zero();
        /**@internal */
        this.shapes = [];
        this.position = position;
        this.prevPosition = position.clone();
        this.invMass = invMass;
    }
}
export class Rigidbody {
    constructor(position = vec3.zero(), orientation = quat.identity(), invMass = 0, invInertia = vec3.zero()) {
        this.type = EntityType.Rigidbody;
        /**@internal */
        this.shapes = [];
        this.position = position;
        this.orientation = orientation;
        this.prevPosition = position.clone();
        this.prevOrientation = orientation.clone();
        this.invMass = invMass;
        this.invInertia = invInertia;
        this.velocity = vec3.zero();
        this.angularVelocity = quat.identity();
    }
}
export class PhysicsEntityBuffer extends EntityBuffer {
    get(idx) {
        return this.buffer[idx];
    }
    getUnchecked(idx) {
        return this.buffer[idx];
    }
}
//# sourceMappingURL=entity.js.map