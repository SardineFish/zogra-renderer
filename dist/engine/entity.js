"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transform_1 = require("./transform");
const NewID = (() => {
    let nextId = 10001;
    return () => nextId++;
})();
class Entity extends transform_1.Transform {
    constructor() {
        super(...arguments);
        this.id = NewID();
        this.name = `Entity_${this.id}`;
    }
}
exports.Entity = Entity;
class EntityManager {
    constructor() {
        this.entityMap = new Map();
        this._entities = [];
    }
    get entities() { return this._entities; }
    add(entity) {
        this.entityMap.set(entity.id, entity);
        this._entities = Array.from(this.entityMap.values());
    }
    remove(entity) {
        this.entityMap.delete(entity.id);
        this._entities = Array.from(this.entityMap.values());
    }
}
exports.EntityManager = EntityManager;
//# sourceMappingURL=entity.js.map