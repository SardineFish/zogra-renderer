import { AssetImportOptions, AssetManager, IAsset } from "zogra-renderer";
import { ImportedAssetsPack, UserAssetsManager, AssetsFolder, AssetNode } from "../assets/user-assets";
import { SerializedAsset, SerializedAssetFolder, serializeAsset } from "./asset";

type AssetsPackImportSettings = Pick<ImportedAssetsPack, "importer" | "options" | "src">;

export interface SerializedUserAssets
{
    imports: AssetsPackImportSettings[];
    managedAssets: SerializedAsset[];
    workspace: SerializedAssetFolder;
}

function serializeImports(manager: UserAssetsManager): AssetsPackImportSettings[]
{
    return Array.from(manager.importedPacks.values())
        .map(t => ({ importer: t.importer, src: t.src, options: t.options }));
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