"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Physics2D = void 0;
class Physics2D {
    constructor() {
        this.colliderList = [];
    }
    /** @internal */
    __addCollider(collider) {
        this.colliderList.push(collider);
    }
}
exports.Physics2D = Physics2D;
//# sourceMappingURL=physics-2d.js.map