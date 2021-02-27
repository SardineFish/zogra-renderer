"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsImporter = void 0;
const global_1 = require("../../core/global");
__exportStar(require("./types"), exports);
// const importers = {
//     img: TextureImporter,
// };
class AssetsImporter {
    constructor(importers) {
        this.importers = importers;
    }
    async url(url, ctx = global_1.GlobalContext()) {
        const buffer = await fetch(url).then(r => r.arrayBuffer());
        return await this.buffer(buffer, ctx);
    }
    async buffer(buffer, ctx = global_1.GlobalContext()) {
        const bufImporters = {};
        for (const key in this.importers) {
            bufImporters[key] = (options) => this.importers[key].import(buffer, options, ctx);
        }
        return bufImporters;
    }
}
exports.AssetsImporter = AssetsImporter;
// type BufferImporter = { [key in keyof typeof importers]: (options: AssetImportOptions) => Promise<AssetsPack> };
// function createBufferImporter(buffer: ArrayBuffer, ctx = GlobalContext()): BufferImporter
// {
//     const wrapper = {} as any;
//     for (const importer in importers)
//     {
//         wrapper[importer] = (options?: AssetImportOptions) => importers[importer as keyof typeof importers].import(buffer, options, ctx);
//     }
//     return wrapper;
// }
// export const AssetsImporter = {
//     importers: importers,
//     async url(url: string, ctx = GlobalContext())
//     {
//         const buffer = await fetch(url).then(r => r.arrayBuffer());
//         return createBufferImporter(buffer, ctx);
//     },
//     async buffer(buffer: ArrayBuffer, ctx = GlobalContext())
//     {
//         return createBufferImporter(buffer, ctx);
//     }
// };
//# sourceMappingURL=assets-importer.js.map