import { SerializedAsset, SerializedAssetFolder } from "./asset";
import { UserAssetsManager } from "../assets/user-assets";
import { ZograEditor } from "../zogra-editor";
import { SerializedUserAssets, serializeUserAssets } from "./user-assets";

export interface SerializedProject
{
    version: string;
    assets: SerializedUserAssets;
}

export function serializeProject(editor: ZograEditor) : SerializedProject
{
    return {
        version: "0.1",
        assets: serializeUserAssets(editor.assets)
    };
}

export function deserializeProject(editor: ZograEditor, project: SerializedProject)
{
    
}