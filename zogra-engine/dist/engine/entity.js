"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = exports.Entity = void 0;
const transform_1 = require("./transform");
const zogra_renderer_1 = require("zogra-renderer");
const zogra_renderer_2 = require("zogra-renderer");
class Entity extends transform_1.Transform {
    constructor() {
        super(...arguments);
        this.assetID = zogra_renderer_1.AssetManager.newAssetID(this);
        this.name = `Entity_${this.assetID}`;
        this.eventEmitter = new zogra_renderer_2.EventEmitter();
        this.destroyed = false;
        this._collider = null;
    }
    get collider() { return this._collider; }
    set collider(value) {
        if (this.scene && value)
            value.__bind(this, this.scene);
        if (this._collider && this._collider !== value)
            this._collider.__unbind();
        this._collider = value;
    }
    on(event, listener) {
        return this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    destroy() {
        this.destroyed = true;
        zogra_renderer_1.AssetManager.destroy(this.assetID);
    }
    /** @internal */
    __updateRecursive(time) {
        this.eventEmitter.emit("update", this, time);
        for (const entity of this.children)
            entity.__updateRecursive(time);
    }
    /** @internal */
    __addToScene(scene) {
        var _a;
        super.__addToScene(scene);
        (_a = this._collider) === null || _a === void 0 ? void 0 : _a.__bind(this, scene);
    }
    /** @internal */
    __removeFromScene(scene) {
        var _a;
        super.__removeFromScene(scene);
        (_a = this._collider) === null || _a === void 0 ? void 0 : _a.__unbindPhysics();
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