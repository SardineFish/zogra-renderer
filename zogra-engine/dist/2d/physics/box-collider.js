import { vec2 } from "zogra-renderer";
import { Collider2D } from "./collider2d";
import { checkContactBoxBox } from "./collision/box-box";
import { checkCollisionTilemapBox, checkContactTilemapBox } from "./collision/tilemap-box";
import { TilemapCollider } from "./tilemap-collider";
export class BoxCollider extends Collider2D {
    constructor() {
        super(...arguments);
        this.offset = vec2.zero();
        this.size = vec2.one();
    }
    /** @internal */
    checkCollision(other, otherMotion) {
        if (other instanceof TilemapCollider)
            return checkCollisionTilemapBox(other, this, otherMotion.negative);
        console.warn("Unimplemented collision check");
        return null;
    }
    /** @internal */
    checkContact(other) {
        if (other instanceof TilemapCollider)
            return checkContactTilemapBox(other, this);
        else if (other instanceof BoxCollider)
            return checkContactBoxBox(this, other);
        console.warn("Unimplemented collision check");
        return false;
    }
}
//# sourceMappingURL=box-collider.js.map