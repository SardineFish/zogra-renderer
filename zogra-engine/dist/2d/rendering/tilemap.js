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
                const chunk = this.getOrCreateChunk(zogra_renderer_1.vec2(chunkX, chunkY));
                // chunk.mesh.update();
                context.renderer.drawMesh(chunk.mesh, this.localToWorldMatrix, this.materials[0]);
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
        this.mesh = createChunkMesh(basePos, chunkSize);
    }
    /**
     *
     * @param offset Tile offset relative to chunk base position
     * @returns
     */
    getTile(offset) {
        const idx = offset.y * this.chunkSize + offset.x;
        return this.tiles[idx];
    }
    /**
     *
     * @param offset Tile offset relative to chunk base position
     * @param tile
     */
    setTile(offset, tile) {
        // if (tile)
        //     tile = {
        //         collide: tile.collide,
        //         texture_offset: tile.texture_offset.clone()
        //     };
        let idx = offset.y * this.chunkSize + offset.x;
        this.tiles[idx] = tile;
        // let uv = this.mesh.uvs;
        idx *= 4;
        if (tile === null || tile === void 0 ? void 0 : tile.sprite) {
            this.mesh.vertices[idx + 0].uv.set([tile.sprite.uvRect.xMin, tile.sprite.uvRect.yMin]);
            this.mesh.vertices[idx + 1].uv.set([tile.sprite.uvRect.xMax, tile.sprite.uvRect.yMin]);
            this.mesh.vertices[idx + 2].uv.set([tile.sprite.uvRect.xMax, tile.sprite.uvRect.yMax]);
            this.mesh.vertices[idx + 3].uv.set([tile.sprite.uvRect.xMin, tile.sprite.uvRect.yMax]);
            this.mesh.vertices[idx + 0].color.set(tile.sprite.color);
            this.mesh.vertices[idx + 1].color.set(tile.sprite.color);
            this.mesh.vertices[idx + 2].color.set(tile.sprite.color);
            this.mesh.vertices[idx + 3].color.set(tile.sprite.color);
            this.mesh.update();
        }
        // this.mesh.uvs = uv;
    }
}
exports.Chunk = Chunk;
function floorReminder(x, m) {
    return x >= 0
        ? x % m
        : (m + x % m) % m;
}
function createChunkMesh(basePos, chunkSize) {
    const builder = new zogra_renderer_1.MeshBuilderEx(chunkSize * chunkSize * 4, chunkSize * chunkSize * 6);
    const quad = [
        {
            vert: zogra_renderer_1.vec3(0),
            uv: zogra_renderer_1.vec2(0, 0),
        },
        {
            vert: zogra_renderer_1.vec3(0),
            uv: zogra_renderer_1.vec2(1, 0),
        },
        {
            vert: zogra_renderer_1.vec3(0),
            uv: zogra_renderer_1.vec2(1, 1),
        },
        {
            vert: zogra_renderer_1.vec3(0),
            uv: zogra_renderer_1.vec2(0, 1),
        }
    ];
    for (let y = 0; y < chunkSize; y++)
        for (let x = 0; x < chunkSize; x++) {
            quad[0].vert.set([x + basePos.x, y + basePos.y, 0]);
            quad[1].vert.set([x + 1 + basePos.x, y + basePos.y, 0]);
            quad[2].vert.set([x + 1 + basePos.x, y + 1 + basePos.y, 0]);
            quad[3].vert.set([x + basePos.x, y + 1 + basePos.y, 0]);
            builder.addPolygon(...quad);
        }
    return builder.getMesh();
}
//# sourceMappingURL=tilemap.js.map