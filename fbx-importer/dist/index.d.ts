import { AssetsPack, AssetImporterPlugin, AssetsImporter } from "zogra-engine";
declare const FBXImporter: AssetsImporter<{
    fbx: AssetImporterPlugin<{}, AssetsPack>;
}>;
export default FBXImporter;
