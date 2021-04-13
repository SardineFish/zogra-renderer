import { vec2 } from "zogra-renderer";
import { Entity } from "../../engine/entity";
import { Scene } from "../../engine/scene";
import { Tilemap } from "../rendering/tilemap";
import { BoxCollider } from "./box-collider";
import { Collider2D, CollisionInfo2D } from "./collider2d";
import { checkCollisionTilemapBox } from "./collision/tilemap-box";

export class TilemapCollider extends Collider2D
{
    private _tilemap: Tilemap | null = null;
    get tilemap() { return this._tilemap; }
    set tilemap(value: Tilemap | null)
    {
        
    }
    
    /** @internal */
    __bind(entity: Entity, scene: Scene)
    {
        super.__bind(entity, scene);
        if (entity instanceof Tilemap)
            this.tilemap = entity;
    }

    /** @internal */
    checkCollision(other: Collider2D, otherMotion: vec2): CollisionInfo2D | null
    {
        if (other instanceof BoxCollider)
            return checkCollisionTilemapBox(this, other, otherMotion);
        
        console.warn("Unimplemented collision check");
        return null;
    }

}