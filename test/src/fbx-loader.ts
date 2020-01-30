import fbx from "./asset/model/test.bin.fbx";
import { plugins } from "../..";
import { importModels } from "../../dist/plugins/plugins";

(window as any).fbxUrl = fbx;
(async () =>
{
    const blob = await (await fetch(fbx)).blob();
    const data = await plugins.FBXImporter.fromBlob(blob);
    (window as any).fbx = data;
    importModels(data);
})();