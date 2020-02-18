"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./assets-importer/assets-importer"));
const fbx_importer_1 = require("./fbx-importer/fbx-importer");
exports.FBXImporter = fbx_importer_1.FBXImporter;
const texture_importer_1 = require("./texture-importer/texture-importer");
exports.TextureImporter = texture_importer_1.TextureImporter;
//# sourceMappingURL=plugins.js.map