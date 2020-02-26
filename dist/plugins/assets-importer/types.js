"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssetsPack {
    constructor() {
        this.mainAsset = null;
        this.assets = new Map();
    }
    add(name, asset) {
        asset.name = name;
        this.assets.set(name, asset);
    }
    setMain(asset) {
        this.mainAsset = asset;
    }
    get(Type) {
        for (const [name, asset] of this.assets) {
            if (asset instanceof Type)
                return asset;
        }
        return null;
    }
    getAll(Type) {
        return Array.from(this.assets.values()).filter(asset => asset instanceof Type);
    }
}
exports.AssetsPack = AssetsPack;
//# sourceMappingURL=types.js.map