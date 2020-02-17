
export const newAssetID = (() =>
{
    let id = 1;//Math.floor(Math.random() * 0x1000000 + 0x1000000);
    return () => id++;
})();

export interface IAsset
{
    assetID: number;
    name: string;
    destroy(): void;
}
export class Asset implements IAsset
{
    assetID: number;
    name: string;
    protected destroyed: boolean = false;
    constructor(name?:string)
    {
        this.assetID = newAssetID();
        this.name = name || `Asset_${this.assetID}`;
    }
    destroy()
    {
        this.destroyed = true;
    }
}

export const AssetManager = {
    newAssetID: newAssetID,
};