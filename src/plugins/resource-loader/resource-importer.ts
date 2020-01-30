import { Asset } from "../../core/asset";


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

export interface ResourceImporter
{
    
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