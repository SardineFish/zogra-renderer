import { Texture2D } from "../core/texture";
import { createBuiltinMaterialTypes, createBuiltinMaterial } from "./materials";
import { BuiltinShaderSources, BuiltinUniforms, compileBuiltinShaders } from "./shaders";
import { createBuiltinMesh } from "./mesh";
export declare class BuiltinAssets {
    private gl;
    types: ReturnType<typeof createBuiltinMaterialTypes>;
    materials: ReturnType<typeof createBuiltinMaterial>;
    shaderSources: typeof BuiltinShaderSources;
    shaders: ReturnType<typeof compileBuiltinShaders>;
    meshes: ReturnType<typeof createBuiltinMesh>;
    DefaultTexture: Texture2D;
    BuiltinUniforms: typeof BuiltinUniforms;
    constructor(gl: WebGL2RenderingContext);
}
