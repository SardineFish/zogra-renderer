"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fbx_importer_1 = require("../fbx-importer/fbx-importer");
const utils_1 = require("../fbx-importer/utils");
class AssetsCollection {
    constructor() {
        this.assets = [];
    }
    add(asset) {
        this.assets.push(asset);
    }
    get(Type) {
        return this.assets.find(asset => asset.constructor === Type);
    }
    getAll(Type) {
        return this.assets.filter(asset => isInheritFrom(asset, Type));
    }
}
exports.AssetsCollection = AssetsCollection;
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