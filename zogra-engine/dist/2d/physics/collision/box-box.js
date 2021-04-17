"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkContactBoxBox = void 0;
const zogra_renderer_1 = require("zogra-renderer");
function checkContactBoxBox(self, other) {
    if (!self.entity || !other.entity)
        return false;
    const selfCenter = self.entity.position.toVec2().plus(self.offset);
    const otherCenter = other.entity.position.toVec2().plus(other.offset);
    const offset = zogra_renderer_1.vec2.math(Math.abs)(zogra_renderer_1.vec2.minus(otherCenter, selfCenter));
    if (offset.x <= (self.size.x + other.size.x) / 2 && offset.y <= (self.size.y + other.size.y) / 2)
        return true;
    return false;
}
exports.checkContactBoxBox = checkContactBoxBox;
//# sourceMappingURL=box-box.js.map