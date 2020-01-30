export declare const newAssetID: () => number;
export interface IAsset {
    assetID: number;
    name: string;
}
export declare class Asset implements IAsset {
    assetID: number;
    name: string;
    constructor(name?: string);
}
export declare const AssetManager: {
    newAssetID: () => number;
};
