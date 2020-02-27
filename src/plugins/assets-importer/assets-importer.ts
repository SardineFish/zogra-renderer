import { Asset, IAsset } from "../../core/asset";
import { GLContext, GlobalContext } from "../../core/global";
import { FBXImporter } from "../fbx-importer/fbx-importer";
import { TextureImporter } from "../texture-importer/texture-importer";
import { readBlob } from "../fbx-importer/utils";
import { ConstructorType } from "../../utils/util";
import { AssetsPack, AssetImportOptions } from "./types";
export * from "./types";

const importers = {
    img: TextureImporter,
    fbx: FBXImporter
};

type BufferImporter = { [key in keyof typeof importers]: (options: AssetImportOptions) => Promise<AssetsPack> };
function createBufferImporter(buffer: ArrayBuffer, ctx = GlobalContext()): BufferImporter
{
    const wrapper = {} as any;
    for (const importer in importers)
    {
        wrapper[importer] = (options: AssetImportOptions) => importers[importer as keyof typeof importers].import(buffer, options, ctx);
    }
    return wrapper;
}

export const AssetsImporter = {
    importers: importers,
    async url(url: string, ctx = GlobalContext())
    {
        const buffer = await fetch(url).then(r => r.arrayBuffer());
        return createBufferImporter(buffer, ctx);
    },
    async blob(blob: Blob, ctx = GlobalContext())
    {
        return createBufferImporter(await readBlob(blob), ctx);
    },
    async buffer(buffer: ArrayBuffer, ctx = GlobalContext())
    {
        return createBufferImporter(buffer, ctx);
    }
};