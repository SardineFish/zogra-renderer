"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mesh_1 = require("../core/mesh");
const vec3_1 = require("../types/vec3");
const vec2_1 = require("../types/vec2");
function createBuiltinMesh(gl) {
    const quad = new mesh_1.Mesh(gl);
    quad.verts = [
        vec3_1.vec3(-.5, -.5, 0),
        vec3_1.vec3(.5, -.5, 0),
        vec3_1.vec3(.5, .5, 0),
        vec3_1.vec3(-.5, .5, 0),
    ];
    quad.triangles = [
        0, 1, 3,
        1, 2, 3,
    ];
    quad.uvs = [
        vec2_1.vec2(0, 0),
        vec2_1.vec2(1, 0),
        vec2_1.vec2(1, 1),
        vec2_1.vec2(0, 1)
    ];
    quad.calculateNormals();
    return {
        quad: quad
    };
}
exports.createBuiltinMesh = createBuiltinMesh;
//# sourceMappingURL=mesh.js.map