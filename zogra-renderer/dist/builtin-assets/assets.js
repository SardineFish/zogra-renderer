"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinAssets = void 0;
const materials_1 = require("./materials");
const shaders_1 = require("./shaders");
const textures_1 = require("./textures");
const mesh_1 = require("./mesh");
class BuiltinAssets {
    constructor(gl) {
        let ctx = {
            assets: this,
            gl: gl,
            width: 0,
            height: 0,
            renderer: null,
        };
        this.gl = gl;
        this.BuiltinUniforms = shaders_1.BuiltinUniformNames;
        this.shaderSources = shaders_1.BuiltinShaderSources;
        this.shaders = shaders_1.compileBuiltinShaders(gl);
        this.meshes = mesh_1.createBuiltinMesh(gl);
        this.textures = textures_1.createDefaultTextures(ctx);
        this.types = materials_1.createBuiltinMaterialTypes(gl, this.textures, this.shaders);
        this.materials = materials_1.createBuiltinMaterial(gl, this.types, this.shaders, this.textures);
    }
}
exports.BuiltinAssets = BuiltinAssets;
//# sourceMappingURL=assets.js.map