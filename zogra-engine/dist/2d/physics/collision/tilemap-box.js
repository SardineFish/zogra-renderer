"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCollisionTilemapBox = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const global_1 = require("zogra-renderer/dist/core/global");
function checkCollisionTilemapBox(tilemap, box, boxMotion) {
    if (!box.entity || !tilemap.tilemap)
        return null;
    const halfSize = zogra_renderer_1.div(box.size, 2); // colliderSize / 2
    const center = box.entity.position.toVec2().plus(box.offset);
    const centerBeforeMotion = zogra_renderer_1.minus(center, boxMotion); // this.position + this.colliderOffset
    const tileDistance = zogra_renderer_1.vec2.math(Math.ceil)(halfSize);
    const centerFloor = zogra_renderer_1.vec2.math(Math.floor)(centerBeforeMotion);
    const motionDistance = boxMotion.magnitude;
    let everHit = false;
    let hitNormal = zogra_renderer_1.vec2.zero();
    let nearestHit = Number.MAX_VALUE;
    for (var y = -tileDistance.y; y <= tileDistance.y; y++)
        for (var x = -tileDistance.x; x <= tileDistance.x; x++) {
            const rect = new zogra_renderer_1.Rect(zogra_renderer_1.vec2(x, y).plus(centerFloor), zogra_renderer_1.plus(box.size, 1));
            global_1.Debug().drawRect(rect);
            const [hit, distance, normal] = zogra_renderer_1.boxRaycast(rect, centerBeforeMotion, boxMotion);
            if (hit && distance > 0 && distance <= motionDistance && zogra_renderer_1.dot(normal, boxMotion) < 0) {
                if (distance < nearestHit) {
                    everHit = true;
                    hitNormal = normal;
                }
            }
        }
    if (everHit) {
        const hitPoint = boxMotion.normalized.mul(nearestHit).plus(centerBeforeMotion);
        return {
            self: tilemap,
            other: box,
            point: hitPoint,
            seperation: zogra_renderer_1.minus(hitPoint, center),
        };
    }
    return null;
}
exports.checkCollisionTilemapBox = checkCollisionTilemapBox;
//# sourceMappingURL=tilemap-box.js.map