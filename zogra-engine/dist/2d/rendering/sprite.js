"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
const zogra_renderer_1 = require("zogra-renderer");
class Sprite {
    constructor(texture, cellCount, cell) {
        this.color = zogra_renderer_1.Color.white;
        this.texture = texture;
        this.uvRect = new zogra_renderer_1.Rect(zogra_renderer_1.div(cell, cellCount), zogra_renderer_1.div(1, cellCount));
    }
}
exports.Sprite = Sprite;
//# sourceMappingURL=sprite.js.map