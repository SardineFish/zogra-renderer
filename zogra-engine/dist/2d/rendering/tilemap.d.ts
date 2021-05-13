import { Vector2, vec2, Mesh } from "zogra-renderer";
import { RenderContext, RenderData, Camera } from "../..";
import { RenderObject } from "../../engine/render-object";
import { ConstructorType } from "../../utils/util";
import { Sprite } from "./sprite";
export declare class Tilemap<TChunk extends Chunk = Chunk> extends RenderObject {
    private chunks;
    private ChunkType;
    readonly chunkSize: number;
    constructor();
    constructor(chunkSize: number);
    constructor(chunkType: ConstructorType<TChunk, [vec2, number]>);
    constructor(chunkSize: number, chunkType: ConstructorType<TChunk, [vec2, number]>);
    render(context: RenderContext, data: RenderData): void;
    getTile(pos: Vector2): TileData | null;
    setTile(pos: Vector2, tile: TileData | null): void;
    getChunkAt(pos: Readonly<vec2>): TChunk;
    visibleChunkRange(camera: Camera): [vec2, vec2];
    private getOrCreateChunk;
    private getChunk;
    calcChunkID(chunkPos: Readonly<vec2>): number;
    destroy(): void;
    /**
     * floor in callee
     * @param pos No need to floor
     * @returns
     */
    private chunkPos;
}
export declare class Chunk {
    readonly chunkSize: number;
    readonly basePos: Readonly<vec2>;
    mesh: Mesh;
    protected tiles: Array<TileData | null>;
    private polygons;
    private dirty;
    constructor(basePos: vec2, chunkSize: number);
    /**
     *
     * @param offset Tile offset relative to chunk base position
     * @returns
     */
    getTile(offset: vec2): TileData | null;
    /**
     *
     * @param offset Tile offset relative to chunk base position
     * @param tile
     */
    setTile(offset: vec2, tile: TileData | null): void;
    destroy(): void;
    private enumPolygons;
}
export interface TileData {
    collide: boolean;
    sprite: Sprite | null;
}
