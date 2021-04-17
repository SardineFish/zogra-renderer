"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxCollider = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const collider2d_1 = require("./collider2d");
const box_box_1 = require("./collision/box-box");
const tilemap_box_1 = require("./collision/tilemap-box");
const tilemap_collider_1 = require("./tilemap-collider");
class BoxCollider extends collider2d_1.Collider2D {
    constructor() {
        super(...arguments);
        this.offset = zogra_renderer_1.vec2.zero();
        this.size = zogra_renderer_1.vec2.one();
    }
    /** @internal */
    checkCollision(other, otherMotion) {
        if (other instanceof tilemap_collider_1.TilemapCollider)
            return tilemap_box_1.checkCollisionTilemapBox(other, this, otherMotion.negative);
        console.warn("Unimplemented collision check");
        return null;
    }
    /** @internal */
    checkContact(other) {
        if (other instanceof tilemap_collider_1.TilemapCollider)
            return tilemap_box_1.checkContactTilemapBox(other, this);
        else if (other instanceof BoxCollider)
            return box_box_1.checkContactBoxBox(this, other);
        console.warn("Unimplemented collision check");
        return false;
    }
}
exports.BoxCollider = BoxCollider;
//# sourceMappingURL=box-collider.js.map