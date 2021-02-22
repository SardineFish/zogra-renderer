import { minus, plus } from "./math";
import { vec2 } from "./vec2";

export class Rect
{
    min: vec2;
    max: vec2;
    constructor(min: vec2, size: vec2)
    {
        this.min = min;
        this.max = plus(min, size);
    }

    get xMin() { return this.min.x }
    get yMin() { return this.min.y }
    get xMax() { return this.max.x }
    get yMax() { return this.max.y }
    get size() { return minus(this.max, this.min) }
    get center() { return plus(this.min, this.max).mul(vec2(.5)) }

}