import { Asset, IAsset } from "../../core/asset";
import { GLContext } from "../../core/global";
import { FBXImporter } from "../fbx-importer/fbx-importer";
import { readBlob } from "../fbx-importer/utils";
import { ConstructorType } from "../../utils/util";


export class AssetsPack
{
    mainAsset: IAsset | null = null;
    assets: Set<IAsset> = new Set();
    add(asset: IAsset)
    {
        this.assets.add(asset);
    }
    setMain(asset: IAsset)
    {
        this.mainAsset = asset;
    }
    get<T extends IAsset>(Type: ConstructorType<T>): T | null
    {
        for (const asset of this.assets)
        {
            if (isInheritFrom(asset, Type))
                return asset as T;
        }
        return null;
    }
    getAll<T extends IAsset>(Type: ConstructorType<T>): T[]
    {
        return Array.from(this.assets).filter(asset => isInheritFrom(asset, Type)) as T[];
    }
}

export interface AssetsImporter
{
    import(buffer: ArrayBuffer, ctx?: GLContext): Promise<AssetsPack>;
}

export const AssetsImporter = {
    blob(blob: Blob)
    {
        return {
            fbx: async () => await FBXImporter.import(await readBlob(blob)),
        };
    }, 
    buffer(buffer: ArrayBuffer)
    {
        return {
            fbx: () => FBXImporter.import(buffer),
        };
    }
}

function isInheritFrom(obj: Object, Type: Function)
{
    for (var constructor = obj.constructor; constructor != null; constructor = constructor.prototype)
    {
        if (constructor === Type)
            return true;
    }
    return false;
}