import { FilterMode, Texture2D, WrapMode } from "../../core/core";
import { TextureFormat } from "../../core/texture-format";
import { AssetImporterPlugin, AssetsImporter } from "../assets-importer/assets-importer";
export interface TextureImportOptions {
    width: number;
    height: number;
    filterMode: FilterMode;
    mipmap: boolean;
    wrapMpde: WrapMode;
    format: TextureFormat;
}
export declare const TextureImporter: AssetsImporter<{
    tex2d: AssetImporterPlugin<Partial<TextureImportOptions>, Texture2D>;
}>;
