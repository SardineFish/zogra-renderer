"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsImporter = void 0;
const global_1 = require("../../core/global");
const texture_importer_1 = require("../texture-importer/texture-importer");
__exportStar(require("./types"), exports);
const importers = {
    img: texture_importer_1.TextureImporter,
};
function createBufferImporter(buffer, ctx = global_1.GlobalContext()) {
    const wrapper = {};
    for (const importer in importers) {
        wrapper[importer] = (options) => importers[importer].import(buffer, options, ctx);
    }
    return wrapper;
}
exports.AssetsImporter = {
    importers: importers,
    async url(url, ctx = global_1.GlobalContext()) {
        const buffer = await fetch(url).then(r => r.arrayBuffer());
        return createBufferImporter(buffer, ctx);
    },
    async buffer(buffer, ctx = global_1.GlobalContext()) {
        return createBufferImporter(buffer, ctx);
    }
};
//# sourceMappingURL=assets-importer.js.map