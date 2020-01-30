
export const newAssetID = (() =>
{
    let id = 1;//Math.floor(Math.random() * 0x1000000 + 0x1000000);
    return () => id++;
})();

export interface IAsset
{
    assetID: number;
}
export class Asset implements IAsset
{
    assetID: number;
    constructor()
    {
        this.assetID = newAssetID();
    }
}

export const AssetManager = {
    newAssetID: newAssetID
};