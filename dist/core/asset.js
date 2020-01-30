"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAssetID = (() => {
    let id = 1; //Math.floor(Math.random() * 0x1000000 + 0x1000000);
    return () => id++;
})();
class Asset {
    constructor() {
        this.assetID = exports.newAssetID();
    }
}
exports.Asset = Asset;
exports.AssetManager = {
    newAssetID: exports.newAssetID
};
//# sourceMappingURL=asset.js.map