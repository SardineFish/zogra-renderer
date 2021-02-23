import { Rect } from "../types/rect";
import { vec2 } from "../types/vec2";
export declare enum ImageSizing {
    Stretch = 1,
    Cover = 2,
    Contain = 3,
    KeepLower = 4,
    KeepHigher = 5,
    Center = 6
}
export declare function imageResize(srcSize: vec2, dstSize: vec2, sizing: ImageSizing): [Rect, Rect];
