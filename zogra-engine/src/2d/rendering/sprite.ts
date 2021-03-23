import { div, Rect, Texture, vec2 } from "zogra-renderer";

export class Sprite
{
    texture: Texture;
    uvRect: Rect;

    constructor(texture: Texture, cellCount: vec2, cell: vec2)
    {
        this.texture = texture;
        this.uvRect = new Rect(div(cell, cellCount), div(1, cellCount));
    }
}