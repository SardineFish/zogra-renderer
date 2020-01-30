import { DefaultMaterialType } from "../core/material-type";
import { Texture2D } from "../core/texture";
import {  createBuiltinMaterialTypes, createBuiltinMaterial } from "./materials";
import { BuiltinShaderSources, BuiltinUniforms, compileBuiltinShaders } from "./shaders";
import { createDefaultTextures } from "./textures";
import { createBuiltinMesh } from "./mesh";
import { GLContext } from "../core/global";

export class BuiltinAssets
{
    private gl: WebGL2RenderingContext;
    types: ReturnType<typeof createBuiltinMaterialTypes>;
    materials: ReturnType<typeof createBuiltinMaterial>;
    shaderSources: typeof BuiltinShaderSources;
    shaders: ReturnType<typeof compileBuiltinShaders>;
    meshes: ReturnType<typeof createBuiltinMesh>;
    textures: ReturnType<typeof createDefaultTextures>;
    BuiltinUniforms: typeof BuiltinUniforms;
    constructor(gl: WebGL2RenderingContext)
    {
        let ctx: GLContext = {
            assets: this,
            gl: gl,
            width: 0,
            height: 0,
        }
        this.gl = gl;

        this.BuiltinUniforms = BuiltinUniforms;
        this.shaderSources = BuiltinShaderSources;
        this.shaders = compileBuiltinShaders(gl);
        this.meshes = createBuiltinMesh(gl);
        this.textures = createDefaultTextures(ctx);
        this.types = createBuiltinMaterialTypes(gl, this.textures, this.shaders);
        this.materials = createBuiltinMaterial(gl, this.types, this.shaders);
    }
}