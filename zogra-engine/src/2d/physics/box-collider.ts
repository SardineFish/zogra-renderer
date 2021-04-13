import { vec2 } from "zogra-renderer";
import { Collider2D, CollisionInfo2D } from "./collider2d";
import { checkCollisionTilemapBox } from "./collision/tilemap-box";
import { TilemapCollider } from "./tilemap-collider";

export class BoxCollider extends Collider2D
{
    offset: vec2 = vec2.zero();
    size: vec2 = vec2.one();

    /** @internal */
    checkCollision(other: Collider2D, otherMotion: vec2): CollisionInfo2D | null
    {
        if (other instanceof TilemapCollider)
            return checkCollisionTilemapBox(other, this, otherMotion.negative);
        
        console.warn("Unimplemented collision check");
        return null;
    }
}