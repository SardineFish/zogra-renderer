"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { newAssetID, findAsset, destroyAsset } = (() => {
    let id = 1; //Math.floor(Math.random() * 0x1000000 + 0x1000000);
    const assetsMap = new Map();
    return {
        newAssetID(assset) {
            const currentId = ++id;
            assetsMap.set(currentId, assset);
            return assset.assetID = currentId;
        },
        findAsset(id) {
            return assetsMap.get(id);
        },
        destroyAsset(id) {
            assetsMap.delete(id);
        }
    };
})();
class Asset {
    constructor(name) {
        this.destroyed = false;
        this.assetID = newAssetID(this);
        this.name = name || `Asset_${this.assetID}`;
    }
    destroy() {
        this.destroyed = true;
        destroyAsset(this.assetID);
    }
}
exports.Asset = Asset;
exports.AssetManager = {
    newAssetID: newAssetID,
    find: findAsset,
    destroy: destroyAsset
};
//# sourceMappingURL=asset.js.map