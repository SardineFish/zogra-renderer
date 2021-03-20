"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureImporter = void 0;
const core_1 = require("../../core/core");
const global_1 = require("../../core/global");
const texture_format_1 = require("../../core/texture-format");
const assets_importer_1 = require("../assets-importer/assets-importer");
const Texture2DImporter = {
    import(buffer, options, ctx = global_1.GlobalContext()) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([buffer]);
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            const complete = () => {
                const defulatOptions = {
                    width: img.width,
                    height: img.height,
                    filterMode: core_1.FilterMode.Linear,
                    format: texture_format_1.TextureFormat.RGBA,
                    mipmap: true,
                    wrapMpde: core_1.WrapMode.Repeat
                };
                const opt = Object.assign(Object.assign({}, defulatOptions), options);
                const tex = new core_1.Texture2D(opt.width, opt.height, opt.format, opt.filterMode, ctx);
                tex.autoMipmap = opt.mipmap;
                tex.wrapMode = opt.wrapMpde;
                tex.updateParameters();
                tex.setData(img);
                resolve(tex);
            };
            if (img.complete)
                complete();
            else
                img.onload = complete;
        });
    }
};
const importers = {
    tex2d: Texture2DImporter,
};
exports.TextureImporter = new assets_importer_1.AssetsImporter(importers);
//# sourceMappingURL=texture-importer.js.map