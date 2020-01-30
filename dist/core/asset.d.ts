export declare const newAssetID: () => number;
export interface IAsset {
    assetID: number;
}
export declare class Asset implements IAsset {
    assetID: number;
    constructor();
}
export declare const AssetManager: {
    newAssetID: () => number;
};
