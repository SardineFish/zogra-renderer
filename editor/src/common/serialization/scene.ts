import { Scene, IAsset, Entity } from "zogra-renderer";
import { SerializedAsset, serializeAsset, deserializeAsset, restoreAssetProps } from "./asset";
import { UserAssetsManager } from "../assets/user-assets";
import { EditorEntity } from "../editor-entities";

export interface SerializedScene extends SerializedAsset
{
    entities: SerializedAsset[];
}

export function serializeScene(scene: Scene, manager: UserAssetsManager) : SerializedScene
{
    const editorEntity = scene.getEntitiesOfType(EditorEntity);
    if (editorEntity[0])
        scene.remove(editorEntity[0]);
    const serialized: SerializedScene = {
        assetID: scene.assetID,
        restore: "create",
        name: scene.name,
        props: {},
        path: manager.userAssets.get(scene.assetID)?.path ?? "/assets/" + scene.name,
        type: "scene",
        entities: scene.entities.map(entity => serializeAsset(entity, manager))
    };
    if (editorEntity[0])
        scene.add(editorEntity[0]);
    return serialized;
}

export function deserializeScene(scene: Scene, props: SerializedScene, manager: UserAssetsManager, restoredAssets: Map<number, IAsset>)
{

    const entities = props.entities.map(serialized =>
    {
        const entity = deserializeAsset(serialized, manager, restoredAssets);
        if (entity)
            restoredAssets.set(serialized.assetID, entity);
        return entity;
    });
    
    entities.forEach((entity, idx) =>
    {
        if (!(entity instanceof Entity))
            return;
        scene.add(entity);
        restoreAssetProps(entity, props.entities[idx], manager, restoredAssets);
    });

}