"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshBuilder = void 0;
const types_1 = require("../types/types");
const global_1 = require("../core/global");
const mesh_1 = require("../core/mesh");
class MeshBuilder {
    constructor(capacity = 0, gl = global_1.GlobalContext().gl) {
        this.verts = [];
        this.triangles = [];
        this.uvs = [];
        this.colors = [];
        this.gl = gl;
    }
    addPolygon(verts, uvs) {
        const base = this.verts.length;
        for (let i = 0; i < verts.length; i++) {
            this.verts.push(verts[i]);
            this.uvs.push(uvs[i]);
            this.colors.push(types_1.Color.white);
        }
        for (let i = 2; i < verts.length; i++) {
            this.triangles.push(base + 0, base + i - 1, base + i);
        }
    }
    addSubMesh(verts, triangles, colors = [types_1.Color.white], uvs = [types_1.vec2(0, 0)]) {
        const base = this.verts.length;
        if (triangles.length % 3 !== 0)
            throw new Error("Invalid number of triangles.");
        for (let i = 0; i < verts.length; i++) {
            this.verts.push(verts[i]);
            this.uvs.push(i >= uvs.length ? uvs[uvs.length - 1] : uvs[i]);
            this.colors.push(i >= colors.length ? colors[colors.length - 1] : colors[i]);
        }
        for (let i = 0; i < triangles.length; i++) {
            this.triangles.push(base + triangles[i]);
        }
    }
    toMesh() {
        const mesh = new mesh_1.Mesh(this.gl);
        mesh.verts = this.verts;
        mesh.triangles = this.triangles;
        mesh.colors = this.colors;
        mesh.uvs = this.uvs;
        mesh.calculateNormals();
        return mesh;
    }
    static quad(center = types_1.vec2.zero(), size = types_1.vec2.one()) {
        const halfSize = types_1.mul(size, types_1.vec2(0.5));
        const quad = new mesh_1.Mesh();
        quad.verts = [
            types_1.vec3(center.x - halfSize.x, center.y - halfSize.y, 0),
            types_1.vec3(center.x + halfSize.x, center.y - halfSize.y, 0),
            types_1.vec3(center.x + halfSize.x, center.y + halfSize.y, 0),
            types_1.vec3(center.x - halfSize.x, center.y + halfSize.y, 0),
        ];
        quad.triangles = [
            0, 1, 3,
            1, 2, 3,
        ];
        quad.uvs = [
            types_1.vec2(0, 0),
            types_1.vec2(1, 0),
            types_1.vec2(1, 1),
            types_1.vec2(0, 1)
        ];
        quad.normals = [
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
        ];
        // quad.calculateNormals();
        quad.name = "mesh_quad";
        return quad;
    }
    static ndcQuad() {
        return this.quad(types_1.vec2.zero(), types_1.vec2(2, 2));
    }
    static ndcTriangle() {
        const mesh = new mesh_1.Mesh();
        mesh.verts = [
            types_1.vec3(-1, -1, 0),
            types_1.vec3(3, -1, 0),
            types_1.vec3(-1, 3, 0),
        ];
        mesh.uvs = [
            types_1.vec2(0, 0),
            types_1.vec2(2, 0),
            types_1.vec2(0, 2),
        ];
        mesh.normals = [
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
            types_1.vec3(0, 0, 1),
        ];
        mesh.name = "mesh_ndc_triangle";
        return mesh;
    }
}
exports.MeshBuilder = MeshBuilder;
//# sourceMappingURL=mesh-builder.js.map