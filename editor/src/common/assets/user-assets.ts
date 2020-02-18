
import { Asset, IAsset, IEventSource, EventDefinitions, EventKeys, EventEmitter } from "zogra-renderer";
import { ZograEditor } from "../zogra-editor";


interface AssetsFolderEvents extends EventDefinitions
{
    change: (type: "remove" | "add", asset: IAsset, folder: AssetsFolder) => void;
}

export class IAssetNode
{
    name: string;
    protected _parent: AssetsFolder | null = null;
    get parent() { return this._parent }
    set parent(parent: AssetsFolder | null)
    {
        parent?.add(this);
        this._parent = parent;
    }
    get path(): string
    {
        return (this.parent?.path ?? "") + "/" + this.name;
    }
    constructor(name: string, parent: AssetsFolder | null = null)
    {
        this.name = name || "new_folder";
        parent?.add(this);
    }
}

export class AssetsFolder extends IAssetNode implements IEventSource<AssetsFolderEvents>
{
    private eventEmitter = new EventEmitter();
    children: IAssetNode[] = [];
    constructor(name: string = "new_folder", parent: AssetsFolder | null = null)
    {
        super(name, null);
        this.parent = parent;
    }

    find(path: string): IAssetNode | null
    {
        if (this.parent === null)
            path = path.replace(/^\/assets/, "");
        const [name, ...subPath] = path.split("/").filter(t => t !== "");
        const node = this.children.filter(asset => asset.name === name)[0];
        if (subPath.length > 0)
        {
            if (node instanceof AssetsFolder)
                return node.find(subPath.join("/"));
            return null;
        }
        return node;
    }
    private addInternal(asset: IAssetNode)
    {
        if (this.children.some(child => child.name === asset.name))
            return;
        this.children.push(asset);
        if (asset.parent)
            asset.parent.removeInternal(asset);
        asset.parent = this;
        
        this.eventBubble("change", "add", asset, this);
    }
    private removeInternal(asset: IAssetNode)
    {
        this.children = this.children.filter(child => child !== asset);
        this.eventBubble("change", "remove", asset, this);
    }
    private eventBubble(event: string, ...args: any[])
    {
        this.eventEmitter.emit(event, ...args);
        this.parent?.eventBubble(event, ...args);
    }
    add(asset: IAssetNode | IAsset)
    {
        if (!(asset instanceof AssetsFolder || asset instanceof AssetNode))
            asset = new AssetNode(asset as IAsset);
        this.addInternal(asset as IAssetNode);
    }
    remove(asset: IAssetNode | IAsset)
    {
        if (!(asset instanceof AssetsFolder || asset instanceof AssetNode))
        {
            asset = this.children.filter(node => (node instanceof AssetNode && node.asset === asset))[0];
            if (!asset)
                return;
        }
        this.removeInternal(asset as IAssetNode);
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

export class AssetNode extends IAssetNode
{
    asset: IAsset;
    constructor(asset: IAsset, parent: AssetsFolder | null = null)
    {
        super(asset.name, null);
        this.asset = asset;
        this.parent = parent;
    }
}