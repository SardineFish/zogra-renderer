import { EventEmitter } from "./event";
import { GlobalContext } from "./global";
export class Asset {
    constructor(name) {
        this.destroyed = false;
        this.assetID = AssetManager.newAssetID(this);
        this.name = name || `Asset_${this.assetID}`;
    }
    destroy() {
        this.destroyed = true;
        AssetManager.destroy(this.assetID);
    }
}
export class GPUAsset extends Asset {
    constructor(ctx = GlobalContext(), name) {
        super(name);
        this.initialized = false;
        this.ctx = ctx;
    }
    tryInit(required = false) {
        if (this.initialized)
            return true;
        if (!this.ctx)
            this.ctx = GlobalContext();
        const success = this.ctx && this.init();
        if (!success && required)
            throw new Error(`Failed to init GPU Asset '${this.name}' without global gl context.`);
        this.initialized = success;
        return success;
    }
}
export class LazyInitAsset extends Asset {
    constructor(ctx = GlobalContext()) {
        super();
        this.initialzed = false;
        this.ctx = ctx;
    }
    tryInit(required = false) {
        if (this.initialzed)
            return true;
        const ctx = this.ctx || GlobalContext();
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
class AssetManagerType {
    constructor() {
        this.assetsMap = new Map();
        this.id = 1;
        this.eventEmitter = new EventEmitter();
    }
    newAssetID(asset) {
        const currentId = ++this.id;
        this.assetsMap.set(currentId, asset);
        // setImmediate(() => this.eventEmitter.emit("asset-created", asset));
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
        // setImmediate(() => this.eventEmitter.emit("asset-destroyed", asset));
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
export const AssetManager = new AssetManagerType();
//# sourceMappingURL=asset.js.map