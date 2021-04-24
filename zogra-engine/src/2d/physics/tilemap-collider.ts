import { vec2 } from "zogra-renderer";
import { Entity } from "../../engine/entity";
import { Scene } from "../../engine/scene";
import { Tilemap } from "../rendering/tilemap";
import { BoxCollider } from "./box-collider";
import { Collider2D, CollisionInfo2D } from "./collider2d";
import { checkCollisionTilemapBox, checkContactTilemapBox } from "./collision/tilemap-box";
import { Polygon } from "./polygon";

export class TilemapCollider extends Collider2D
{
    private _tilemap: Tilemap | null = null;
    get tilemap() { return this._tilemap; }
    
    /** @internal */
    __bind(entity: Entity, scene: Scene)
    {
        super.__bind(entity, scene);
        if (entity instanceof Tilemap)
            this._tilemap = entity;
    }

    /** @internal */
    checkCollision(other: Collider2D, otherMotion: vec2): CollisionInfo2D | null
    {
        if (other instanceof BoxCollider)
            return checkCollisionTilemapBox(this, other, otherMotion);
        
        console.warn("Unimplemented collision check");
        return null;
    }

    /** @internal */
    checkContact(other: Collider2D)
    {
        if (other instanceof BoxCollider)
            return checkContactTilemapBox(this, other);
        
        console.warn("Unimplemented contact check");
        return false;
    }

    getPolygons(min: Readonly<vec2>, max: Readonly<vec2>)
    {
        if (!this.tilemap)
            return null;
        const pos = vec2.zero();
        const polygons = [] as Polygon[];
        for (let y = min.y; y < max.y; y += this.tilemap.chunkSize)
        {
            for (let x = min.x; x < max.x; x += this.tilemap.chunkSize)
            {
                pos.x = x;
                pos.y = y;
                const chunk = this.tilemap.getChunkAt(pos);
                polygons.push(...chunk.getPolygons());
            }
        }
        return polygons;
    }
}