"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteObject = void 0;
const zogra_renderer_1 = require("zogra-renderer");
const render_object_1 = require("../../engine/render-object");
const default_materials_1 = require("../../render-pipeline/default-materials");
const spriteVerts = [
    zogra_renderer_1.vec2(-0.5, -0.5),
    zogra_renderer_1.vec2(0.5, -0.5),
    zogra_renderer_1.vec2(0.5, 0.5),
    zogra_renderer_1.vec2(-0.5, 0.5)
];
class SpriteObject extends render_object_1.RenderObject {
    constructor() {
        super();
        this.mesh = zogra_renderer_1.MeshBuilder.quad();
        this.material = default_materials_1.BuiltinMaterials.spriteDefault;
        this._sprite = null;
        this._size = zogra_renderer_1.vec2.one();
        this._color = zogra_renderer_1.Color.white;
        this.meshes[0] = this.mesh;
        this.materials[0] = this.material;
    }
    get size() { return this._size; }
    set size(value) {
        this._size.set(value);
        zogra_renderer_1.vec2.mul(this.mesh.vertices[0].vert, spriteVerts[0], this._size);
        zogra_renderer_1.vec2.mul(this.mesh.vertices[1].vert, spriteVerts[1], this._size);
        zogra_renderer_1.vec2.mul(this.mesh.vertices[2].vert, spriteVerts[2], this._size);
        zogra_renderer_1.vec2.mul(this.mesh.vertices[3].vert, spriteVerts[3], this._size);
        this.mesh.update();
    }
    get color() { return this._color; }
    set color(value) {
        this._color.set(value);
        if (this.sprite) {
            zogra_renderer_1.vec4.mul(this.mesh.vertices[0].color, this.sprite.color, value);
            zogra_renderer_1.vec4.mul(this.mesh.vertices[1].color, this.sprite.color, value);
            zogra_renderer_1.vec4.mul(this.mesh.vertices[2].color, this.sprite.color, value);
            zogra_renderer_1.vec4.mul(this.mesh.vertices[3].color, this.sprite.color, value);
        }
        else {
            zogra_renderer_1.vec4.set(this.mesh.vertices[0].color, value);
            zogra_renderer_1.vec4.set(this.mesh.vertices[1].color, value);
            zogra_renderer_1.vec4.set(this.mesh.vertices[2].color, value);
            zogra_renderer_1.vec4.set(this.mesh.vertices[3].color, value);
        }
        this.mesh.update();
    }
    get sprite() { return this._sprite; }
    set sprite(sprite) {
        this._sprite = sprite;
        if (sprite) {
            // this.material.texture = sprite.texture;
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
    render(context, data) {
        var _a;
        this.material.setProp("uMainTex", "tex2d", ((_a = this.sprite) === null || _a === void 0 ? void 0 : _a.texture) || null);
        context.renderer.drawMesh(this.mesh, this.localToWorldMatrix, this.material);
    }
}
exports.SpriteObject = SpriteObject;
//# sourceMappingURL=sprite-object.js.map