"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transform_1 = require("./transform");
const asset_1 = require("../core/asset");
class Entity extends transform_1.Transform {
    constructor() {
        super(...arguments);
        this.assetID = asset_1.AssetManager.newAssetID();
        this.name = `Entity_${this.assetID}`;
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
    remove(entity) {
        this.entityMap.delete(entity.assetID);
        this._entities = Array.from(this.entityMap.values());
    }
}
exports.EntityManager = EntityManager;
//# sourceMappingURL=entity.js.map