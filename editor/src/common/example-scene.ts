import sphere from "../asset/model/sphere.bin.fbx";
import { ZograEngine, plugins, Entity, vec3, Scene } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";
import { AssetsFolder, UserAssetsManager } from "./assets/user-assets";
import texUVGrid from "../asset/img/uv_grid.png";
import aofbx from "../asset/model/ao.bin.fbx";
import aoLightmap from "../asset/img/ao.lightmap.png";
import { serializeProject, deserializeProject } from "./serialization/project";
import { getLocalSaves } from "./serialization/save-load";
import { EditorUI } from "../components/editor-ui";


export async function loadProject(editor: ZograEditor)
{
    const root = editor.assets.root;
    loadBuiltIn(editor);

    const saves = getLocalSaves();
    if (saves[0])
        editor.load(saves[0].name);
    else 
        await loadExample(editor);
}

export async function resetProject(editor: ZograEditor)
{
    editor.assets = new UserAssetsManager();
    loadBuiltIn(editor);
    await loadExample(editor);
}

async function loadExample(editor: ZograEditor)
{
    createFolders(editor);

    await loadAssets(editor.assets);

    await initScene(editor);

    // const serialized = serializeProject(editor);
    // console.log(serialized);
    // editor.assets = new UserAssetsManager();
    // deserializeProject(editor, serialized);
    // editor.save("ExampleProject");
}

function loadBuiltIn(editor: ZograEditor)
{

    editor.assets.add(editor.engine.renderer.assets.shaders.DefaultShader, "/assets/shaders");
    editor.assets.add(editor.engine.renderer.assets.shaders.DefaultShader, "/assets/shaders");
    editor.assets.add(editor.engine.renderer.assets.shaders.BlitCopy, "/assets/shaders");
    editor.assets.add(editor.engine.renderer.assets.meshes.cube, "/assets/models");
    editor.assets.add(editor.engine.renderer.assets.meshes.quad, "/assets/models");
    editor.assets.add(new editor.engine.renderer.assets.types.DefaultMaterial(), "/assets/materials");
}

function createFolders(editor: ZograEditor)
{
    editor.assets.root.mkdir("shaders");
    editor.assets.root.mkdir("models");
    editor.assets.root.mkdir("materials");
    editor.assets.root.mkdir("textures");
}

async function loadAssets(manager: UserAssetsManager)
{
    (await manager.import("img", texUVGrid, {}, "/assets/textures"));
    manager.import("fbx", aofbx, {}, "/assets/models");
    manager.import("img", aoLightmap, {}, "/assets/textures");
}

async function initScene(editor: ZograEditor)
{
    const scene = new Scene();
    const asset = await editor.assets.import("fbx", sphere, {}, "/assets/models");

    const entity = asset.mainAsset as Entity;
    entity.localScaling = vec3(.1, .1, .1);
    scene.add(entity);
    scene.add(editor.editorEntity);

    editor.assets.add(scene, "/assets");
    editor.engine.scene = scene;
}