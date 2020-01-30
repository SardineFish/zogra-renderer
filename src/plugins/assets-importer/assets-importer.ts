import { Asset } from "../../core/asset";
import { GLContext } from "../../core/global";
import { FBXImporter } from "../fbx-importer/fbx-importer";
import { readBlob } from "../fbx-importer/utils";


export class AssetsCollection
{
    assets: Asset[] = [];
    add(asset: Asset)
    {
        this.assets.push(asset);
    }
    get<T extends typeof Asset>(Type: T): InstanceType<T> | null
    {
        return this.assets.find(asset => asset.constructor === Type) as InstanceType<T>;
    }
    getAll<T extends typeof Asset>(Type: T): InstanceType<T>[]
    {
        return this.assets.filter(asset => isInheritFrom(asset, Type)) as InstanceType<T>[];
    }
}

export interface AssetsImporter
{
    import(buffer: ArrayBuffer, ctx?: GLContext): Promise<AssetsCollection>;
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