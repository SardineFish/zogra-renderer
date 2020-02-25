"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("../../core/global");
const fbx_importer_1 = require("../fbx-importer/fbx-importer");
const texture_importer_1 = require("../texture-importer/texture-importer");
const utils_1 = require("../fbx-importer/utils");
__export(require("./types"));
const importers = {
    img: texture_importer_1.TextureImporter,
    fbx: fbx_importer_1.FBXImporter
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
    async blob(blob, ctx = global_1.GlobalContext()) {
        return createBufferImporter(await utils_1.readBlob(blob), ctx);
    },
    async buffer(buffer, ctx = global_1.GlobalContext()) {
        return createBufferImporter(buffer, ctx);
    }
};
//# sourceMappingURL=assets-importer.js.map