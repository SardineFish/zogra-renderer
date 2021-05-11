import { minus, plus, Vector2, vec2, vec3, Mesh, MeshBuilder, div, mat4} from "zogra-renderer";
import { RenderContext, RenderData, Camera } from "../..";
import { RenderObject, RenderObjectEvents } from "../../engine/render-object";
import { BuiltinMaterials } from "../../render-pipeline/default-materials";
import { ConstructorType } from "../../utils/util";
import { Polygon } from "../physics/polygon";
import { Default2DMaterial } from "./materials";
import { Sprite } from "./sprite";

export class Tilemap<TChunk extends Chunk = Chunk> extends RenderObject
{
    private chunks = new Map<number, TChunk>();
    private ChunkType: ConstructorType<TChunk, [vec2, number]>;
    readonly chunkSize;

    constructor()
    constructor(chunkSize: number)
    constructor(chunkType: ConstructorType<TChunk, [vec2, number]>)
    constructor(chunkSize: number, chunkType: ConstructorType<TChunk, [vec2, number]>)
    constructor(...args: [] | [number] | [ConstructorType<TChunk, [vec2, number]>] | [number, ConstructorType<TChunk, [vec2, number]>])
    {
        super();
        this.materials[0] = BuiltinMaterials.tilemapDefault;
        if (args.length === 0)
        {
            this.chunkSize = 16;
            this.ChunkType = Chunk as any;
        }
        else if (args.length === 1)
        {
            if (typeof (args[0]) === "number")
            {
                this.chunkSize = args[0];
                this.ChunkType = Chunk as any;
            }
            else
            {
                this.chunkSize = 16;
                this.ChunkType = args[0];
            }
        }
        else
        {
            [this.chunkSize, this.ChunkType] = args;
        }
    }

    render(context: RenderContext, data: RenderData)
    {
        this.eventEmitter.with<RenderObjectEvents>().emit("render", this, context, data);

        let screenSize = vec2(data.camera.viewHeight * data.camera.aspectRatio, data.camera.viewHeight);
        let [minCorner] = this.chunkPos(minus(data.camera.position.toVec2(), screenSize));
        let [maxCorner] = this.chunkPos(plus(data.camera.position.toVec2(), screenSize));
        // context.renderer.drawMesh(this.mesh, mat4.translate(vec3(0, 0, 0)), this.materials[0]);
        // return;
        for (let chunkY = minCorner.y; chunkY <= maxCorner.y; chunkY++)
            for (let chunkX = minCorner.x; chunkX <= maxCorner.x; chunkX++)
            {
                const chunk = this.getOrCreateChunk(vec2(chunkX, chunkY));
                // chunk.mesh.update();
                context.renderer.drawMesh(chunk.mesh, this.localToWorldMatrix, this.materials[0]);
            }
    }

