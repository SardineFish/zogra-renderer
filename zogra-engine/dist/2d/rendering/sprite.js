import { Color, div, Rect } from "zogra-renderer";
export class Sprite {
    constructor(texture, cellCount, cell) {
        this.color = Color.white;
        this.texture = texture;
        this.uvRect = new Rect(div(cell, cellCount), div(1, cellCount));
    }
}
//# sourceMappingURL=sprite.js.map