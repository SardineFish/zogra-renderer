import { vec2 } from "zogra-renderer";
import { BoxCollider } from "../box-collider";
import { CollisionInfo2D } from "../collider2d";
import { TilemapCollider } from "../tilemap-collider";
export declare function checkCollisionTilemapBox(tilemap: TilemapCollider, box: BoxCollider, boxMotion: vec2): CollisionInfo2D | null;