    getTile(pos: Vector2): TileData | null
    {
        let [chunkPos, offset] = this.chunkPos(vec2.math(Math.floor)(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.getTile(offset);
    }

    setTile(pos: Vector2, tile: TileData | null)
    {
        let [chunkPos, offset] = this.chunkPos(vec2.math(Math.floor)(pos));
        let chunk = this.getOrCreateChunk(chunkPos);
        return chunk.setTile(offset, tile);
    }

    getChunkAt(pos: Readonly<vec2>): TChunk
    {
        let [chunkPos, _] = this.chunkPos(vec2.math(Math.floor)(pos));
        return this.getOrCreateChunk(chunkPos);
    }

    visibleChunkRange(camera: Camera): [vec2, vec2]
    {
        let screenSize = vec2(camera.viewHeight * camera.aspectRatio, camera.viewHeight);
        let [minCorner] = this.chunkPos(minus(camera.position.toVec2(), screenSize));
        let [maxCorner] = this.chunkPos(plus(camera.position.toVec2(), screenSize));
        return [minCorner, plus(maxCorner, 1)];
    }

    private getOrCreateChunk(chunkPos: Vector2): TChunk
    {
        const idx = this.calcChunkID(chunkPos);
        let chunk = this.chunks.get(idx);
        if (!chunk)
        {
            chunk = new this.ChunkType(chunkPos.mul(this.chunkSize), this.chunkSize);
            this.chunks.set(idx, chunk);
            return chunk;
        }
        return chunk;
    }

    private getChunk(chunkPos: Readonly<vec2>): TChunk | undefined
    {
        const idx = this.calcChunkID(chunkPos);
        return this.chunks.get(idx);
    }

    calcChunkID(chunkPos: Readonly<vec2>)
    {
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
    private chunkPos(pos: Readonly<vec2>): [Vector2, Vector2]
    {
        let floorPos = vec2.math(Math.floor)(pos);
        // const floorOffset = vec2(
        //     floorPos.x < 0 ? /*1*/ 0 : 0,
        //     floorPos.y < 0 ? /*1*/ 0 : 0,
        // );
        return [vec2.math(Math.floor)(div(floorPos, this.chunkSize)),
            vec2.math(floorReminder)(floorPos, vec2(this.chunkSize))];
    }
}

export class Chunk
{
    readonly chunkSize;
    readonly basePos: Readonly<vec2>;
    mesh: Mesh;
    
    protected tiles: Array<TileData | null>;
    private polygons: Polygon[] = [];
    private dirty = false;

    constructor(basePos: vec2, chunkSize: number)
    {
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
    getTile(offset: vec2): TileData | null
    {
        const idx = offset.y * this.chunkSize + offset.x;
        return this.tiles[idx];
    }

    /**
     * 
     * @param offset Tile offset relative to chunk base position
     * @param tile 
     */
    setTile(offset: vec2, tile: TileData | null)
    {

        let idx = offset.y * this.chunkSize + offset.x;
        if (this.tiles[idx]?.collide !== tile?.collide)
            this.dirty = true;
        this.tiles[idx] = tile;



        idx *= 4;
        if (tile?.sprite)
        {
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

    /** @internal */
    getPolygons()
    {
        if (this.dirty)
        {
            this.polygons = Array.from(this.enumPolygons());
            // console.log("gen", this.polygons.reduce((sum, poly) => sum + poly.points.length, 0));
        }
        this.dirty = false;
        return this.polygons;
    }

    private *enumPolygons()
    {
        const validPos = (x: number, y: number) => 0 <= x && x < this.chunkSize && 0 <= y && y < this.chunkSize;
        const visited = new Array<boolean>((this.chunkSize + 1) * (this.chunkSize + 1) * (this.chunkSize + 1) * (this.chunkSize + 1));
        const tileAt = (x: number, y: number) =>
        {
            if (!validPos(x, y))
                return null;
            return this.tiles[y * this.chunkSize + x];
        }
        const getEdge = (x: number, y: number) =>
        {
            if (!tileAt(x, y)?.collide)
                return 0;
            if (!tileAt(x - 1, y)?.collide)
                return left;
            if (!tileAt(x + 1, y)?.collide)
                return right;
            if (!tileAt(x, y - 1)?.collide)
                return down;
            if (!tileAt(x, y + 1)?.collide)
                return up;
            return 0;
        }
        const idxOf = (x: number, y: number) => y * this.chunkSize + x;
        const edgeOf = (a: vec2, b: vec2) => idxOf(a.x, a.y) * (this.chunkSize + 1) * (this.chunkSize + 1) + idxOf(b.x, b.y);
        

        const searchPolygon = (start: vec2, next: vec2, dir: number) =>
        {
            const points: vec2[] = [start, next];
            // visited[edgeOf(start, next)] = true;
            let previous = start.clone();
            let search = true;
            while (search)
            {
                let head = points[points.length - 1];
                if (visited[edgeOf(previous, head)])
                {
                    points.length -= 1;
                    if (points[0].equals(points[points.length - 1]))
                        points.length -= 1;
                    break;
                }
                visited[edgeOf(previous, head)] = true;
                previous.set(head);
                switch (dir)
                {
                    /*
                     * |---|---|
                     * | 1 | 0 |
                     * |---^---|
                     * | 2 ^   |
                     * |---^---|
                     */
                    case up:
                        if (tileAt(head.x, head.y)?.collide)
                        {
                            points.push(vec2(head.x + 1, head.y));
                            dir = right;
                        }
                        else if (tileAt(head.x - 1, head.y)?.collide)
                            head.y += 1;
                        else if (tileAt(head.x - 1, head.y - 1)?.collide)
                        {
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
                        if (tileAt(head.x - 1, head.y)?.collide)
                        {
                            points.push(vec2(head.x, head.y + 1));
                            dir = up;
                        }
                        else if (tileAt(head.x - 1, head.y - 1)?.collide)
                            head.x -= 1;
                        else if (tileAt(head.x, head.y - 1)?.collide)
                        {
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
                        if (tileAt(head.x - 1, head.y - 1)?.collide)
                        {
                            points.push(vec2(head.x - 1, head.y));
                            dir = left;
                        }
                        else if (tileAt(head.x, head.y - 1)?.collide)
                            head.y -= 1;
                        else if (tileAt(head.x, head.y)?.collide)
                        {
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
                        if (tileAt(head.x, head.y - 1)?.collide)
                        {
                            points.push(vec2(head.x, head.y - 1));
                            dir = down;
                        }
                        else if (tileAt(head.x, head.y)?.collide)
                            head.x += 1;
                        else if (tileAt(head.x - 1, head.y)?.collide)
                        {
                            points.push(vec2(head.x, head.y + 1));
                            dir = up;
                        }
                        else
                            throw new Error("Invalid tilemap");
                        break;
                }
            }

            return points;
        }

        const left = 1, right = 2, up = 3, down = 4;

        // Find a bottom-left most tile and start walking from bottom-left corner to bottom-right corner
        for (let y = 0; y < this.chunkSize; y++)
        {
            for (let x = 0; x < this.chunkSize; x++)
            {
                const edge = getEdge(x, y);
                if (!edge)
                    continue;
                let start: vec2;
                let next: vec2;
                let dir: number;
                switch (edge)
                {
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
                if (!visited[edgeOf(start, next)])
                {
                    const points = searchPolygon(start, next, dir);
                    const polygon = new Polygon(points.length);

                    for (const point of points)
                    {
                        polygon.append(point.plus(this.basePos));
                    }
                    yield polygon;

                }
            }
        }
        
    }
}

export interface TileData
{
    collide: boolean;
    sprite: Sprite | null;
}

function floorReminder(x: number, m: number)
{
    return x >= 0
        ? x % m
        : (m + x % m) % m;
}

function createChunkMesh(basePos: Readonly<vec2>, chunkSize: number)
{
    const builder = new MeshBuilder(chunkSize * chunkSize * 4, chunkSize * chunkSize * 6);
    const quad = [
        {
            vert: vec3(0),
            uv: vec2(0, 0),
        },
        {
            vert: vec3(0),
            uv: vec2(1, 0),
        },
        {
            vert: vec3(0),
            uv: vec2(1, 1),
        },
        {
            vert: vec3(0),
            uv: vec2(0, 1),
        }];
    for (let y = 0; y < chunkSize; y++)
        for (let x = 0; x < chunkSize; x++)
        {
            quad[0].vert.set([x + basePos.x, y + basePos.y, 0]);
            quad[1].vert.set([x + 1 + basePos.x, y + basePos.y, 0]);
            quad[2].vert.set([x + 1 + basePos.x, y + 1 + basePos.y, 0]);
            quad[3].vert.set([x + basePos.x, y + 1 + basePos.y, 0]);
            builder.addPolygon(...quad);
        }
    
    return builder.toMesh();
}
