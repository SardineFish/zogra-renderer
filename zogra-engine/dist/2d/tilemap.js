"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = exports.Tilemap = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_object_1 = require("../engine/render-object");
const materials_1 = require("./materials");
const ChunkSize = 16;
class Tilemap extends render_object_1.RenderObject {
    constructor() {
        super();
        this.chunks = new Map();
        this.on("render", this.onRender.bind(this));
        this.materials[0] = new materials_1.Default2DMaterial();
    }
    onRender(obj, context, data) {
        let screenSize = zogra_renderer_1.vec2(data.camera.viewHeight * data.camera.aspectRatio, data.camera.viewHeight);
        let [minCorner] = this.chunkPos(zogra_renderer_1.minus(data.camera.position.toVec2(), screenSize));
        let [maxCorner] = this.chunkPos(zogra_renderer_1.plus(data.camera.position.toVec2(), screenSize));
        // context.renderer.drawMesh(this.mesh, mat4.translate(vec3(0, 0, 0)), this.materials[0]);
        // return;
        for (let chunkY = minCorner.y; chunkY <= maxCorner.y; chunkY++)
            for (let chunkX = minCorner.x; chunkX <= maxCorner.x; chunkX++) {
                const chunk = this.getChunk(zogra_renderer_1.vec2(chunkX, chunkY));
                if (!chunk)
                    continue;
                context.renderer.drawMesh(chunk.mesh, zogra_renderer_1.mat4.translate(zogra_renderer_1.vec3(chunkX * ChunkSize, chunkY * ChunkSize, 0)), this.materials[0]);
            }
    }
    getTile(pos) {
        let [chunkPos, offset] = this.chunkPos(zogra_renderer_1.floor2(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.getTile(offset);
    }
    setTile(pos, tile) {
        let [chunkPos, offset] = this.chunkPos(zogra_renderer_1.floor2(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.setTile(offset, tile);
    }
    visibleChunkRange(camera) {
        let screenSize = zogra_renderer_1.vec2(camera.viewHeight * camera.aspectRatio, camera.viewHeight);
        let [minCorner] = this.chunkPos(zogra_renderer_1.minus(camera.position.toVec2(), screenSize));
        let [maxCorner] = this.chunkPos(zogra_renderer_1.plus(camera.position.toVec2(), screenSize));
        return [minCorner, zogra_renderer_1.plus(maxCorner, 1)];
    }
    getOrCreateChunk(chunkPos) {
        const idx = this.calcChunkID(chunkPos);
        let chunk = this.chunks.get(idx);
        if (!chunk) {
            chunk = new Chunk();
            this.chunks.set(idx, chunk);
            return chunk;
        }
        return chunk;
    }
    getChunk(chunkPos) {
        const idx = this.calcChunkID(chunkPos);
        return this.chunks.get(idx);
    }
    calcChunkID(chunkPos) {
        if (chunkPos.x == -0)
            chunkPos.x = 0;
        if (chunkPos.y == -0)
            chunkPos.y = 0;
        const signX = chunkPos.x >= 0 ? 0 : 1;
        const signY = chunkPos.y >= 0 ? 0 : 1;
        return (signX << 31) | (Math.abs(Math.floor(chunkPos.x)) << 16) | (signY << 15) | Math.abs(Math.floor(chunkPos.y));
    }
    chunkPos(pos) {
        const floorOffset = zogra_renderer_1.vec2(pos.x < 0 ? /*1*/ 0 : 0, pos.y < 0 ? /*1*/ 0 : 0);
        return [zogra_renderer_1.minus(zogra_renderer_1.floor2(zogra_renderer_1.div(pos, zogra_renderer_1.vec2(ChunkSize, ChunkSize))), floorOffset), zogra_renderer_1.vec2(floorReminder(pos.x, ChunkSize), floorReminder(pos.y, ChunkSize))];
    }
}
exports.Tilemap = Tilemap;
class Chunk {
    constructor() {
        this.tiles = new Array(ChunkSize * ChunkSize);
        this.mesh = createChunkMesh();
    }
    getTile(offset) {
        const idx = offset.y * ChunkSize + offset.x;
        return this.tiles[idx];
    }
    setTile(offset, tile) {
        if (tile)
            tile = {
                collide: tile.collide,
                texture_offset: tile.texture_offset.clone()
            };
        let idx = offset.y * ChunkSize + offset.x;
        this.tiles[idx] = tile;
        const atlas_offset = tile
            ? tile.texture_offset
            : zogra_renderer_1.vec2(-1, -1);
        let uv2 = this.mesh.uv2;
        idx *= 4;
        uv2[idx + 0] = atlas_offset;
        uv2[idx + 1] = atlas_offset;
        uv2[idx + 2] = atlas_offset;
        uv2[idx + 3] = atlas_offset;
        this.mesh.uv2 = uv2;
    }
}
exports.Chunk = Chunk;
function floorReminder(x, m) {
    return x >= 0
        ? x % m
        : (m + x % m) % m;
}
function createChunkMesh() {
    const builder = new zogra_renderer_1.MeshBuilder();
    const epsilon = 0;
    for (let y = 0; y < ChunkSize; y++)
        for (let x = 0; x < ChunkSize; x++) {
            builder.addPolygon([
                zogra_renderer_1.vec3(x - epsilon, y - epsilon, 0),
                zogra_renderer_1.vec3(x + 1 + epsilon, y - epsilon, 0),
                zogra_renderer_1.vec3(x + 1 + epsilon, y + 1 + epsilon, 0),
                zogra_renderer_1.vec3(x - epsilon, y + 1 + epsilon, 0),
            ], [
                zogra_renderer_1.vec2(0, 0),
                zogra_renderer_1.vec2(1, 0),
                zogra_renderer_1.vec2(1, 1),
                zogra_renderer_1.vec2(0, 1),
            ]);
        }
    const mesh = builder.toMesh();
    mesh.update();
    const uv2 = mesh.uv2;
    for (let i = 0; i < uv2.length; i++) {
        uv2[i] = zogra_renderer_1.vec2(-1, -1);
    }
    mesh.uv2 = uv2;
    mesh.update();
    return mesh;
}
//# sourceMappingURL=tilemap.js.map