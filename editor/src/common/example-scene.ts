import sphere from "../asset/model/sphere.bin.fbx";
import { ZograEngine, plugins, Entity, vec3 } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";
import { AssetsFolder, UserAssetsManager } from "./assets/user-assets";
import texUVGrid from "../asset/img/uv_grid.png";
import aofbx from "../asset/model/ao.bin.fbx";
import aoLightmap from "../asset/img/ao.lightmap.png";
import { serializeProject, deserializeProject } from "./serialization/project";


export async function loadExampleProject(editor: ZograEditor)
{
    const root = editor.assets.root;

    createFolders(editor);

    await loadAssets(editor.assets);

    await initScene(editor);

    const serialized = serializeProject(editor);
    console.log(serialized);
    editor.assets = new UserAssetsManager();
    deserializeProject(editor, serialized);

    return root;
}

function createFolders(editor: ZograEditor)
{
    editor.assets.root.mkdir("shaders");
    editor.assets.root.mkdir("models");
    editor.assets.root.mkdir("materials");
    editor.assets.root.mkdir("textures");
    
    editor.assets.add(editor.engine.renderer.assets.shaders.DefaultShader, "/assets/shaders");

    editor.assets.add(editor.engine.renderer.assets.shaders.DefaultShader, "/assets/shaders");
    editor.assets.add(editor.engine.renderer.assets.shaders.BlitCopy, "/assets/shaders");

    editor.assets.add(editor.engine.renderer.assets.meshes.cube, "/assets/models");
    editor.assets.add(editor.engine.renderer.assets.meshes.quad, "/assets/models");

    editor.assets.add(new editor.engine.renderer.assets.types.DefaultMaterial(), "/assets/materials");
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
    editor.engine.scene.add(editor.editorEntity);

    editor.assets.add(editor.engine.scene, "/assets");
}
