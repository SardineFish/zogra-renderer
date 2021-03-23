import { Vector2, vec2, Mesh } from "zogra-renderer";
import { RenderContext, RenderData, Camera } from "..";
import { RenderObject } from "../engine/render-object";
export declare class Tilemap extends RenderObject {
    private chunks;
    constructor();
    onRender(obj: RenderObject, context: RenderContext, data: RenderData): void;
    getTile(pos: Vector2): TileData | null;
    setTile(pos: Vector2, tile: TileData | null): void;
    visibleChunkRange(camera: Camera): [vec2, vec2];
    private getOrCreateChunk;
    private getChunk;
    calcChunkID(chunkPos: vec2): number;
    private chunkPos;
}
export declare class Chunk {
    tiles: Array<TileData | null>;
    mesh: Mesh;
    getTile(offset: vec2): TileData | null;
    setTile(offset: vec2, tile: TileData | null): void;
}
export interface TileData {
    collide: boolean;
    texture_offset: Vector2;
}
