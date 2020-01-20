import { DefaultMaterialType } from "../core/material-type";
import { Texture2D } from "../core/texture";
import { createDefaultMaterialType, createBuiltinMaterialTypes, createBuiltinMaterial } from "./materials";
import { BuiltinShaders, BuiltinUniforms } from "./shaders";
import { createDefaultTexture } from "./textures";
import { createBuiltinMesh } from "./mesh";

export class BuiltinAssets
{
    private gl: WebGL2RenderingContext;
    types: ReturnType<typeof createBuiltinMaterialTypes>;
    materials: ReturnType<typeof createBuiltinMaterial>;
    shaders: typeof BuiltinShaders;
    meshes: ReturnType<typeof createBuiltinMesh>;
    DefaultTexture: Texture2D;
    BuiltinUniforms: typeof BuiltinUniforms;
    constructor(gl: WebGL2RenderingContext)
    {
        this.gl = gl;
        this.DefaultTexture = createDefaultTexture(gl);
        this.types = createBuiltinMaterialTypes(gl, this.DefaultTexture);
        this.materials = createBuiltinMaterial(gl, this.types);
        this.meshes = createBuiltinMesh(gl);
        this.shaders = BuiltinShaders;
        this.BuiltinUniforms = BuiltinUniforms;
    }
}