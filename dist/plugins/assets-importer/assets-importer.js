"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fbx_importer_1 = require("../fbx-importer/fbx-importer");
const utils_1 = require("../fbx-importer/utils");
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
            if (isInheritFrom(asset, Type))
                return asset;
        }
        return null;
    }
    getAll(Type) {
        return Array.from(this.assets).filter(asset => isInheritFrom(asset, Type));
    }
}
exports.AssetsPack = AssetsPack;
exports.AssetsImporter = {
    blob(blob) {
        return {
            fbx: async () => await fbx_importer_1.FBXImporter.import(await utils_1.readBlob(blob)),
        };
    },
    buffer(buffer) {
        return {
            fbx: () => fbx_importer_1.FBXImporter.import(buffer),
        };
    }
};
function isInheritFrom(obj, Type) {
    for (var constructor = obj.constructor; constructor != null; constructor = constructor.prototype) {
        if (constructor === Type)
            return true;
    }
    return false;
}
//# sourceMappingURL=assets-importer.js.map