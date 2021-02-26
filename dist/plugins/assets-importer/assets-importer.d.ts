import { Asset } from "../../core/asset";
import { AssetImporterPlugin, AssetsPack } from "./types";
export * from "./types";
interface Importers {
    [key: string]: AssetImporterPlugin<any, Asset | AssetsPack>;
}
export declare class AssetsImporter<T extends Importers> {
    private importers;
    constructor(importers: T);
    url(url: string, ctx?: import("../../core/global").GLContext): Promise<BufferImporter<T>>;
    buffer(buffer: ArrayBuffer, ctx?: import("../../core/global").GLContext): Promise<BufferImporter<T>>;
}
declare type BufferImporter<T extends Importers> = {
    [key in keyof T]: (options?: Parameters<T[key]["import"]>["1"]) => ReturnType<T[key]["import"]>;
};
