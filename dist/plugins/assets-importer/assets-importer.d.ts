import { IAsset } from "../../core/asset";
import { GLContext } from "../../core/global";
import { ConstructorType } from "../../utils/util";
export declare class AssetsPack {
    mainAsset: IAsset | null;
    assets: Set<IAsset>;
    add(asset: IAsset): void;
    setMain(asset: IAsset): void;
    get<T extends IAsset>(Type: ConstructorType<T>): T | null;
    getAll<T extends IAsset>(Type: ConstructorType<T>): T[];
}
export interface AssetsImporter {
    import(buffer: ArrayBuffer, ctx?: GLContext): Promise<AssetsPack>;
}
export declare const AssetsImporter: {
    blob(blob: Blob): {
        fbx: () => Promise<AssetsPack>;
    };
    buffer(buffer: ArrayBuffer): {
        fbx: () => Promise<AssetsPack>;
    };
};
