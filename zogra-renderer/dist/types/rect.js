import { minus, plus } from "./math";
import { vec2 } from "./vec2";
export class Rect {
    constructor(min, size) {
        this.min = min;
        this.max = plus(min, size);
    }
    get xMin() { return this.min.x; }
    get yMin() { return this.min.y; }
    get xMax() { return this.max.x; }
    get yMax() { return this.max.y; }
    get size() { return minus(this.max, this.min); }
    get center() { return plus(this.min, this.max).mul(vec2(.5)); }
    shrink(thickness) {
        let min = plus(this.min, vec2(thickness));
        let max = minus(this.max, vec2(thickness));
        if (min.x > max.x)
            min.x = max.x = (min.x + max.x) / 2;
        if (min.y > max.y)
            min.y = max.y = (min.y + max.y) / 2;
        return new Rect(min, max.minus(min));
    }
    expand(thickness) {
        return new Rect(minus(this.min, vec2(thickness)), plus(this.size, vec2(2 * thickness)));
    }
    static box01() {
        return new Rect(vec2.zero(), vec2.one());
    }
}
//# sourceMappingURL=rect.js.map