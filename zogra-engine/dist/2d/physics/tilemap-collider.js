import { vec2 } from "zogra-renderer";
import { Tilemap } from "../rendering/tilemap";
import { BoxCollider } from "./box-collider";
import { Collider2D } from "./collider2d";
import { checkCollisionTilemapBox, checkContactTilemapBox } from "./collision/tilemap-box";
export class TilemapCollider extends Collider2D {
    constructor() {
        super(...arguments);
        this._tilemap = null;
    }
    get tilemap() { return this._tilemap; }
    /** @internal */
    __bind(entity, scene) {
        super.__bind(entity, scene);
        if (entity instanceof Tilemap)
            this._tilemap = entity;
    }
    /** @internal */
    checkCollision(other, otherMotion) {
        if (other instanceof BoxCollider)
            return checkCollisionTilemapBox(this, other, otherMotion);
        console.warn("Unimplemented collision check");
        return null;
    }
    /** @internal */
    checkContact(other) {
        if (other instanceof BoxCollider)
            return checkContactTilemapBox(this, other);
        console.warn("Unimplemented contact check");
        return false;
    }
    getPolygons(min, max) {
        if (!this.tilemap)
            return null;
        const pos = vec2.zero();
        const polygons = [];
        for (let y = min.y; y < max.y + this.tilemap.chunkSize; y += this.tilemap.chunkSize) {
            for (let x = min.x; x < max.x + this.tilemap.chunkSize; x += this.tilemap.chunkSize) {
                pos.x = x;
                pos.y = y;
                const chunk = this.tilemap.getChunkAt(pos);
                polygons.push(...chunk.getPolygons());
            }
        }
        return polygons;
    }
}
//# sourceMappingURL=tilemap-collider.js.map