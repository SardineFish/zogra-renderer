import { vec2 } from "zogra-renderer";
import { Collider2D, CollisionInfo2D } from "./collider2d";
import { checkContactBoxBox } from "./collision/box-box";
import { checkCollisionTilemapBox, checkContactTilemapBox } from "./collision/tilemap-box";
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

    /** @internal */
    checkContact(other: Collider2D): boolean
    {
        if (other instanceof TilemapCollider)
            return checkContactTilemapBox(other, this);
        else if (other instanceof BoxCollider)
            return checkContactBoxBox(this, other);
        
        console.warn("Unimplemented collision check");
        return false;
    }
}