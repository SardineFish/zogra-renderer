import { Tilemap } from "../rendering/tilemap";
import { Collider2D } from "./collider2d";
export declare class TilemapCollider extends Collider2D {
    private _tilemap;
    get tilemap(): Tilemap<import("../rendering/tilemap").Chunk> | null;
}
