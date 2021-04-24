"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColliderBase = exports.UnknownPhysics = void 0;
class UnknownPhysics {
    /** @internal */
    __addCollider() { }
    /** @internal */
    __removeCollider() { }
    __getColliders() { return []; }
    update() { }
}
exports.UnknownPhysics = UnknownPhysics;
class ColliderBase {
    constructor() {
        this._physicsSystem = null;
        this._entity = null;
    }
    get physics() { return this._physicsSystem; }
    get entity() { return this._entity; }
    /** @internal */
    __bind(entity, scene) {
        if (this.entity && this.entity !== entity)
            throw new Error("Collider should only be bound to single entity.");
        this._entity = entity;
        this._physicsSystem = scene.physics;
        this._physicsSystem.__addCollider(this);
    }
    /** @internal */
    __unbind() {
        this._entity = null;
        this.__unbindPhysics();
    }
    /** @internal */
    __unbindPhysics() {
        var _a;
        (_a = this._physicsSystem) === null || _a === void 0 ? void 0 : _a.__removeCollider(this);
        this._physicsSystem = null;
    }
}
exports.ColliderBase = ColliderBase;
//# sourceMappingURL=physics-generic.js.map