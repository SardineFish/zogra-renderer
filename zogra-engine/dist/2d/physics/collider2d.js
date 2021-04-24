"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collider2D = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const physics_generic_1 = require("../../physics/physics-generic");
class Collider2D extends physics_generic_1.ColliderBase {
    constructor() {
        super(...arguments);
        this.rigidbody = null;
        this.enabled = true;
        /** @internal */
        this.__eventEmitter = new zogra_renderer_1.EventEmitter();
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
exports.Collider2D = Collider2D;
//# sourceMappingURL=collider2d.js.map