import { vec2 } from "zogra-renderer";
export function checkContactBoxBox(self, other) {
    if (!self.entity || !other.entity)
        return false;
    const selfCenter = self.entity.position.toVec2().plus(self.offset);
    const otherCenter = other.entity.position.toVec2().plus(other.offset);
    const offset = vec2.math(Math.abs)(vec2.minus(otherCenter, selfCenter));
    if (offset.x <= (self.size.x + other.size.x) / 2 && offset.y <= (self.size.y + other.size.y) / 2)
        return true;
    return false;
}
//# sourceMappingURL=box-box.js.map