"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilemapCollider = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const tilemap_1 = require("../rendering/tilemap");
const box_collider_1 = require("./box-collider");
const collider2d_1 = require("./collider2d");
const tilemap_box_1 = require("./collision/tilemap-box");
class TilemapCollider extends collider2d_1.Collider2D {
    constructor() {
        super(...arguments);
        this._tilemap = null;
    }
    get tilemap() { return this._tilemap; }
    /** @internal */
    __bind(entity, scene) {
        super.__bind(entity, scene);
        if (entity instanceof tilemap_1.Tilemap)
            this._tilemap = entity;
    }
    /** @internal */
    checkCollision(other, otherMotion) {
        if (other instanceof box_collider_1.BoxCollider)
            return tilemap_box_1.checkCollisionTilemapBox(this, other, otherMotion);
        console.warn("Unimplemented collision check");
        return null;
    }
    /** @internal */
    checkContact(other) {
        if (other instanceof box_collider_1.BoxCollider)
            return tilemap_box_1.checkContactTilemapBox(this, other);
        console.warn("Unimplemented contact check");
        return false;
    }
    getPolygons(min, max) {
        if (!this.tilemap)
            return null;
        const pos = zogra_renderer_1.vec2.zero();
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
exports.TilemapCollider = TilemapCollider;
//# sourceMappingURL=tilemap-collider.js.map