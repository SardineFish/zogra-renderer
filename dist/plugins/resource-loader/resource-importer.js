"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function isInheritFrom(obj, Type) {
    for (var constructor = obj.constructor; constructor != null; constructor = constructor.prototype) {
        if (constructor === Type)
            return true;
    }
    return false;
}
//# sourceMappingURL=resource-importer.js.map