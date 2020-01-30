import { Asset } from "../../core/asset";
export declare class AssetsCollection {
    assets: Asset[];
    add(asset: Asset): void;
    get<T extends typeof Asset>(Type: T): InstanceType<T> | null;
    getAll<T extends typeof Asset>(Type: T): InstanceType<T>[];
}
export interface ResourceImporter {
}
