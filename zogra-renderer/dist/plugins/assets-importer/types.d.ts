import { IAsset } from "../../core/asset";
import { ConstructorType } from "../../utils/util";
import { GLContext } from "../../core/global";
export declare class AssetsPack {
    mainAsset: IAsset | null;
    assets: Map<string, IAsset>;
    add(name: string, asset: IAsset): void;
    setMain(asset: IAsset): void;
    get<T extends IAsset>(Type: ConstructorType<T>): T | null;
    getAll<T extends IAsset>(Type: ConstructorType<T>): T[];
}
export interface AssetImporterPlugin<TOption, TAsset> {
    import(buffer: ArrayBuffer, options?: TOption, ctx?: GLContext): Promise<TAsset>;
}
declare type SerializableValueType = number | string | boolean | {
    [key: string]: SerializableValueType;
} | SerializableValueType[];
export interface AssetImportOptions {
    [key: string]: SerializableValueType;
}
export {};
