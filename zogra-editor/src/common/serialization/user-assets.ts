import { AssetImportOptions, AssetManager, IAsset } from "zogra-renderer";
import { ImportedAssetsPack, UserAssetsManager, AssetsFolder, AssetNode } from "../assets/user-assets";
import { SerializedAsset, SerializedAssetFolder, serializeAsset, deserializeAsset, restoreAssetProps } from "./asset";
import { panic } from "../../util/utils";
import path from "path-browserify";

type AssetsPackImportSettings = Pick<ImportedAssetsPack, "importer" | "options" | "src" | "path">;

export interface SerializedUserAssets
{
    imports: AssetsPackImportSettings[];
    managedAssets: SerializedAsset[];
    workspace: SerializedAssetFolder;
}

function serializeImports(manager: UserAssetsManager): AssetsPackImportSettings[]
{
    return Array.from(manager.importedPacks.values())
        .map(t => ({ importer: t.importer, src: t.src, options: t.options, path: t.path }));
}

function serializeAssets(manager: UserAssetsManager): SerializedAsset[]
{
    return Array.from(manager.userAssets.keys()).map(id => serializeAsset(AssetManager.find(id) as IAsset, manager));
}


function serializeFolder(folder: AssetsFolder): SerializedAssetFolder
{
    return {
        name: folder.name,
        children: folder.children.map(child => child instanceof AssetNode ? child.asset.assetID : serializeFolder(child as AssetsFolder))
    };
}

function serializeWorkspace(manager: UserAssetsManager): SerializedAssetFolder
{
    return serializeFolder(manager.root);
}

export function serializeUserAssets(manager: UserAssetsManager): SerializedUserAssets
{
    return {
        imports: serializeImports(manager),
        managedAssets: serializeAssets(manager),
        workspace: serializeWorkspace(manager),
    };
}

export async function deserializeUserAssets(serialized: SerializedUserAssets, manager: UserAssetsManager)
{
    for(const importAsset of serialized.imports)
    {
        await manager.import(importAsset.importer, importAsset.src, importAsset.options, importAsset.path);
    }
    const restoredAssets = new Map<number, IAsset>();
    for (const serializedAsset of serialized.managedAssets)
    {
        const asset = deserializeAsset(serializedAsset, manager, restoredAssets);
        if (asset)
        {
            restoredAssets.set(serializedAsset.assetID, asset);
            if (serializedAsset.restore === "create")
            {
                manager.add(asset, path.dirname(serializedAsset.path));
            }
        }
        else
            console.warn(`Failed to restore asset '${serializedAsset.name}' with ID '${serializedAsset.assetID}'.`);
    }
    for (const serializedAsset of serialized.managedAssets)
    {
        const asset = restoredAssets.get(serializedAsset.assetID);
        if (!asset)
            continue;
        restoreAssetProps(asset, serializedAsset, manager, restoredAssets);
    }
    restoreWorkspace(serialized.workspace, manager.root, restoredAssets);
    return restoredAssets;
}

function restoreWorkspace(folder: SerializedAssetFolder, current: AssetsFolder, restoredAssets: Map<number, IAsset>)
{
    for (const child of folder.children)
    {
        if (typeof (child) === "number")
            current.add(restoredAssets.get(child) ?? panic(`Missing asset with id '${child}'.`));
        else
        {
            const subFolder = current.mkdir(child.name);
            restoreWorkspace(child, subFolder, restoredAssets);
        }
    }
}