"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = exports.Entity = void 0;
const transform_1 = require("./transform");
const asset_1 = require("../core/asset");
const event_1 = require("../core/event");
class Entity extends transform_1.Transform {
    constructor() {
        super(...arguments);
        this.assetID = asset_1.AssetManager.newAssetID(this);
        this.name = `Entity_${this.assetID}`;
        this.eventEmitter = new event_1.EventEmitter();
        this.destroyed = false;
    }
    on(event, listener) {
        return this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    __updateRecursive(time) {
        this.eventEmitter.emit("update", this, time);
        for (const entity of this.children)
            entity.__updateRecursive(time);
    }
    destroy() {
        this.destroyed = true;
        asset_1.AssetManager.destroy(this.assetID);
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
        this.entityMap.set(entity.assetID, entity);
        this._entities = Array.from(this.entityMap.values());
    }
    removeRecursive(entity) {
        this.entityMap.delete(entity.assetID);
        for (const child of entity.children)
            this.removeRecursive(child);
    }
    remove(entity) {
        this.removeRecursive(entity);
        if (entity.parent) {
            entity.parent.children.delete(entity);
        }
        this._entities = Array.from(this.entityMap.values());
    }
}
exports.EntityManager = EntityManager;
//# sourceMappingURL=entity.js.map