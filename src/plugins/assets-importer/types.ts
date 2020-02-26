import { IAsset } from "../../core/asset";
import { ConstructorType } from "../../utils/util";
import { GLContext } from "../../core/global";


export class AssetsPack
{
    mainAsset: IAsset | null = null;
    assets: Map<string, IAsset> = new Map();
    add(name: string, asset: IAsset)
    {
        asset.name = name;
        this.assets.set(name, asset);
    }
    setMain(asset: IAsset)
    {
        this.mainAsset = asset;
    }
    get<T extends IAsset>(Type: ConstructorType<T>): T | null
    {
        for (const [name, asset] of this.assets)
        {
            if (asset instanceof Type)
                return asset as T;
        }
        return null;
    }
    getAll<T extends IAsset>(Type: ConstructorType<T>): T[]
    {
        return Array.from(this.assets.values()).filter(asset => asset instanceof Type) as T[];
    }
}

export interface AssetsImporterPlugin
{
    import(buffer: ArrayBuffer, options?: AssetImportOptions, ctx?: GLContext): Promise<AssetsPack>;
}

type SerializableValueType = number | string | boolean | { [key: string]: SerializableValueType } | SerializableValueType[];

export interface AssetImportOptions 
{
    [key: string]: SerializableValueType;
}