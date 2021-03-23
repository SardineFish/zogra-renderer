import { Rect, Texture, vec2 } from "zogra-renderer";
export declare class Sprite {
    texture: Texture;
    uvRect: Rect;
    constructor(texture: Texture, cellCount: vec2, cell: vec2);
}
