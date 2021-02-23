"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
const math_1 = require("./math");
const vec2_1 = require("./vec2");
class Rect {
    constructor(min, size) {
        this.min = min;
        this.max = math_1.plus(min, size);
    }
    get xMin() { return this.min.x; }
    get yMin() { return this.min.y; }
    get xMax() { return this.max.x; }
    get yMax() { return this.max.y; }
    get size() { return math_1.minus(this.max, this.min); }
    get center() { return math_1.plus(this.min, this.max).mul(vec2_1.vec2(.5)); }
    shrink(thickness) {
        let min = math_1.plus(this.min, vec2_1.vec2(thickness));
        let max = math_1.minus(this.max, vec2_1.vec2(thickness));
        if (min.x > max.x)
            min.x = max.x = (min.x + max.x) / 2;
        if (min.y > max.y)
            min.y = max.y = (min.y + max.y) / 2;
        return new Rect(min, max.minus(min));
    }
    expand(thickness) {
        return new Rect(math_1.minus(this.min, vec2_1.vec2(thickness)), math_1.plus(this.size, vec2_1.vec2(2 * thickness)));
    }
}
exports.Rect = Rect;
//# sourceMappingURL=rect.js.map