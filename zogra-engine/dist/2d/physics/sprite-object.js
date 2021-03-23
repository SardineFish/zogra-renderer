"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteObject = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const __1 = require("..");
const materials_1 = require("./materials");
class SpriteObject extends __1.RenderObject {
    constructor() {
        super();
        this.mesh = zogra_renderer_1.MeshBuilder.quad();
        this.material = new materials_1.Default2DMaterial();
        this._sprite = null;
        this.meshes[0] = this.mesh;
        this.materials[0] = this.material;
    }
    get sprite() { return this._sprite; }
    set sprite(sprite) {
        this._sprite = sprite;
        if (sprite) {
            this.material.texture = sprite.texture;
            this.mesh.uvs = [
                zogra_renderer_1.vec2(sprite.uvRect.xMin, sprite.uvRect.yMin),
                zogra_renderer_1.vec2(sprite.uvRect.xMax, sprite.uvRect.yMin),
                zogra_renderer_1.vec2(sprite.uvRect.xMax, sprite.uvRect.yMax),
                zogra_renderer_1.vec2(sprite.uvRect.xMin, sprite.uvRect.yMax),
            ];
            this.mesh.update();
        }
        else {
            this.material.texture = null;
        }
    }
}
exports.SpriteObject = SpriteObject;
//# sourceMappingURL=sprite-object.js.map