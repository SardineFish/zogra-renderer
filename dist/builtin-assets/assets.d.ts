import { createBuiltinMaterialTypes, createBuiltinMaterial } from "./materials";
import { BuiltinShaderSources, BuiltinUniforms, compileBuiltinShaders } from "./shaders";
import { createDefaultTextures } from "./textures";
import { createBuiltinMesh } from "./mesh";
export declare class BuiltinAssets {
    private gl;
    types: ReturnType<typeof createBuiltinMaterialTypes>;
    materials: ReturnType<typeof createBuiltinMaterial>;
    shaderSources: typeof BuiltinShaderSources;
    shaders: ReturnType<typeof compileBuiltinShaders>;
    meshes: ReturnType<typeof createBuiltinMesh>;
    textures: ReturnType<typeof createDefaultTextures>;
    BuiltinUniforms: typeof BuiltinUniforms;
    constructor(gl: WebGL2RenderingContext);
}
