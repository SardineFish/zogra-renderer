"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Physics2D = void 0;
const zogra_renderer_1 = require("zogra-renderer");
class Physics2D {
    constructor() {
        this.gravity = zogra_renderer_1.vec2.zero();
        this.colliderList = [];
    }
    /** @internal */
    __addCollider(collider) {
        collider = collider;
        collider.__colliderIdx = this.colliderList.push(collider) - 1;
    }
    /** @internal */
    __removeCollider(collider) {
        // Swap tail collider and remove
        const coll = collider;
        if (coll.__colliderIdx >= 0) {
            if (this.colliderList.length > 1) {
                const tailCollider = this.colliderList[this.colliderList.length - 1];
                tailCollider.__colliderIdx = coll.__colliderIdx;
                this.colliderList[coll.__colliderIdx] = tailCollider;
            }
            this.colliderList.length--;
        }
    }
    /** @internal */
    __getColliders() {
        return this.colliderList;
    }
    update(time) {
        var _a, _b, _c, _d, _e;
        this.updateMotion(time);
        for (let i = 0; i < this.colliderList.length; i++) {
            const colliderA = this.colliderList[i];
            for (let j = i + 1; j < this.colliderList.length; j++) {
                if (i === j)
                    continue;
                const colliderB = this.colliderList[j];
                if (colliderA.checkContact(colliderB)) {
                    colliderA.__eventEmitter.emit("onContact", colliderB);
                    colliderB.__eventEmitter.emit("onContact", colliderA);
                }
                else
                    continue;
                if (!colliderA.rigidbody && !colliderB.rigidbody)
                    continue;
                const [self, other] = (!colliderB.rigidbody) ? [colliderB, colliderA] : [colliderA, colliderB];
                const relativeMotion = zogra_renderer_1.minus((_b = (_a = other.rigidbody) === null || _a === void 0 ? void 0 : _a._motion) !== null && _b !== void 0 ? _b : zogra_renderer_1.vec2.zero(), (_d = (_c = self.rigidbody) === null || _c === void 0 ? void 0 : _c._motion) !== null && _d !== void 0 ? _d : zogra_renderer_1.vec2.zero());
                const collision = self.checkCollision(other, relativeMotion);
                if (collision) {
                    if (self.rigidbody && other.rigidbody) {
                        console.warn("Collision between two rigidbody is not implement");
                        continue;
                    }
                    (_e = other.entity) === null || _e === void 0 ? void 0 : _e.translate(collision.seperation.toVec3());
                    self.__eventEmitter.emit("onCollide", collision);
                    collision.self = other;
                    collision.other = self;
                    other.__eventEmitter.emit("onCollide", collision);
                }
            }
        }
    }
    updateMotion(time) {
        var _a;
        const gravity = this.gravity;
        const applyGravity = gravity.x !== 0 && gravity.y !== 0;
        for (let i = 0; i < this.colliderList.length; i++) {
            const rigidbody = this.colliderList[i].rigidbody;
            if (!rigidbody)
                continue;
            if (applyGravity)
                rigidbody.addAcceleration(gravity);
            rigidbody._velocity.x += rigidbody._acceleration.x * time.deltaTime;
            rigidbody._velocity.y += rigidbody._acceleration.y * time.deltaTime;
            const motion = zogra_renderer_1.mul(rigidbody._velocity, time.deltaTime);
            (_a = rigidbody.collider.entity) === null || _a === void 0 ? void 0 : _a.translate(motion.toVec3());
            rigidbody._motion = motion;
        }
    }
}
exports.Physics2D = Physics2D;
//# sourceMappingURL=physics-2d.js.map