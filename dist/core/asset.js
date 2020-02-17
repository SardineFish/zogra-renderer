"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAssetID = (() => {
    let id = 1; //Math.floor(Math.random() * 0x1000000 + 0x1000000);
    return () => id++;
})();
class Asset {
    constructor(name) {
        this.destroyed = false;
        this.assetID = exports.newAssetID();
        this.name = name || `Asset_${this.assetID}`;
    }
    destroy() {
        this.destroyed = true;
    }
}
exports.Asset = Asset;
exports.AssetManager = {
    newAssetID: exports.newAssetID,
};
//# sourceMappingURL=asset.js.map