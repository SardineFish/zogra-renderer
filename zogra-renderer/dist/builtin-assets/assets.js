import { createBuiltinMaterialTypes, createBuiltinMaterial } from "./materials";
import { BuiltinShaderSources, BuiltinUniformNames, compileBuiltinShaders } from "./shaders";
import { createDefaultTextures } from "./textures";
import { createBuiltinMesh } from "./mesh";
export class BuiltinAssets {
    constructor(ctx) {
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
//# sourceMappingURL=assets.js.map