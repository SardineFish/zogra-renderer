var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { minus, plus, vec2, Mesh, div, VertexStruct, MaterialFromShader, Shader, shaderProp, BufferStructure, GLArrayBuffer, Color, vec4, Blending, DepthTest } from "zogra-renderer";
import { ShaderSource } from "../../assets";
import { RenderObject } from "../../engine/render-object";
import { Polygon } from "../physics/polygon";
const TileInstanceBufferStruct = BufferStructure({
    tileColor: "vec4",
    tileUV: "vec4",
    tilePos: "ivec2",
});
const TileInstanceMeshStruct = BufferStructure({
    vert: "ivec2",
    uv: "vec2",
    normal: "vec3",
});
export const TileInstanceVertexStruct = VertexStruct(Object.assign(Object.assign({}, TileInstanceMeshStruct), TileInstanceBufferStruct));
export class Tilemap extends RenderObject {
    constructor(...args) {
        super();
        this.chunks = new Map();
        this.materials[0] = new DefaultTilemapMaterial();
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
        this.instanceMesh = Tilemap.createInstanceMesh();
    }
    render(context, data) {
        this.eventEmitter.with().emit("render", this, context, data);
        let screenSize = vec2(data.camera.viewHeight * data.camera.aspectRatio, data.camera.viewHeight);
        let [minCorner] = this.chunkPos(minus(data.camera.position.toVec2(), screenSize));
        let [maxCorner] = this.chunkPos(plus(data.camera.position.toVec2(), screenSize));
        // context.renderer.drawMesh(this.mesh, mat4.translate(vec3(0, 0, 0)), this.materials[0]);
        // return;
        for (let chunkY = minCorner.y; chunkY <= maxCorner.y; chunkY++)
            for (let chunkX = minCorner.x; chunkX <= maxCorner.x; chunkX++) {
                const chunk = this.getOrCreateChunk(vec2(chunkX, chunkY));
                // chunk.mesh.update();
                // context.renderer.drawMesh(chunk.mesh, this.localToWorldMatrix, this.materials[0]);
                context.renderer.drawMeshInstance(this.instanceMesh, chunk.buffer, this.materials[0], chunk.buffer.length);
            }
    }
    getTile(pos) {
        let [chunkPos, offset] = this.chunkPos(vec2.math(Math.floor)(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.getTile(offset);
    }
    setTile(pos, tile) {
        let [chunkPos, offset] = this.chunkPos(vec2.math(Math.floor)(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.setTile(offset, tile);
    }
    getChunkAt(pos) {
        let [chunkPos, _] = this.chunkPos(vec2.math(Math.floor)(pos));
        return this.getOrCreateChunk(chunkPos);
    }
    visibleChunkRange(camera) {
        let screenSize = vec2(camera.viewHeight * camera.aspectRatio, camera.viewHeight);
        let [minCorner] = this.chunkPos(minus(camera.position.toVec2(), screenSize));
        let [maxCorner] = this.chunkPos(plus(camera.position.toVec2(), screenSize));
        return [minCorner, plus(maxCorner, 1)];
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
        let floorPos = vec2.math(Math.floor)(pos);
        // const floorOffset = vec2(
        //     floorPos.x < 0 ? /*1*/ 0 : 0,
        //     floorPos.y < 0 ? /*1*/ 0 : 0,
        // );
        return [vec2.math(Math.floor)(div(floorPos, this.chunkSize)),
            vec2.math(floorReminder)(floorPos, vec2(this.chunkSize))];
    }
    static createInstanceMesh() {
        const mesh = new Mesh(TileInstanceMeshStruct);
        mesh.resize(4, 6);
        mesh.vertices[0].vert.set([0, 0]);
        mesh.vertices[1].vert.set([1, 0]);
        mesh.vertices[2].vert.set([1, 1]);
        mesh.vertices[3].vert.set([0, 1]);
        mesh.vertices[0].normal.set([0, 0, 1]);
        mesh.vertices[1].normal.set([0, 0, 1]);
        mesh.vertices[2].normal.set([0, 0, 1]);
        mesh.vertices[3].normal.set([0, 0, 1]);
        mesh.vertices[0].uv.set([0, 0]);
        mesh.vertices[1].uv.set([1, 0]);
        mesh.vertices[2].uv.set([1, 1]);
        mesh.vertices[3].uv.set([0, 1]);
        mesh.indices.set([
            0, 1, 2,
            0, 2, 3
        ]);
        mesh.update();
        return mesh;
    }
}
export class Chunk {
    constructor(basePos, chunkSize) {
        this.polygons = [];
        this.dirty = false;
        this.chunkSize = chunkSize;
        this.basePos = basePos;
        this.tiles = new Array(chunkSize * chunkSize);
        // this.mesh = createChunkMesh(basePos, chunkSize);
        this.buffer = createChunkBuffer(basePos, chunkSize);
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
        // idx *= 4;
        if (tile === null || tile === void 0 ? void 0 : tile.sprite) {
            const element = this.buffer[idx];
            vec4.set(element.tileColor, tile.sprite.color);
            element.tileUV[0] = tile.sprite.uvRect.xMin;
            element.tileUV[1] = tile.sprite.uvRect.yMin;
            element.tileUV[2] = tile.sprite.uvRect.width;
            element.tileUV[3] = tile.sprite.uvRect.height;
        }
        // this.mesh.uvs = uv;
    }
    destroy() {
        this.buffer.destroy();
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
                            points.push(vec2(head.x + 1, head.y));
                            dir = right;
                        }
                        else if ((_b = tileAt(head.x - 1, head.y)) === null || _b === void 0 ? void 0 : _b.collide)
                            head.y += 1;
                        else if ((_c = tileAt(head.x - 1, head.y - 1)) === null || _c === void 0 ? void 0 : _c.collide) {
                            points.push(vec2(head.x - 1, head.y));
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
                            points.push(vec2(head.x, head.y + 1));
                            dir = up;
                        }
                        else if ((_e = tileAt(head.x - 1, head.y - 1)) === null || _e === void 0 ? void 0 : _e.collide)
                            head.x -= 1;
                        else if ((_f = tileAt(head.x, head.y - 1)) === null || _f === void 0 ? void 0 : _f.collide) {
                            points.push(vec2(head.x, head.y - 1));
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
                            points.push(vec2(head.x - 1, head.y));
                            dir = left;
                        }
                        else if ((_h = tileAt(head.x, head.y - 1)) === null || _h === void 0 ? void 0 : _h.collide)
                            head.y -= 1;
                        else if ((_j = tileAt(head.x, head.y)) === null || _j === void 0 ? void 0 : _j.collide) {
                            points.push(vec2(head.x + 1, head.y));
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
                            points.push(vec2(head.x, head.y - 1));
                            dir = down;
                        }
                        else if ((_l = tileAt(head.x, head.y)) === null || _l === void 0 ? void 0 : _l.collide)
                            head.x += 1;
                        else if ((_m = tileAt(head.x - 1, head.y)) === null || _m === void 0 ? void 0 : _m.collide) {
                            points.push(vec2(head.x, head.y + 1));
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
                        start = vec2(x, y + 1);
                        next = vec2(x, y);
                        dir = down;
                        break;
                    case down:
                        start = vec2(x, y);
                        next = vec2(x + 1, y);
                        dir = right;
                        break;
                    case right:
                        start = vec2(x + 1, y);
                        next = vec2(x + 1, y + 1);
                        dir = up;
                        break;
                    case up:
                        start = vec2(x + 1, y + 1);
                        next = vec2(x, y + 1);
                        dir = down;
                        break;
                }
                if (!visited[edgeOf(start, next)]) {
                    const points = searchPolygon(start, next, dir);
                    const polygon = new Polygon(points.length);
                    for (const point of points) {
                        polygon.append(point.plus(this.basePos));
                    }
                    yield polygon;
                }
            }
        }
    }
}
function floorReminder(x, m) {
    return x >= 0
        ? x % m
        : (m + x % m) % m;
}
function createChunkBuffer(basePos, chunkSize) {
    const buffer = new GLArrayBuffer(TileInstanceBufferStruct, chunkSize * chunkSize);
    for (let y = 0; y < chunkSize; y++)
        for (let x = 0; x < chunkSize; x++) {
            const idx = y * chunkSize + x;
            buffer[idx].tilePos[0] = basePos.x + x;
            buffer[idx].tilePos[1] = basePos.y + y;
            buffer[idx].tileColor.fill(0);
            buffer[idx].tileUV.fill(0);
        }
    return buffer;
}
export class DefaultTilemapMaterial extends MaterialFromShader(new Shader(...ShaderSource.tilemapInstance, {
    vertexStructure: TileInstanceVertexStruct,
    attributes: {
        vert: "aPos",
        uv: "aUV",
        normal: "aNormal",
        tileColor: "aTileColor",
        tileUV: "aTileUV",
        tilePos: "aTilePos",
    },
    blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha],
    zWrite: false,
    depth: DepthTest.Disable,
})) {
    constructor() {
        super(...arguments);
        this.texture = null;
        this.color = Color.white;
    }
}
__decorate([
    shaderProp("uMainTex", "tex2d")
], DefaultTilemapMaterial.prototype, "texture", void 0);
__decorate([
    shaderProp("uColor", "color")
], DefaultTilemapMaterial.prototype, "color", void 0);
//# sourceMappingURL=tilemap.js.map