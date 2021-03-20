"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBuiltinMesh = void 0;
const mesh_1 = require("../core/mesh");
const vec3_1 = require("../types/vec3");
const vec2_1 = require("../types/vec2");
const mesh_builder_1 = require("../utils/mesh-builder");
function createBuiltinMesh(gl) {
    return {
        quad: quad(gl),
        screenQuad: screenQuad(gl),
        cube: cube(gl),
    };
}
exports.createBuiltinMesh = createBuiltinMesh;
function quad(gl) {
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
    quad.name = "mesh_quad";
    return quad;
}
function screenQuad(gl) {
    const screenQuad = new mesh_1.Mesh(gl);
    screenQuad.verts = [
        vec3_1.vec3(-1, -1, 0),
        vec3_1.vec3(1, -1, 0),
        vec3_1.vec3(1, 1, 0),
        vec3_1.vec3(-1, 1, 0),
    ];
    screenQuad.triangles = [
        0, 1, 3,
        1, 2, 3,
    ];
    screenQuad.uvs = [
        vec2_1.vec2(0, 0),
        vec2_1.vec2(1, 0),
        vec2_1.vec2(1, 1),
        vec2_1.vec2(0, 1)
    ];
    screenQuad.calculateNormals();
    screenQuad.name = "mesh_screen_quad";
    return screenQuad;
}
function cube(gl) {
    const verts = [
        vec3_1.vec3(-.5, -.5, -.5),
        vec3_1.vec3(.5, -.5, -.5),
        vec3_1.vec3(.5, .5, -.5),
        vec3_1.vec3(-.5, .5, -.5),
        vec3_1.vec3(-.5, -.5, .5),
        vec3_1.vec3(.5, -.5, .5),
        vec3_1.vec3(.5, .5, .5),
        vec3_1.vec3(-.5, .5, .5),
    ];
    const uvs = [
        vec2_1.vec2(0, 0),
        vec2_1.vec2(1, 0),
        vec2_1.vec2(1, 1),
        vec2_1.vec2(0, 1)
    ];
    const mb = new mesh_builder_1.MeshBuilder(24, gl);
    mb.addPolygon([
        verts[1],
        verts[0],
        verts[3],
        verts[2],
    ], [
        uvs[0],
        uvs[1],
        uvs[2],
        uvs[3]
    ]);
    mb.addPolygon([
        verts[5],
        verts[1],
        verts[2],
        verts[6],
    ], [
        uvs[0],
        uvs[1],
        uvs[2],
        uvs[3]
    ]);
    mb.addPolygon([
        verts[4],
        verts[5],
        verts[6],
        verts[7],
    ], [
        uvs[0],
        uvs[1],
        uvs[2],
        uvs[3]
    ]);
    mb.addPolygon([
        verts[0],
        verts[4],
        verts[7],
        verts[3],
    ], [
        uvs[0],
        uvs[1],
        uvs[2],
        uvs[3]
    ]);
    mb.addPolygon([
        verts[7],
        verts[6],
        verts[2],
        verts[3],
    ], [
        uvs[0],
        uvs[1],
        uvs[2],
        uvs[3]
    ]);
    mb.addPolygon([
        verts[0],
        verts[1],
        verts[5],
        verts[4],
    ], [
        uvs[0],
        uvs[1],
        uvs[2],
        uvs[3]
    ]);
    const mesh = mb.toMesh();
    mesh.name = "mesh_cube";
    return mesh;
}
//# sourceMappingURL=mesh.js.map