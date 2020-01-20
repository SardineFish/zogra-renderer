"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const materials_1 = require("./materials");
const shaders_1 = require("./shaders");
const textures_1 = require("./textures");
const mesh_1 = require("./mesh");
class BuiltinAssets {
    constructor(gl) {
        this.gl = gl;
        this.DefaultTexture = textures_1.createDefaultTexture(gl);
        this.types = materials_1.createBuiltinMaterialTypes(gl, this.DefaultTexture);
        this.materials = materials_1.createBuiltinMaterial(gl, this.types);
        this.meshes = mesh_1.createBuiltinMesh(gl);
        this.shaders = shaders_1.BuiltinShaders;
        this.BuiltinUniforms = shaders_1.BuiltinUniforms;
    }
}
exports.BuiltinAssets = BuiltinAssets;
//# sourceMappingURL=assets.js.map