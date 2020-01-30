import { IAsset } from "../../core/asset";
import { GLContext } from "../../core/global";
import { ConstructorType } from "../../utils/util";
export declare class AssetsCollection {
    assets: IAsset[];
    add(asset: IAsset): void;
    get<T extends IAsset>(Type: ConstructorType<T>): T | null;
    getAll<T extends IAsset>(Type: ConstructorType<T>): T[];
}
export interface AssetsImporter {
    import(buffer: ArrayBuffer, ctx?: GLContext): Promise<AssetsCollection>;
}
export declare const AssetsImporter: {
    blob(blob: Blob): {
        fbx: () => Promise<AssetsCollection>;
    };
    buffer(buffer: ArrayBuffer): {
        fbx: () => Promise<AssetsCollection>;
    };
};
