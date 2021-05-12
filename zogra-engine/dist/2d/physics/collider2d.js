import { EventEmitter } from "zogra-renderer";
import { ColliderBase } from "../../physics/physics-generic";
export class Collider2D extends ColliderBase {
    constructor() {
        super(...arguments);
        this.rigidbody = null;
        this.enabled = true;
        /** @internal */
        this.__eventEmitter = new EventEmitter();
        /** @internal */
        this.__colliderIdx = -1;
    }
    on(event, listener) {
        this.__eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.__eventEmitter.on(event, listener);
    }
    /** @internal */
    checkCollision(other, otherMotoin) {
        return null;
    }
    checkContact(other) {
        return false;
    }
}
//# sourceMappingURL=collider2d.js.map