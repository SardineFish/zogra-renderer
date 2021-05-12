"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const entity_1 = require("./entity");
const zogra_renderer_1 = require("zogra-renderer");
const zogra_renderer_2 = require("zogra-renderer");
class Scene extends entity_1.EntityManager {
    constructor(PhysicsSystem) {
        super();
        //private managers = new Map<Function, EntityManager>();
        /** @internal */
        this.engine = undefined;
        this.eventEmitter = new zogra_renderer_1.EventEmitter();
        this.addsNextFrame = new Map();
        this.removesNextFrame = new Set();
        this.assetID = zogra_renderer_2.AssetManager.newAssetID(this);
        this.name = `Scene_${this.assetID}`;
        this.physics = new PhysicsSystem();
    }
    add(entity, parent = null) {
        if (entity.destroyed) {
            console.error("Attempt to add destroyed entity");
            return;
        }
        this.addsNextFrame.set(entity, parent);
        for (const child of entity.children)
            this.add(child, entity);
    }
    remove(entity) {
        this.removesNextFrame.add(entity);
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
    withPhysics(physics) {
        this.physics = physics;
        return this;
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    clearAll() {
        var _a, _b;
        const time = (_b = (_a = this.engine) === null || _a === void 0 ? void 0 : _a.time) !== null && _b !== void 0 ? _b : { time: 0, deltaTime: 0 };
        for (const entity of this._entities) {
            entity.destroy();
        }
        this.addsNextFrame.clear();
        this.removesNextFrame.clear();
        this.removePendingEntites(time);
        this._entities = [];
        this.entityMap.clear();
    }
    destroy() {
        this.clearAll();
    }
    /** @internal */
    __update(time) {
        var _a;
        this.addPendingEntities(time);
        this.removePendingEntites(time);
        const entities = this.rootEntities();
        for (const entity of entities)
            entity.__updateRecursive(time);
        (_a = this.physics) === null || _a === void 0 ? void 0 : _a.update(time);
    }
    addPendingEntities(time) {
        const adds = this.addsNextFrame;
        this.addsNextFrame = new Map();
        for (const [entity, parent] of adds) {
            super.add(entity);
            entity.__addToScene(this);
            const type = entity.constructor;
            // if (!this.managers.has(type))
            //     this.managers.set(type, new EntityManager());
            // this.managers.get(type)?.add(entity);
            if (parent)
                entity.parent = parent;
            this.eventEmitter.emit("entity-add", entity, parent ? parent : null);
        }
        for (const [entity, _] of adds)
            entity.__start(time);
    }
    removePendingEntites(time) {
        const removes = this.removesNextFrame;
        this.removesNextFrame = new Set();
        for (const entity of removes) {
            super.remove(entity);
            entity.__removeFromScene(this);
            this.eventEmitter.emit("entity-remove", entity, entity.parent);
        }
        for (const entity of removes)
            entity.__exit(time);
    }
}
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map