export declare const newAssetID: () => number;
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
    newAssetID: () => number;
};
