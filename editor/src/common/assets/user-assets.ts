
import { Asset, IAsset, IEventSource, EventDefinitions, EventKeys, EventEmitter } from "zogra-renderer";
import { ZograEditor } from "../zogra-editor";


interface AssetsFolderEvents extends EventDefinitions
{
    change: (type: "remove" | "add", asset: IAsset, folder: AssetsFolder) => void;
}

export class AssetsFolder extends Asset implements IEventSource<AssetsFolderEvents>
{
    private _parent: AssetsFolder | null = null;
    children: IAsset[] = [];
    private eventEmitter = new EventEmitter();
    constructor(name?: string, parent: AssetsFolder | null = null)
    {
        super(name);
        if (!name && !parent)
            this.name === "assets";
        parent?.add(this);
    }

    get parent() { return this._parent }
    set parent(parent: AssetsFolder | null)
    {
        if (this._parent)
            this._parent.removeInternal(this);
        this._parent = parent;
        parent?.addInternal(this);
    }

    find(name: string)
    {
        return this.children.filter(asset => asset.name === name)[0];
    }
    private addInternal(asset: IAsset)
    {
        if (this.children.some(child => child === asset))
            return;
        this.children.push(asset);
        this.eventBubble("change", "add", asset, this);
    }
    private removeInternal(asset: IAsset)
    {
        this.children = this.children.filter(child => child !== asset);
        this.eventBubble("change", "remove", asset, this);
    }
    private eventBubble(event: string, ...args: any[])
    {
        this.eventEmitter.emit(event, ...args);
        this.parent?.eventBubble(event, ...args);
    }
    add(asset: IAsset)
    {
        if (asset instanceof AssetsFolder)
            asset.parent = this;
        else
            this.addInternal(asset);
    }
    remove(asset: IAsset)
    {
        if (asset instanceof AssetsFolder)
            asset.destroy();
        else
            this.removeInternal(asset);
    }
    destroy()
    {
        if (this.destroyed)
            return;
        
        this.children = [];
        this.parent?.removeInternal(this);
        
        super.destroy();
    }
    on<T extends EventKeys<AssetsFolderEvents>>(event: T, listener: AssetsFolderEvents[T]): void
    {
        return this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<AssetsFolderEvents>>(event: T, listener: AssetsFolderEvents[T]): void
    {
        return this.eventEmitter.off(event, listener);
    }
}