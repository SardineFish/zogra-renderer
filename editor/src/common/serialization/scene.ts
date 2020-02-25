import { Scene } from "zogra-renderer";
import { SerializedAsset, serializeAsset } from "./asset";
import { UserAssetsManager } from "../assets/user-assets";

export interface SerializedScene extends SerializedAsset
{
    entities: SerializedAsset[];
}

export function serializeScene(scene: Scene, manager: UserAssetsManager) : SerializedScene
{
    return {
        assetID: scene.assetID,
        import: "unknown",
        name: scene.name,
        props: {},
        path: "",
        type: "scene",
        entities: scene.entities.map(entity => serializeAsset(entity, manager))
    };
}