"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteObject = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_object_1 = require("../../engine/render-object");
const default_materials_1 = require("../../render-pipeline/default-materials");
class SpriteObject extends render_object_1.RenderObject {
    constructor() {
        super();
        this.mesh = zogra_renderer_1.MeshBuilder.quad();
        this.material = default_materials_1.BuiltinMaterials.spriteDefault;
        this._sprite = null;
        this.meshes[0] = this.mesh;
        this.materials[0] = this.material;
    }
    get sprite() { return this._sprite; }
    set sprite(sprite) {
        this._sprite = sprite;
        if (sprite) {
            this.material.texture = sprite.texture;
            this.mesh.vertices[0].uv.set([sprite.uvRect.xMin, sprite.uvRect.yMin]);
            this.mesh.vertices[1].uv.set([sprite.uvRect.xMax, sprite.uvRect.yMin]);
            this.mesh.vertices[2].uv.set([sprite.uvRect.xMax, sprite.uvRect.yMax]);
            this.mesh.vertices[3].uv.set([sprite.uvRect.xMin, sprite.uvRect.yMax]);
            this.mesh.vertices[0].color.set(sprite.color);
            this.mesh.vertices[1].color.set(sprite.color);
            this.mesh.vertices[2].color.set(sprite.color);
            this.mesh.vertices[3].color.set(sprite.color);
            this.mesh.update();
        }
        else {
            this.material.texture = null;
        }
    }
}
exports.SpriteObject = SpriteObject;
//# sourceMappingURL=sprite-object.js.map