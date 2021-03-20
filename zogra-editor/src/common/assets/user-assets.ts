
import { Asset, IAsset, IEventSource, EventDefinitions, EventKeys, EventEmitter, AssetManager, AssetImportOptions, AssetsPack, AssetsImporter } from "zogra-renderer";
import { ZograEditor } from "../zogra-editor";
import { BiMap } from "../../util/utils";
import { initEditorAssets } from "./assets";
import Path from "path-browserify";


interface AssetsFolderEvents extends EventDefinitions
{
    change: (type: "remove" | "add", asset: IAsset, folder: AssetsFolder) => void;
    destroy: (folder: AssetsFolder) => void;
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
    destroy()
    {
        this.parent?.remove(this);
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
        if (!asset)
            return;
        if (!(asset instanceof AssetsFolder || asset instanceof AssetNode))
            asset = new AssetNode(asset as IAsset);
        this.addInternal(asset as IAssetNode);
    }
    mkdir(dirname: string): AssetsFolder
    {
        if (dirname.startsWith("/"))
        {
            if (!this.parent)
            {
                const [, selfName, ...sub] = dirname.split("/");
                if (selfName !== this.name)
                    throw new Error(`Failed to create invalid folder '${dirname}'`);
                dirname = sub.join("/");
            }
            else
                return this.parent.mkdir(dirname);
        }
        const [name, ...sub] = dirname.split("/");
        if (name === "")
            return this;
        const existed = this.find(name);
        if (existed instanceof AssetsFolder)
            return existed.mkdir(sub.join("/"));
        else if (existed == null)
            return new AssetsFolder(name, this).mkdir(sub.join("/"));
        else
            throw new Error(`'${dirname}' is not a directory.`);
    }
    exists(name: string)
    {
        return this.find(name) != null;
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
    destroy()
    {
        for (const child of this.children)
            child.destroy();
        super.destroy();
        this.eventEmitter.emit("destroy", this);
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
    destroy()
    {
        this.asset.destroy();
        super.destroy();
    }
}

interface ManagedUserAsset
{
    import: "import" | "create";
    path: string;
}

export interface ImportedAssetsPack
{
    pack: AssetsPack;
    importer: keyof typeof AssetsImporter.importers;
    src: string;
    path: string;
    options: AssetImportOptions;
}

export class UserAssetsManager
{
    builtinAssets = new BiMap<string, IAsset>();
    userAssets = new Map<number, ManagedUserAsset>();
    importedPacks: ImportedAssetsPack[] = [];

    root: AssetsFolder;
    internal: ReturnType<typeof initEditorAssets>;

    constructor()
    {
        AssetManager.on("asset-destroyed", (asset) => this.onAssetDestroy(asset));
        this.root = new AssetsFolder("assets", null);
        this.internal = initEditorAssets();
    }
    private onAssetDestroy(asset: IAsset)
    {
        this.userAssets.delete(asset.assetID);
    }
    registerBuiltinAsset(asset: IAsset, name: string)
    {
        this.builtinAssets.set(name, asset);
    }
    registerUserAsset(asset: IAsset, data: ManagedUserAsset)
    {
        this.userAssets.set(asset.assetID, data);
    }
    async import(importer: keyof typeof AssetsImporter.importers, url: string, options: AssetImportOptions, folder = "/assets", name = Path.basename(url))
    {

        const pack = await AssetsImporter.url(url).then(buf => buf[importer](options));
        this.importedPacks.push({
            importer: importer,
            pack: pack,
            src: url,
            options: options,
            path: folder
        });

        let container = this.root.mkdir(folder);
        if (container.exists(name))
        {
            let numedName = name;
            for (let i = 1; container.exists(numedName); i++)
                numedName = name + "_" + i;
        }
        
        if (pack.assets.size === 1)
        {
            const asset = [...pack.assets.values()][0];
            asset.name = name;
            container.add(asset);
            this.userAssets.set(asset.assetID, {
                path: Path.join(folder, name),
                import: "import"
            });
        }
        else if (pack.assets.size > 1)
        {
            const subFolder = container.mkdir(name);
            for (const [, asset] of pack.assets)
            {
                subFolder.add(asset);
                this.userAssets.set(asset.assetID, {
                    path: Path.join(folder, name, asset.name),
                    import: "import"
                });
            }
        }
        
        return pack;
    }
    add(asset: IAsset, folder = "/assets")
    {
        let container = this.root.mkdir(folder);
        if (!(container instanceof AssetsFolder))
            container = this.root;
        this.userAssets.set(asset.assetID, {
            import: "create",
            path: Path.join(container.path, asset.name)
        });
        
        container.add(asset);
    }
}

//export const UserAssetsManager = new UserAssetsManagerType();