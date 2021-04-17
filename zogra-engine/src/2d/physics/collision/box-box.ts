import { minus, vec2 } from "zogra-renderer";
import { BoxCollider } from "../box-collider";

export function checkContactBoxBox(self: BoxCollider, other: BoxCollider): boolean
{
    if (!self.entity || !other.entity)
        return false;
    const selfCenter = self.entity.position.toVec2().plus(self.offset);
    const otherCenter = other.entity.position.toVec2().plus(other.offset);
    const offset = vec2.math(Math.abs)(vec2.minus(otherCenter, selfCenter));
    if (offset.x <= (self.size.x + other.size.x) / 2 && offset.y <= (self.size.y + other.size.y) / 2)
        return true;
    return false;
}