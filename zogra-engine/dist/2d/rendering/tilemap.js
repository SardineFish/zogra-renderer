"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = exports.Tilemap = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_object_1 = require("../../engine/render-object");
const materials_1 = require("./materials");
class Tilemap extends render_object_1.RenderObject {
    constructor(...args) {
        super();
        this.chunks = new Map();
        this.materials[0] = new materials_1.Default2DMaterial();
        if (args.length === 0) {
            this.chunkSize = 16;
            this.ChunkType = Chunk;
        }
        else if (args.length === 1) {
            if (typeof (args[0]) === "number") {
                this.chunkSize = args[0];
                this.ChunkType = Chunk;
            }
            else {
                this.chunkSize = 16;
                this.ChunkType = args[0];
            }
        }
        else {
            [this.chunkSize, this.ChunkType] = args;
        }
    }
    render(context, data) {
        this.eventEmitter.with().emit("render", this, context, data);
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
                context.renderer.drawMesh(chunk.mesh, zogra_renderer_1.mat4.fromTranslation(zogra_renderer_1.vec3(chunkX * this.chunkSize, chunkY * this.chunkSize, 0)), this.materials[0]);
            }
    }
    getTile(pos) {
        let [chunkPos, offset] = this.chunkPos(zogra_renderer_1.vec2.math(Math.floor)(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.getTile(offset);
    }
    setTile(pos, tile) {
        let [chunkPos, offset] = this.chunkPos(zogra_renderer_1.vec2.math(Math.floor)(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.setTile(offset, tile);
    }
    getChunkAt(pos) {
        let [chunkPos, _] = this.chunkPos(zogra_renderer_1.vec2.math(Math.floor)(pos));
        return this.getOrCreateChunk(chunkPos);
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
            chunk = new this.ChunkType(chunkPos.mul(this.chunkSize), this.chunkSize);
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
        let x = chunkPos.x;
        let y = chunkPos.y;
        if (chunkPos.x == -0)
            x = 0;
        if (chunkPos.y == -0)
            y = 0;
        const signX = x >= 0 ? 0 : 1;
        const signY = y >= 0 ? 0 : 1;
        return (signX << 31) | (Math.abs(Math.floor(x)) << 16) | (signY << 15) | Math.abs(Math.floor(y));
    }
    /**
     * floor in callee
     * @param pos No need to floor
     * @returns
     */
    chunkPos(pos) {
        let floorPos = zogra_renderer_1.vec2.math(Math.floor)(pos);
        // const floorOffset = vec2(
        //     floorPos.x < 0 ? /*1*/ 0 : 0,
        //     floorPos.y < 0 ? /*1*/ 0 : 0,
        // );
        return [zogra_renderer_1.vec2.math(Math.floor)(zogra_renderer_1.div(floorPos, this.chunkSize)),
            zogra_renderer_1.vec2.math(floorReminder)(floorPos, zogra_renderer_1.vec2(this.chunkSize))];
    }
}
exports.Tilemap = Tilemap;
class Chunk {
    constructor(basePos, chunkSize) {
        this.dirty = false;
        this.chunkSize = chunkSize;
        this.basePos = basePos;
        this.tiles = new Array(chunkSize * chunkSize);
        this.mesh = createChunkMesh(chunkSize);
    }
    getTile(offset) {
        const idx = offset.y * this.chunkSize + offset.x;
        return this.tiles[idx];
    }
    setTile(offset, tile) {
        // if (tile)
        //     tile = {
        //         collide: tile.collide,
        //         texture_offset: tile.texture_offset.clone()
        //     };
        let idx = offset.y * this.chunkSize + offset.x;
        this.tiles[idx] = tile;
        let uv = this.mesh.uvs;
        idx *= 4;
        if (tile === null || tile === void 0 ? void 0 : tile.sprite) {
            uv[idx + 0] = zogra_renderer_1.vec2(tile.sprite.uvRect.xMin, tile.sprite.uvRect.yMin);
            uv[idx + 1] = zogra_renderer_1.vec2(tile.sprite.uvRect.xMax, tile.sprite.uvRect.yMin);
            uv[idx + 2] = zogra_renderer_1.vec2(tile.sprite.uvRect.xMax, tile.sprite.uvRect.yMax);
            uv[idx + 3] = zogra_renderer_1.vec2(tile.sprite.uvRect.xMin, tile.sprite.uvRect.yMax);
        }
        this.mesh.uvs = uv;
    }
}
exports.Chunk = Chunk;
function floorReminder(x, m) {
    return x >= 0
        ? x % m
        : (m + x % m) % m;
}
function createChunkMesh(chunkSize) {
    const builder = new zogra_renderer_1.MeshBuilder();
    const epsilon = 0;
    for (let y = 0; y < chunkSize; y++)
        for (let x = 0; x < chunkSize; x++) {
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