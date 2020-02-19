import { ConstructorType } from "../utils/util";

const {newAssetID, findAsset, destroyAsset, findAssetsOfType} = (() =>
{
    let id = 1;//Math.floor(Math.random() * 0x1000000 + 0x1000000);
    const assetsMap = new Map<number, IAsset>();
    return {
        newAssetID(assset: IAsset)
        {
            const currentId = ++id;
            assetsMap.set(currentId, assset);
            return assset.assetID = currentId;
        },
        findAsset(id: number)
        {
            return assetsMap.get(id);
        },
        destroyAsset(id: number)
        {
            assetsMap.delete(id);
        },
        findAssetsOfType<T extends IAsset>(type: ConstructorType<T>): T[]
        {
            return Array.from(assetsMap.values()).filter(asset => asset instanceof type) as T[];
        },
    }
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
        this.assetID = newAssetID(this);
        this.name = name || `Asset_${this.assetID}`;
    }
    destroy()
    {
        this.destroyed = true;
        destroyAsset(this.assetID);
    }
}

export const AssetManager = {
    newAssetID: newAssetID,
    find: findAsset,
    destroy: destroyAsset,
    findAssetsOfType: findAssetsOfType
};