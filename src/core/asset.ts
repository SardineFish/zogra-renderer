import { ConstructorType, setImmediate } from "../utils/util";
import { EventDefinitions, IEventSource, EventKeys, EventEmitter } from "./event";

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
        this.assetID = AssetManager.newAssetID(this);
        this.name = name || `Asset_${this.assetID}`;
    }
    destroy()
    {
        this.destroyed = true;
        AssetManager.destroy(this.assetID);
    }
}

interface AssetManagerEvents extends EventDefinitions
{
    "asset-created": (asset: IAsset) => void;
    "asset-destroyed": (asset: IAsset) => void;
}
class AssetManagerType implements IEventSource<AssetManagerEvents>
{
    private assetsMap = new Map<number, IAsset>();
    private id = 1;
    private eventEmitter = new EventEmitter<AssetManagerEvents>();
    constructor()
    {
        
    }
    newAssetID(asset: IAsset)
    {
        const currentId = ++this.id;
        this.assetsMap.set(currentId, asset);
        setImmediate(() => this.eventEmitter.emit("asset-created", asset));
        return asset.assetID = currentId;
    }
    find(name: string): IAsset | undefined
    find(id: number): IAsset | undefined
    find(id: number | string)
    {
        if (typeof (id) === "number")
            return this.assetsMap.get(id);
        else if (typeof (id) === "string")
        {
            for (const asset of this.assetsMap.values())
                if (asset.name === id)
                    return asset;
        }
        return undefined;
    }
    destroy(id: number)
    {
        const asset = this.assetsMap.get(id);
        if (!asset)
            return;
        this.assetsMap.delete(id);
        
        setImmediate(() => this.eventEmitter.emit("asset-destroyed", asset));
    }
    findAssetsOfType<T extends IAsset>(type: ConstructorType<T>): T[]
    {
        return Array.from(this.assetsMap.values()).filter(asset => asset instanceof type) as T[];
    }
    on<T extends EventKeys<AssetManagerEvents>>(event: T, listener: import("./event").EventListener): void
    {
        return this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<AssetManagerEvents>>(event: T, listener: import("./event").EventListener): void
    {
        return this.eventEmitter.off(event, listener);
    }
}

export const AssetManager = new AssetManagerType();