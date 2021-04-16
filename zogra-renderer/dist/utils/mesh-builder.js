"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshBuilder = exports.MeshBuilderLegacy = void 0;
const types_1 = require("../types/types");
const global_1 = require("../core/global");
const mesh_1 = require("../core/mesh");
class MeshBuilderLegacy {
    constructor(capacity = 0, ctx = global_1.GlobalContext()) {
        this.verts = [];
        this.triangles = [];
        this.uvs = [];
        this.colors = [];
        this.ctx = ctx;
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
        const mesh = new mesh_1.Mesh(this.ctx);
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
        mesh.triangles = [0, 1, 2];
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
exports.MeshBuilderLegacy = MeshBuilderLegacy;
class MeshBuilder {
    constructor(verticesCapacity = 16, trianglesCapacity = verticesCapacity * 3, structure = mesh_1.DefaultVertexData, ctx = global_1.GlobalContext()) {
        this.verticesCount = 0;
        this.indicesCount = 0;
        this.mesh = new mesh_1.Mesh(structure, ctx);
        this.mesh.resize(verticesCapacity, trianglesCapacity);
    }
    addPolygon(...verts) {
        if (verts.length <= 0)
            return;
        if (this.verticesCount + verts.length > this.mesh.vertices.length) {
            this.mesh.resize(this.mesh.vertices.length * 2, this.mesh.indices.length * 2, true);
        }
        const base = this.verticesCount;
        for (const key in verts[0]) {
            for (let i = 0; i < verts.length; i++) {
                this.mesh.vertices[base + i][key].set(verts[i][key]);
            }
        }
        for (let i = 0; i < verts.length - 2; i++) {
            this.mesh.indices[this.indicesCount + i * 3 + 0] = base + 0;
            this.mesh.indices[this.indicesCount + i * 3 + 1] = base + i + 1;
            this.mesh.indices[this.indicesCount + i * 3 + 2] = base + i + 2;
        }
        this.verticesCount += verts.length;
        this.indicesCount += (verts.length - 2) * 3;
    }
    toMesh() {
        if (this.mesh.indices.length != this.indicesCount)
            this.mesh.resize(this.verticesCount, this.indicesCount, true);
        else if (this.mesh.vertices.length != this.verticesCount)
            this.mesh.vertices.resize(this.verticesCount, true);
        return this.mesh;
    }
    static quad(center = types_1.vec2.zero(), size = types_1.vec2.one(), ctx = global_1.GlobalContext()) {
        const halfSize = types_1.vec2.mul(size, 0.5);
        const mesh = new mesh_1.Mesh(ctx);
        mesh.resize(4, 6);
        mesh.vertices[0].vert.set([center.x - halfSize.x, center.y - halfSize.y, 0]);
        mesh.vertices[1].vert.set([center.x + halfSize.x, center.y - halfSize.y, 0]);
        mesh.vertices[2].vert.set([center.x + halfSize.x, center.y + halfSize.y, 0]);
        mesh.vertices[3].vert.set([center.x - halfSize.x, center.y + halfSize.y, 0]);
        mesh.vertices[0].uv.set([0, 0]);
        mesh.vertices[1].uv.set([1, 0]);
        mesh.vertices[2].uv.set([1, 1]);
        mesh.vertices[3].uv.set([0, 1]);
        mesh.vertices[0].normal.set([0, 0, 1]);
        mesh.vertices[1].normal.set([0, 0, 1]);
        mesh.vertices[2].normal.set([0, 0, 1]);
        mesh.vertices[3].normal.set([0, 0, 1]);
        mesh.vertices[0].color.fill(1);
        mesh.vertices[1].color.fill(1);
        mesh.vertices[2].color.fill(1);
        mesh.vertices[3].color.fill(1);
        mesh.indices.set([0, 1, 2, 0, 2, 3]);
        return mesh;
    }
    static ndcQuad(ctx = global_1.GlobalContext()) {
        return this.quad(types_1.vec2.zero(), types_1.vec2(2, 2), ctx);
    }
    static ndcTriangle(ctx = global_1.GlobalContext()) {
        const mesh = new mesh_1.Mesh(ctx);
        mesh.resize(3, 3);
        mesh.vertices[0].vert.set([-1, -1, 0]);
        mesh.vertices[1].vert.set([3, -1, 0]);
        mesh.vertices[2].vert.set([-1, 3, 0]);
        mesh.vertices[0].uv.set([0, 0]);
        mesh.vertices[1].uv.set([2, 0]);
        mesh.vertices[2].uv.set([0, 2]);
        mesh.vertices[0].normal.set([0, 0, 1]);
        mesh.vertices[1].normal.set([0, 0, 1]);
        mesh.vertices[2].normal.set([0, 0, 1]);
        mesh.vertices[0].color.fill(1);
        mesh.vertices[1].color.fill(1);
        mesh.vertices[2].color.fill(1);
        mesh.indices.set([0, 1, 2]);
        mesh.name = "mesh_ndc_triangle";
        return mesh;
    }
    static cube(center = types_1.vec3.zero(), size = types_1.vec3.one(), ctx) {
        const verts = [
            types_1.vec3(-.5, -.5, -.5).mul(size).plus(center),
            types_1.vec3(.5, -.5, -.5).mul(size).plus(center),
            types_1.vec3(.5, .5, -.5).mul(size).plus(center),
            types_1.vec3(-.5, .5, -.5).mul(size).plus(center),
            types_1.vec3(-.5, -.5, .5).mul(size).plus(center),
            types_1.vec3(.5, -.5, .5).mul(size).plus(center),
            types_1.vec3(.5, .5, .5).mul(size).plus(center),
            types_1.vec3(-.5, .5, .5).mul(size).plus(center),
        ];
        const uvs = [
            types_1.vec2(0, 0),
            types_1.vec2(1, 0),
            types_1.vec2(1, 1),
            types_1.vec2(0, 1)
        ];
        const mb = new MeshBuilder(24, 36, mesh_1.DefaultVertexData, ctx);
        mb.addPolygon({
            vert: verts[1],
            uv: uvs[0],
            normal: types_1.vec3(0, 0, -1),
        }, {
            vert: verts[0],
            uv: uvs[1],
            normal: types_1.vec3(0, 0, -1),
        }, {
            vert: verts[3],
            uv: uvs[2],
            normal: types_1.vec3(0, 0, -1),
        }, {
            vert: verts[2],
            uv: uvs[3],
            normal: types_1.vec3(0, 0, -1),
        });
        mb.addPolygon({
            vert: verts[5],
            uv: uvs[0],
            normal: types_1.vec3(1, 0, 0),
        }, {
            vert: verts[1],
            uv: uvs[1],
            normal: types_1.vec3(1, 0, 0),
        }, {
            vert: verts[2],
            uv: uvs[2],
            normal: types_1.vec3(1, 0, 0),
        }, {
            vert: verts[6],
            uv: uvs[3],
            normal: types_1.vec3(1, 0, 0),
        });
        mb.addPolygon({
            vert: verts[4],
            uv: uvs[0],
            normal: types_1.vec3(0, 0, 1),
        }, {
            vert: verts[5],
            uv: uvs[1],
            normal: types_1.vec3(0, 0, 1),
        }, {
            vert: verts[6],
            uv: uvs[2],
            normal: types_1.vec3(0, 0, 1),
        }, {
            vert: verts[7],
            uv: uvs[3],
            normal: types_1.vec3(0, 0, 1),
        });
        mb.addPolygon({
            vert: verts[0],
            uv: uvs[0],
            normal: types_1.vec3(-1, 0, 0),
        }, {
            vert: verts[4],
            uv: uvs[1],
            normal: types_1.vec3(-1, 0, 0),
        }, {
            vert: verts[7],
            uv: uvs[2],
            normal: types_1.vec3(-1, 0, 0),
        }, {
            vert: verts[3],
            uv: uvs[3],
            normal: types_1.vec3(-1, 0, 0),
        });
        mb.addPolygon({
            vert: verts[7],
            uv: uvs[0],
            normal: types_1.vec3(0, 1, 0),
        }, {
            vert: verts[6],
            uv: uvs[1],
            normal: types_1.vec3(0, 1, 0),
        }, {
            vert: verts[2],
            uv: uvs[2],
            normal: types_1.vec3(0, 1, 0),
        }, {
            vert: verts[3],
            uv: uvs[3],
            normal: types_1.vec3(0, 1, 0),
        });
        mb.addPolygon({
            vert: verts[0],
            uv: uvs[0],
            normal: types_1.vec3(0, -1, 0),
        }, {
            vert: verts[1],
            uv: uvs[1],
            normal: types_1.vec3(0, -1, 0),
        }, {
            vert: verts[5],
            uv: uvs[2],
            normal: types_1.vec3(0, -1, 0),
        }, {
            vert: verts[4],
            uv: uvs[3],
            normal: types_1.vec3(0, -1, 0),
        });
        const mesh = mb.toMesh();
        mesh.vertices.forEach(vert => vert.color.fill(1));
        mesh.name = "mesh_cube";
        return mesh;
    }
}
exports.MeshBuilder = MeshBuilder;
//# sourceMappingURL=mesh-builder.js.map