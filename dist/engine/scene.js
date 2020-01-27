"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
class Scene extends entity_1.EntityManager {
    constructor() {
        super(...arguments);
        this.managers = new Map();
    }
    add(entity, parent) {
        var _a;
        super.add(entity);
        const type = entity.constructor;
        if (!this.managers.has(type))
            this.managers.set(type, new entity_1.EntityManager());
        (_a = this.managers.get(type)) === null || _a === void 0 ? void 0 : _a.add(entity);
        if (parent)
            entity.parent = parent;
    }
    remove(entity) {
        var _a;
        super.remove(entity);
        const type = entity.constructor;
        (_a = this.managers.get(type)) === null || _a === void 0 ? void 0 : _a.remove(entity);
        if (entity.parent) {
            entity.parent.children = entity.parent.children.filter(c => c !== entity);
        }
    }
    rootEntities() {
        return this._entities.filter(entity => entity.parent === null);
    }
    getEntities() {
        return this._entities;
    }
    getEntitiesOfType(type) {
        var _a, _b;
        return (_b = (_a = this.managers.get(type)) === null || _a === void 0 ? void 0 : _a.entities, (_b !== null && _b !== void 0 ? _b : []));
    }
}
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map