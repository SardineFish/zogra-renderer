import { Rect, vec2 } from "zogra-renderer";
export declare class Polygon {
    points: vec2[];
    bound: Rect;
    constructor(capacity?: number);
    append(vert: vec2): void;
}
