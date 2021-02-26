import { FilterMode, Texture2D, WrapMode } from "../../core/core";
import { GlobalContext } from "../../core/global";
import { TextureFormat } from "../../core/texture-format";
import { AssetImporterPlugin, AssetsImporter } from "../assets-importer/assets-importer";

export interface TextureImportOptions
{
    width: number;
    height: number;
    filterMode: FilterMode;
    mipmap: boolean;
    wrapMpde: WrapMode;
    format: TextureFormat;
}

const Texture2DImporter: AssetImporterPlugin<Partial<TextureImportOptions>, Texture2D> = {
    import(buffer, options?: Partial<TextureImportOptions>, ctx = GlobalContext())
    {
        return new Promise<Texture2D>((resolve, reject) =>
        {
            const blob = new Blob([buffer]);
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            const complete = () =>
            {
                const defulatOptions = <TextureImportOptions>{
                    width: img.width,
                    height: img.height,
                    filterMode: FilterMode.Linear,
                    format: TextureFormat.RGBA,
                    mipmap: true,
                    wrapMpde: WrapMode.Repeat
                };
                const opt = { ...defulatOptions, ...options };
                const tex = new Texture2D(opt.width, opt.height, opt.format, opt.filterMode, ctx);
                tex.autoMipmap = opt.mipmap;
                tex.wrapMode = opt.wrapMpde;

                tex.setData(img);
                resolve(tex);
            };
            if (img.complete)
                complete();
            else
                img.onload = complete;
        });
    }
}

const importers = {
    tex2d: Texture2DImporter,
}

export const TextureImporter = new AssetsImporter(importers);
