import { Asset } from "../../core/asset";
import { GLContext } from "../../core/global";
export declare class AssetsCollection {
    assets: Asset[];
    add(asset: Asset): void;
    get<T extends typeof Asset>(Type: T): InstanceType<T> | null;
    getAll<T extends typeof Asset>(Type: T): InstanceType<T>[];
}
export interface AssetsImporter {
    import(buffer: ArrayBuffer, ctx?: GLContext): Promise<AssetsCollection>;
}
