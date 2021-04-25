import { ConstructorType, setImmediate } from "../utils/util";
import { EventDefinitions, IEventSource, EventKeys, EventEmitter } from "./event";
import { GLContext, GlobalContext } from "./global";

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
export abstract class GPUAsset extends Asset
{
    protected ctx: GLContext;
    protected initialized = false;

    constructor(ctx = GlobalContext(), name?:string)
    {
        super(name);
        this.ctx = ctx;
    }

    protected tryInit(required = false): boolean
    {
        if (this.initialized)
            return true;
        if (!this.ctx)
            this.ctx = GlobalContext();
        
        const success = this.ctx && this.init();
        
        if (!success && required)
            throw new Error(`Failed to init GPU Asset '${this.name}' without global gl context.`);
        
        this.initialized = success;
        
        return success;
    }

    protected abstract init(): boolean;
}

export abstract class LazyInitAsset extends Asset
{
    protected ctx: GLContext;
    protected initialzed = false;

    constructor(ctx = GlobalContext())
    {
        super();
        this.ctx = ctx;
    }

    protected abstract init(): boolean;

    protected tryInit(required = false)
    {
        if (this.initialzed)
            return true;
        const ctx = this.ctx || GlobalContext();
        if (!ctx)
        {
            if (required)
                throw new Error("Failed to initialize GPU resource withou a global GL context.");
            return false;
        }
        this.ctx = ctx;

        if (this.init())
        {
            this.initialzed = true;
            return true;
        }
        else
        {
            if (required)
                throw new Error("Failed to initialize required GPU resource.");
            return false;
        }
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

export interface ICloneable
{
    clone(): ThisType<this>;
}

export const AssetManager = new AssetManagerType();