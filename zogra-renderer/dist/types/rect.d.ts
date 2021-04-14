import { vec2 } from "./vec2";
export declare class Rect {
    min: vec2;
    max: vec2;
    constructor(min: vec2, size: vec2);
    get xMin(): number;
    get yMin(): number;
    get xMax(): number;
    get yMax(): number;
    get size(): import("./vec2").Vector2 & import("./generic").Vector;
    get center(): import("./vec2").Vector2 & import("./generic").Vector;
    shrink(thickness: number): Rect;
    expand(thickness: number): Rect;
    static box01(): Rect;
}
