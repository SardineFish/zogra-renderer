import sphere from "../asset/model/sphere.bin.fbx";
import { ZograEngine, plugins, Entity, vec3 } from "zogra-renderer";

export async function initScene(engine: ZograEngine)
{
    const asset = await fetch(sphere)
        .then(r => r.arrayBuffer())
        .then(buffer => plugins.FBXImporter.import(buffer));
    const entity = asset.mainAsset as Entity;
    entity.localScaling = vec3(.1, .1, .1);
    engine.scene.add(entity);
}