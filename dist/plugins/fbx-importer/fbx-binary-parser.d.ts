import { FBXFile } from "./fbx-types";
export declare const FBXImporter: {
    fromBlob(blob: Blob): Promise<FBXFile>;
};
