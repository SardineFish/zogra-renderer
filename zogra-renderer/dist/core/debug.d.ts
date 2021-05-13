import { Color } from "../types/color";
import { Rect } from "../types/rect";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
export declare abstract class DebugProvider {
    abstract drawLine(start: vec3, end: vec3, color?: Color): void;
    drawRay(origin: vec3, dir: vec3, distance?: number, color?: Color): void;
    drawRect(min: vec2, max: vec2, color?: Color): void;
    drawRect(rect: Rect, color?: Color): void;
    drawLines(points: vec3[], color?: Color): void;
    drawCircle(center: Readonly<vec3>, radius: number, color?: Color): void;
}
