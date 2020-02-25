import sphere from "../asset/model/sphere.bin.fbx";
import { ZograEngine, plugins, Entity, vec3 } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";
import { AssetsFolder, UserAssetsManager } from "./assets/user-assets";
import texUVGrid from "../asset/img/uv_grid.png";
import aofbx from "../asset/model/ao.bin.fbx";
import aoLightmap from "../asset/img/ao.lightmap.png";
import { serializeProject } from "./serialization/project";


export async function loadSampleProject(editor: ZograEditor)
{
    const root = editor.assets.root;

    createFolders(editor);

    await loadAssets(editor.assets);

    await initScene(editor);

    console.log(serializeProject(editor));

    return root;
}

function createFolders(editor: ZograEditor)
{
    const root = editor.assets.root;
    const shaders = new AssetsFolder("shaders", root);
    const models = new AssetsFolder("models", root);
    const materials = new AssetsFolder("materials", root);
    const textures = new AssetsFolder("textures", root);

    shaders.add(editor.engine.renderer.assets.shaders.DefaultShader);
    shaders.add(editor.engine.renderer.assets.shaders.BlitCopy);

    models.add(editor.engine.renderer.assets.meshes.cube);
    models.add(editor.engine.renderer.assets.meshes.quad);

    materials.add(new editor.engine.renderer.assets.types.DefaultMaterial());
}

async function loadAssets(manager: UserAssetsManager)
{
    (await manager.import("img", texUVGrid, {}, "/assets/textures"));
    manager.import("fbx", aofbx, {}, "/assets/models");
    manager.import("img", aoLightmap, {}, "/assets/textures");
}

async function initScene(editor: ZograEditor)
{
    const asset = await editor.assets.import("fbx", sphere, {}, "/assets/models");

    const entity = asset.mainAsset as Entity;
    entity.localScaling = vec3(.1, .1, .1);
    editor.engine.scene.add(entity);
}
