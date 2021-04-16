"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBuiltinMesh = void 0;
const vec3_1 = require("../types/vec3");
const vec2_1 = require("../types/vec2");
const mesh_builder_1 = require("../utils/mesh-builder");
function createBuiltinMesh(ctx) {
    return {
        quad: mesh_builder_1.MeshBuilder.quad(vec2_1.vec2.zero(), vec2_1.vec2.one(), ctx),
        screenQuad: mesh_builder_1.MeshBuilder.ndcQuad(ctx),
        cube: mesh_builder_1.MeshBuilder.cube(vec3_1.vec3.zero(), vec3_1.vec3.one(), ctx),
    };
}
exports.createBuiltinMesh = createBuiltinMesh;
//# sourceMappingURL=mesh.js.map