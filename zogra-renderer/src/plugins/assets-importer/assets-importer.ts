import { Asset } from "../../core/asset";
import { GlobalContext } from "../../core/global";
import { AssetImporterPlugin, AssetsPack } from "./types";
export * from "./types";

interface Importers
{
    [key: string]: AssetImporterPlugin<any, Asset | AssetsPack>
}

// const importers = {
//     img: TextureImporter,
// };

export class AssetsImporter<T extends Importers>
{
    private importers: T;
    constructor(importers: T)
    {
        this.importers = importers;
    }

    async url(url: string, ctx = GlobalContext())
    {
        const buffer = await fetch(url).then(r => r.arrayBuffer());
        return await this.buffer(buffer, ctx);
    }
    async buffer(buffer: ArrayBuffer, ctx = GlobalContext()): Promise<BufferImporter<T>>
    {
        const bufImporters: BufferImporter<T> = {} as any;
        for (const key in this.importers)
        {
            bufImporters[key] = (options?) => this.importers[key].import(buffer, options, ctx) as any;
        }
        return bufImporters;
    }
}

type BufferImporter<T extends Importers> = {
    [key in keyof T]: (options?: Parameters<T[key]["import"]>["1"]) => ReturnType<T[key]["import"]>;
};


// type BufferImporter = { [key in keyof typeof importers]: (options: AssetImportOptions) => Promise<AssetsPack> };
// function createBufferImporter(buffer: ArrayBuffer, ctx = GlobalContext()): BufferImporter
// {
//     const wrapper = {} as any;
//     for (const importer in importers)
//     {
//         wrapper[importer] = (options?: AssetImportOptions) => importers[importer as keyof typeof importers].import(buffer, options, ctx);
//     }
//     return wrapper;
// }

// export const AssetsImporter = {
//     importers: importers,
//     async url(url: string, ctx = GlobalContext())
//     {
//         const buffer = await fetch(url).then(r => r.arrayBuffer());
//         return createBufferImporter(buffer, ctx);
//     },
//     async buffer(buffer: ArrayBuffer, ctx = GlobalContext())
//     {
//         return createBufferImporter(buffer, ctx);
//     }
// };