import { SerializedAsset, SerializedAssetFolder } from "./asset";
import { UserAssetsManager } from "../assets/user-assets";
import { ZograEditor } from "../zogra-editor";
import { SerializedUserAssets, serializeUserAssets, deserializeUserAssets } from "./user-assets";
import { Scene } from "zogra-renderer";

export interface SerializedProject
{
    version: string;
    assets: SerializedUserAssets;
    activeScene: number;
}

export function serializeProject(editor: ZograEditor) : SerializedProject
{
    return {
        version: "0.1",
        assets: serializeUserAssets(editor.assets),
        activeScene: editor.engine.scene.assetID
    };
}

export async function deserializeProject(editor: ZograEditor, project: SerializedProject)
{
    const restoredAssets = await deserializeUserAssets(project.assets, editor.assets);
    editor.engine.scene = restoredAssets.get(project.activeScene) as Scene;

}