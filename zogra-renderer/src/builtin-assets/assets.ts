import { DefaultMaterialType } from "../core/material-type";
import { Texture2D } from "../core/texture";
import {  createBuiltinMaterialTypes, createBuiltinMaterial } from "./materials";
import { BuiltinShaderSources, BuiltinUniformNames, compileBuiltinShaders } from "./shaders";
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
    BuiltinUniforms: typeof BuiltinUniformNames;
    constructor(ctx: GLContext)
    {
        const gl = ctx.gl;
        this.gl = gl;
        ctx.assets = this;

        this.BuiltinUniforms = BuiltinUniformNames;
        this.shaderSources = BuiltinShaderSources;
        this.shaders = compileBuiltinShaders(gl);
        this.meshes = createBuiltinMesh(ctx);
        this.textures = createDefaultTextures(ctx);
        this.types = createBuiltinMaterialTypes(gl, this.textures, this.shaders);
        this.materials = createBuiltinMaterial(gl, this.types, this.shaders, this.textures);
    }
}