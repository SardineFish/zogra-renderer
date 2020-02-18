"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assets_importer_1 = require("../assets-importer/assets-importer");
const core_1 = require("../../core/core");
const texture_format_1 = require("../../core/texture-format");
const global_1 = require("../../core/global");
exports.TextureImporter = {
    import(buffer, ctx = global_1.GlobalContext()) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([buffer]);
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            const complete = () => {
                const tex = new core_1.Texture2D(img.width, img.height, texture_format_1.TextureFormat.RGBA, core_1.FilterMode.Linear, ctx);
                tex.setData(img);
                const pack = new assets_importer_1.AssetsPack();
                pack.add(tex);
                pack.setMain(tex);
                resolve(pack);
            };
            if (img.complete)
                complete();
            else
                img.onload = complete;
        });
    }
};
//# sourceMappingURL=texture-importer.js.map