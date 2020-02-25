"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssetsPack {
    constructor() {
        this.mainAsset = null;
        this.assets = new Set();
    }
    add(asset) {
        this.assets.add(asset);
    }
    setMain(asset) {
        this.mainAsset = asset;
    }
    get(Type) {
        for (const asset of this.assets) {
            if (asset instanceof Type)
                return asset;
        }
        return null;
    }
    getAll(Type) {
        return Array.from(this.assets).filter(asset => asset instanceof Type);
    }
}
exports.AssetsPack = AssetsPack;
//# sourceMappingURL=types.js.map