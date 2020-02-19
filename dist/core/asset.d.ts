import { ConstructorType } from "../utils/util";
export interface IAsset {
    assetID: number;
    name: string;
    destroy(): void;
}
export declare class Asset implements IAsset {
    assetID: number;
    name: string;
    protected destroyed: boolean;
    constructor(name?: string);
    destroy(): void;
}
export declare const AssetManager: {
    newAssetID: (assset: IAsset) => number;
    find: (id: number) => IAsset | undefined;
    destroy: (id: number) => void;
    findAssetsOfType: <T extends IAsset>(type: ConstructorType<T>) => T[];
};
