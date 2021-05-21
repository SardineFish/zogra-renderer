import { Vector2, vec2, Texture, GLArrayBuffer, Color } from "zogra-renderer";
import { RenderContext, RenderData, Camera } from "../..";
import { RenderObject } from "../../engine/render-object";
import { ConstructorType } from "../../utils/util";
import { Sprite } from "./sprite";
declare const TileInstanceBufferStruct: {
    tileColor: "vec4";
    tileUV: "vec4";
    tilePos: "ivec2";
};
export declare const TileInstanceVertexStruct: {
    tileColor: "vec4";
    tileUV: "vec4";
    tilePos: "ivec2";
    vert: "ivec2";
    uv: "vec2";
    normal: "vec3";
};
export declare class Tilemap<TChunk extends Chunk = Chunk> extends RenderObject<typeof TileInstanceVertexStruct> {
    private chunks;
    private ChunkType;
    private instanceMesh;
    private batchBuffer;
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
    private static createInstanceMesh;
}
export declare class Chunk {
    readonly chunkSize: number;
    readonly basePos: Readonly<vec2>;
    buffer: GLArrayBuffer<typeof TileInstanceBufferStruct>;
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
declare const DefaultTilemapMaterial_base: new (gl?: WebGL2RenderingContext | undefined) => import("zogra-renderer").Material<{
    tileColor: "vec4";
    tileUV: "vec4";
    tilePos: "ivec2";
    vert: "ivec2";
    uv: "vec2";
    normal: "vec3";
}>;
export declare class DefaultTilemapMaterial extends DefaultTilemapMaterial_base {
    texture: Texture | null;
    color: Color;
}
export {};
