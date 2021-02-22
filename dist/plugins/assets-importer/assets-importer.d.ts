import { GLContext } from "../../core/global";
import { AssetsPack, AssetImportOptions } from "./types";
export * from "./types";
declare const importers: {
    img: import("./types").AssetsImporterPlugin;
};
declare type BufferImporter = {
    [key in keyof typeof importers]: (options: AssetImportOptions) => Promise<AssetsPack>;
};
export declare const AssetsImporter: {
    importers: {
        img: import("./types").AssetsImporterPlugin;
    };
    url(url: string, ctx?: GLContext): Promise<BufferImporter>;
    buffer(buffer: ArrayBuffer, ctx?: GLContext): Promise<BufferImporter>;
};
