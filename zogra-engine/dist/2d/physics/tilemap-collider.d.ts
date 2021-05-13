import { vec2 } from "zogra-renderer";
import { Tilemap } from "../rendering/tilemap";
import { Collider2D } from "./collider2d";
import { Polygon } from "./polygon";
export declare class TilemapCollider extends Collider2D {
    private _tilemap;
    get tilemap(): Tilemap<import("../rendering/tilemap").Chunk> | null;
    getPolygons(min: Readonly<vec2>, max: Readonly<vec2>): Polygon[] | null;
}
