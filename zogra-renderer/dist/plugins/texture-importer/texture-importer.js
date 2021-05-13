import { FilterMode, Texture2D, WrapMode } from "../../core";
import { GlobalContext } from "../../core/global";
import { TextureFormat } from "../../core/texture-format";
import { AssetsImporter } from "../assets-importer/assets-importer";
const Texture2DImporter = {
    import(buffer, options, ctx = GlobalContext()) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([buffer]);
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            const complete = () => {
                const defulatOptions = {
                    width: img.width,
                    height: img.height,
                    filterMode: FilterMode.Linear,
                    format: TextureFormat.RGBA,
                    mipmap: true,
                    wrapMpde: WrapMode.Repeat
                };
                const opt = Object.assign(Object.assign({}, defulatOptions), options);
                const tex = new Texture2D(opt.width, opt.height, opt.format, opt.filterMode, ctx);
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
export const TextureImporter = new AssetsImporter(importers);
//# sourceMappingURL=texture-importer.js.map