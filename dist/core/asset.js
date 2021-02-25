"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManager = exports.LazyInitAsset = exports.Asset = void 0;
const util_1 = require("../utils/util");
const event_1 = require("./event");
const global_1 = require("./global");
class Asset {
    constructor(name) {
        this.destroyed = false;
        this.assetID = exports.AssetManager.newAssetID(this);
        this.name = name || `Asset_${this.assetID}`;
    }
    destroy() {
        this.destroyed = true;
        exports.AssetManager.destroy(this.assetID);
    }
}
exports.Asset = Asset;
class LazyInitAsset extends Asset {
    constructor(ctx = global_1.GlobalContext()) {
        super();
        this.initialzed = false;
        this.ctx = ctx;
    }
    tryInit(required = false) {
        if (this.initialzed)
            return true;
        const ctx = this.ctx || global_1.GlobalContext();
        if (!ctx) {
            if (required)
                throw new Error("Failed to initialize GPU resource withou a global GL context.");
            return false;
        }
        this.ctx = ctx;
        if (this.init()) {
            this.initialzed = true;
            return true;
        }
        else {
            if (required)
                throw new Error("Failed to initialize required GPU resource.");
            return false;
        }
    }
}
exports.LazyInitAsset = LazyInitAsset;
class AssetManagerType {
    constructor() {
        this.assetsMap = new Map();
        this.id = 1;
        this.eventEmitter = new event_1.EventEmitter();
    }
    newAssetID(asset) {
        const currentId = ++this.id;
        this.assetsMap.set(currentId, asset);
        util_1.setImmediate(() => this.eventEmitter.emit("asset-created", asset));
        return asset.assetID = currentId;
    }
    find(id) {
        if (typeof (id) === "number")
            return this.assetsMap.get(id);
        else if (typeof (id) === "string") {
            for (const asset of this.assetsMap.values())
                if (asset.name === id)
                    return asset;
        }
        return undefined;
    }
    destroy(id) {
        const asset = this.assetsMap.get(id);
        if (!asset)
            return;
        this.assetsMap.delete(id);
        util_1.setImmediate(() => this.eventEmitter.emit("asset-destroyed", asset));
    }
    findAssetsOfType(type) {
        return Array.from(this.assetsMap.values()).filter(asset => asset instanceof type);
    }
    on(event, listener) {
        return this.eventEmitter.on(event, listener);
    }
    off(event, listener) {
        return this.eventEmitter.off(event, listener);
    }
}
exports.AssetManager = new AssetManagerType();
//# sourceMappingURL=asset.js.map