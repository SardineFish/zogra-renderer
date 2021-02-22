"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const entity_1 = require("./entity");
const event_1 = require("../core/event");
const core_1 = require("../core/core");
class Scene extends entity_1.EntityManager {
    constructor() {
        super();
        //private managers = new Map<Function, EntityManager>();
        this.eventEmitter = new event_1.EventEmitter();
        this.assetID = core_1.AssetManager.newAssetID(this);
        this.name = `Scene_${this.assetID}`;
    }
    add(entity, parent) {
        super.add(entity);
        const type = entity.constructor;
        // if (!this.managers.has(type))
        //     this.managers.set(type, new EntityManager());
        // this.managers.get(type)?.add(entity);
        if (parent)
            entity.parent = parent;
        for (const child of entity.children)
            this.add(child, entity);
        this.eventEmitter.emit("entity-add", entity, parent ? parent : null);
    }
    remove(entity) {
        super.remove(entity);
        this.eventEmitter.emit("entity-remove", entity, entity.parent);
    }
    rootEntities() {
        return this._entities.filter(entity => entity.parent === null);
    }
    getEntities() {
        return this._entities;
    }
    getEntitiesOfType(type) {
        return this.entities.filter(entity => entity instanceof type);
        // return (this.managers.get(type)?.entities ?? []) as any as T[];
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    destroy() {
        this._entities = [];
        this.entityMap.clear();
        throw new Error("Method not implemented.");
    }
}
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map