import sphere from "../asset/model/sphere.bin.fbx";
import { ZograEngine, plugins, Entity, vec3, Scene, materialDefine, MaterialFromShader, shaderProp, Color, Texture, RenderObject, Material, Texture2D } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";
import { AssetsFolder, UserAssetsManager } from "./assets/user-assets";
import texUVGrid from "../asset/img/uv_grid.png";
import aofbx from "../asset/model/ao.bin.fbx";
import aoLightmap from "../asset/img/ao.lightmap.png";
import { serializeProject, deserializeProject } from "./serialization/project";
import { getLocalSaves } from "./serialization/save-load";
import { EditorUI } from "../components/editor-ui";
import { initExampleAssets } from "./example-assets";


export async function loadProject(editor: ZograEditor)
{
    await loadExample(editor);
    return;
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
    editor.assets.add(editor.engine.renderer.assets.shaders.BlitCopy, "/assets/shaders");
    editor.assets.add(editor.engine.renderer.assets.meshes.cube, "/assets/models");
    editor.assets.add(editor.engine.renderer.assets.meshes.quad, "/assets/models");
    editor.assets.add(new editor.engine.renderer.assets.types.DefaultMaterial(), "/assets/materials");
    editor.assets.add(editor.engine.renderer.assets.textures.default, "/assets/textures");
    editor.assets.add(editor.engine.renderer.assets.textures.defaultNormal, "/assets/textures");
    editor.assets.add(editor.assets.internal.shaders.defaultLit, "/assets/shaders");
}

function createFolders(editor: ZograEditor)
{
    editor.assets.root.mkdir("shaders");
    editor.assets.root.mkdir("models");
    editor.assets.root.mkdir("materials");
    editor.assets.root.mkdir("textures");
}

async function initScene(editor: ZograEditor)
{
    const { DefaultLit } = initExampleAssets(editor);

    const scene = new Scene();

    (await editor.assets.import("img", texUVGrid, {}, "/assets/textures"));
    const lightmapTex = (await editor.assets.import("img", aoLightmap, {}, "/assets/textures")).mainAsset as Texture2D;

    let asset = await editor.assets.import("fbx", sphere, {}, "/assets/models");

    let mat = new DefaultLit();
    editor.assets.add(mat, "/assets/materials");

    let entity = asset.mainAsset as Entity;
    entity.localScaling = vec3(.1, .1, .1);
    scene.add(entity);
    let [obj] = entity.children;
    (obj as RenderObject).materials[0] = mat;
    entity.position = vec3(-3, 2, 3);

    asset = await editor.assets.import("fbx", aofbx, {}, "/assets/models");
    entity = asset.mainAsset as Entity;
    entity.localScaling = vec3(.3, .3, .3);
    scene.add(entity);
    [obj] = entity.children;
    const lightmap = new Material(editor.assets.internal.shaders.lightmap);
    lightmap.setProp("uLightMap", "tex2d", lightmapTex);
    (obj as RenderObject).materials[0] = lightmap;
    

    editor.assets.add(scene, "/assets");
    editor.engine.scene = scene;
    
}
