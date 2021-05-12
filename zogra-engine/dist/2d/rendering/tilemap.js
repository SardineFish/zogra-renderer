"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = exports.Tilemap = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_object_1 = require("../../engine/render-object");
const default_materials_1 = require("../../render-pipeline/default-materials");
const polygon_1 = require("../physics/polygon");
class Tilemap extends render_object_1.RenderObject {
    constructor(...args) {
        super();
        this.chunks = new Map();
        this.materials[0] = default_materials_1.BuiltinMaterials.tilemapDefault;
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
    destroy() {
        if (this.destroyed)
            return;
        super.destroy();
        for (const chunk of this.chunks.values()) {
            chunk.destroy();
        }
        this.chunks.clear();
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
        this.polygons = [];
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
        var _a;
        let idx = offset.y * this.chunkSize + offset.x;
        if (((_a = this.tiles[idx]) === null || _a === void 0 ? void 0 : _a.collide) !== (tile === null || tile === void 0 ? void 0 : tile.collide))
            this.dirty = true;
        this.tiles[idx] = tile;
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
    destroy() {
        this.mesh.destroy();
    }
    /** @internal */
    getPolygons() {
        if (this.dirty) {
            this.polygons = Array.from(this.enumPolygons());
            // console.log("gen", this.polygons.reduce((sum, poly) => sum + poly.points.length, 0));
        }
        this.dirty = false;
        return this.polygons;
    }
    *enumPolygons() {
        const validPos = (x, y) => 0 <= x && x < this.chunkSize && 0 <= y && y < this.chunkSize;
        const visited = new Array((this.chunkSize + 1) * (this.chunkSize + 1) * (this.chunkSize + 1) * (this.chunkSize + 1));
        const tileAt = (x, y) => {
            if (!validPos(x, y))
                return null;
            return this.tiles[y * this.chunkSize + x];
        };
        const getEdge = (x, y) => {
            var _a, _b, _c, _d, _e;
            if (!((_a = tileAt(x, y)) === null || _a === void 0 ? void 0 : _a.collide))
                return 0;
            if (!((_b = tileAt(x - 1, y)) === null || _b === void 0 ? void 0 : _b.collide))
                return left;
            if (!((_c = tileAt(x + 1, y)) === null || _c === void 0 ? void 0 : _c.collide))
                return right;
            if (!((_d = tileAt(x, y - 1)) === null || _d === void 0 ? void 0 : _d.collide))
                return down;
            if (!((_e = tileAt(x, y + 1)) === null || _e === void 0 ? void 0 : _e.collide))
                return up;
            return 0;
        };
        const idxOf = (x, y) => y * this.chunkSize + x;
        const edgeOf = (a, b) => idxOf(a.x, a.y) * (this.chunkSize + 1) * (this.chunkSize + 1) + idxOf(b.x, b.y);
        const searchPolygon = (start, next, dir) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            const points = [start, next];
            // visited[edgeOf(start, next)] = true;
            let previous = start.clone();
            let search = true;
            while (search) {
                let head = points[points.length - 1];
                if (visited[edgeOf(previous, head)]) {
                    points.length -= 1;
                    if (points[0].equals(points[points.length - 1]))
                        points.length -= 1;
                    break;
                }
                visited[edgeOf(previous, head)] = true;
                previous.set(head);
                switch (dir) {
                    /*
                     * |---|---|
                     * | 1 | 0 |
                     * |---^---|
                     * | 2 ^   |
                     * |---^---|
                     */
                    case up:
                        if ((_a = tileAt(head.x, head.y)) === null || _a === void 0 ? void 0 : _a.collide) {
                            points.push(zogra_renderer_1.vec2(head.x + 1, head.y));
                            dir = right;
                        }
                        else if ((_b = tileAt(head.x - 1, head.y)) === null || _b === void 0 ? void 0 : _b.collide)
                            head.y += 1;
                        else if ((_c = tileAt(head.x - 1, head.y - 1)) === null || _c === void 0 ? void 0 : _c.collide) {
                            points.push(zogra_renderer_1.vec2(head.x - 1, head.y));
                            dir = left;
                        }
                        else
                            throw new Error("Invalid tilemap");
                        break;
                    /*
                    * |---|---|
                    * | 0 |   |
                    * |---<<<<<
                    * | 1 | 2 |
                    * |---|---|
                    */
                    case left:
                        if ((_d = tileAt(head.x - 1, head.y)) === null || _d === void 0 ? void 0 : _d.collide) {
                            points.push(zogra_renderer_1.vec2(head.x, head.y + 1));
                            dir = up;
                        }
                        else if ((_e = tileAt(head.x - 1, head.y - 1)) === null || _e === void 0 ? void 0 : _e.collide)
                            head.x -= 1;
                        else if ((_f = tileAt(head.x, head.y - 1)) === null || _f === void 0 ? void 0 : _f.collide) {
                            points.push(zogra_renderer_1.vec2(head.x, head.y - 1));
                            dir = down;
                        }
                        else
                            throw new Error("Invalid tilemap");
                        break;
                    /*
                     * |---v---|
                     * |   v 2 |
                     * |---v---|
                     * | 0 | 1 |
                     * |---|---|
                     */
                    case down:
                        if ((_g = tileAt(head.x - 1, head.y - 1)) === null || _g === void 0 ? void 0 : _g.collide) {
                            points.push(zogra_renderer_1.vec2(head.x - 1, head.y));
                            dir = left;
                        }
                        else if ((_h = tileAt(head.x, head.y - 1)) === null || _h === void 0 ? void 0 : _h.collide)
                            head.y -= 1;
                        else if ((_j = tileAt(head.x, head.y)) === null || _j === void 0 ? void 0 : _j.collide) {
                            points.push(zogra_renderer_1.vec2(head.x + 1, head.y));
                            dir = right;
                        }
                        else
                            throw new Error("Invalid tilemap");
                        break;
                    /*
                     * |---|---|
                     * | 2 | 1 |
                     * >>>>>---|
                     * |   | 0 |
                     * |---|---|
                     */
                    case right:
                        if ((_k = tileAt(head.x, head.y - 1)) === null || _k === void 0 ? void 0 : _k.collide) {
                            points.push(zogra_renderer_1.vec2(head.x, head.y - 1));
                            dir = down;
                        }
                        else if ((_l = tileAt(head.x, head.y)) === null || _l === void 0 ? void 0 : _l.collide)
                            head.x += 1;
                        else if ((_m = tileAt(head.x - 1, head.y)) === null || _m === void 0 ? void 0 : _m.collide) {
                            points.push(zogra_renderer_1.vec2(head.x, head.y + 1));
                            dir = up;
                        }
                        else
                            throw new Error("Invalid tilemap");
                        break;
                }
            }
            return points;
        };
        const left = 1, right = 2, up = 3, down = 4;
        // Find a bottom-left most tile and start walking from bottom-left corner to bottom-right corner
        for (let y = 0; y < this.chunkSize; y++) {
            for (let x = 0; x < this.chunkSize; x++) {
                const edge = getEdge(x, y);
                if (!edge)
                    continue;
                let start;
                let next;
                let dir;
                switch (edge) {
                    case left:
                        start = zogra_renderer_1.vec2(x, y + 1);
                        next = zogra_renderer_1.vec2(x, y);
                        dir = down;
                        break;
                    case down:
                        start = zogra_renderer_1.vec2(x, y);
                        next = zogra_renderer_1.vec2(x + 1, y);
                        dir = right;
                        break;
                    case right:
                        start = zogra_renderer_1.vec2(x + 1, y);
                        next = zogra_renderer_1.vec2(x + 1, y + 1);
                        dir = up;
                        break;
                    case up:
                        start = zogra_renderer_1.vec2(x + 1, y + 1);
                        next = zogra_renderer_1.vec2(x, y + 1);
                        dir = down;
                        break;
                }
                if (!visited[edgeOf(start, next)]) {
                    const points = searchPolygon(start, next, dir);
                    const polygon = new polygon_1.Polygon(points.length);
                    for (const point of points) {
                        polygon.append(point.plus(this.basePos));
                    }
                    yield polygon;
                }
            }
        }
    }
}
exports.Chunk = Chunk;
function floorReminder(x, m) {
    return x >= 0
        ? x % m
        : (m + x % m) % m;
}
function createChunkMesh(basePos, chunkSize) {
    const builder = new zogra_renderer_1.MeshBuilder(chunkSize * chunkSize * 4, chunkSize * chunkSize * 6);
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
    return builder.toMesh();
}
//# sourceMappingURL=tilemap.js.map