import { boxRaycast, div, dot, minus, plugins, plus, Rect, vec2 } from "zogra-renderer";
import { Debug } from "zogra-renderer/dist/core/global";
import { Tilemap } from "../../rendering/tilemap";
import { BoxCollider } from "../box-collider";
import { CollisionInfo2D } from "../collider2d";
import { TilemapCollider } from "../tilemap-collider";

export function checkCollisionTilemapBox(tilemap: TilemapCollider, box: BoxCollider, boxMotion: vec2): CollisionInfo2D | null
{
    if (!box.entity || !tilemap.tilemap)
        return null;
    const halfSize = div(box.size, 2); // colliderSize / 2
    const center = box.entity.position.toVec2().plus(box.offset);
    const centerBeforeMotion = minus(center, boxMotion); // this.position + this.colliderOffset
    const tileDistance = vec2.math(Math.ceil)(halfSize);
    const centerFloor = vec2.math(Math.floor)(centerBeforeMotion);
    const motionDistance = boxMotion.magnitude;
    let everHit = false;
    let hitNormal = vec2.zero();
    let nearestHit = Number.MAX_VALUE;

    for (var y = -tileDistance.y; y <= tileDistance.y; y++)
    for (var x = -tileDistance.x; x <= tileDistance.x; x++)
    {
        const rect = new Rect(vec2(x, y).plus(centerFloor), plus(box.size, 1));
        Debug().drawRect(rect);
        const [hit, distance, normal] = boxRaycast(rect, centerBeforeMotion, boxMotion);
        if (hit && distance > 0 && distance <= motionDistance && dot(normal, boxMotion) < 0)
        {
            if (distance < nearestHit)
            {
                everHit = true;
                hitNormal = normal;
            }
        }
    }

    if (everHit)
    {
        const hitPoint = boxMotion.normalized.mul(nearestHit).plus(centerBeforeMotion);
        return {
            self: tilemap,
            other: box,
            point: hitPoint,
            seperation: minus(hitPoint, center),
        }
    }
    return null;
}