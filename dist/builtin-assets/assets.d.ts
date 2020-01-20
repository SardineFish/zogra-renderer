import { Texture2D } from "../core/texture";
import { createBuiltinMaterialTypes, createBuiltinMaterial } from "./materials";
import { BuiltinShaders, BuiltinUniforms } from "./shaders";
import { createBuiltinMesh } from "./mesh";
export declare class BuiltinAssets {
    private gl;
    types: ReturnType<typeof createBuiltinMaterialTypes>;
    materials: ReturnType<typeof createBuiltinMaterial>;
    shaders: typeof BuiltinShaders;
    meshes: ReturnType<typeof createBuiltinMesh>;
    DefaultTexture: Texture2D;
    BuiltinUniforms: typeof BuiltinUniforms;
    constructor(gl: WebGL2RenderingContext);
}
