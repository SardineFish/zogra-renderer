import { Transform } from "./transform";
import { AssetManager } from "zogra-renderer";
import { EventEmitter } from "zogra-renderer";
export class Entity extends Transform {
    constructor() {
        super(...arguments);
        this.assetID = AssetManager.newAssetID(this);
        this.name = `Entity_${this.assetID}`;
        this.eventEmitter = new EventEmitter();
        this._destroyed = false;
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
    get destroyed() { return this._destroyed; }
    ;
    on(event, listener) {
        return this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
    }
    destroy() {
        this._destroyed = true;
        if (this.scene)
            this.scene.remove(this);
        else
            AssetManager.destroy(this.assetID);
    }
    start(time) { }
    update(time) { }
    exit(time) { }
    /** @internal */
    __updateRecursive(time) {
        this.update(time);
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
    /** @internal */
    __start(time) {
        this.start(time);
        this.eventEmitter.with().emit("start", this, time);
    }
    /** @internal */
    __exit(time) {
        this.exit(time);
        this.eventEmitter.with().emit("exit", this, time);
        if (this._destroyed)
            AssetManager.destroy(this.assetID);
    }
}
export class EntityManager {
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
//# sourceMappingURL=entity.js.map