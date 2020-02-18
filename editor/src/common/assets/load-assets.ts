import { ZograEditor } from "../zogra-editor";
import { AssetsFolder } from "./user-assets";
import texUVGrid from "../../asset/img/uv_grid.png";
import { AssetsPack, plugins } from "zogra-renderer";

export function initUserAssets(editor: ZograEditor)
{
    const root = new AssetsFolder();

    const shaders = new AssetsFolder("shaders", root);
    const models = new AssetsFolder("models", root);
    const materials = new AssetsFolder("materials", root);
    const textures = new AssetsFolder("textures", root);

    shaders.add(editor.engine.renderer.assets.shaders.DefaultShader);
    shaders.add(editor.engine.renderer.assets.shaders.BlitCopy);

    models.add(editor.engine.renderer.assets.meshes.cube);
    models.add(editor.engine.renderer.assets.meshes.quad);

    materials.add(new editor.engine.renderer.assets.types.DefaultMaterial());

    loadAssets(root);

    return root;
}

async function loadAssets(root: AssetsFolder)
{
    const imgPack = (await plugins.TextureImporter.import(await fetch(texUVGrid).then(r => r.arrayBuffer())));
    importAssetPack(root.find("textures") as AssetsFolder, "uv_grid", imgPack);
}

function importAssetPack(folder: AssetsFolder, name: string, pack: AssetsPack)
{
    const subFolder = new AssetsFolder(name, folder);
    for (const asset of pack.assets)
    {
        subFolder.add(asset);   
    }
}