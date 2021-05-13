import { Color, Material, Mesh, MeshBuilder, vec2, vec4 } from "zogra-renderer";
import { RenderObject } from "../../engine/render-object";
import { BuiltinMaterials } from "../../render-pipeline/default-materials";
import { RenderData } from "../../render-pipeline/render-data";
import { RenderContext } from "../../render-pipeline/render-pipeline";
import { Sprite } from "./sprite";

const spriteVerts = [
    vec2(-0.5, -0.5),
    vec2(0.5, -0.5),
    vec2(0.5, 0.5),
    vec2(-0.5, 0.5)
];

export class SpriteObject extends RenderObject
{
    private mesh: Mesh = MeshBuilder.quad();
    private material: Material = BuiltinMaterials.spriteDefault;
    private _sprite: Sprite | null = null;
    private _size: vec2 = vec2.one();
    private _color: Color = Color.white;


    constructor()
    {
        super();
        this.meshes[0] = this.mesh;
        this.materials[0] = this.material;
    }

    get size() { return this._size as Readonly<vec2> }
    set size(value)
    {
        this._size.set(value);
        vec2.mul(this.mesh.vertices[0].vert, spriteVerts[0], this._size);
        vec2.mul(this.mesh.vertices[1].vert, spriteVerts[1], this._size);
        vec2.mul(this.mesh.vertices[2].vert, spriteVerts[2], this._size);
        vec2.mul(this.mesh.vertices[3].vert, spriteVerts[3], this._size);
        this.mesh.update();
    }

    get color() { return this._color as Readonly<Color> }
    set color(value)
    {
        this._color.set(value);
        if (this.sprite)
        {
            vec4.mul(this.mesh.vertices[0].color, this.sprite.color, value);
            vec4.mul(this.mesh.vertices[1].color, this.sprite.color, value);
            vec4.mul(this.mesh.vertices[2].color, this.sprite.color, value);
            vec4.mul(this.mesh.vertices[3].color, this.sprite.color, value);
        }
        else
        {
            vec4.set(this.mesh.vertices[0].color, value);
            vec4.set(this.mesh.vertices[1].color, value);
            vec4.set(this.mesh.vertices[2].color, value);
            vec4.set(this.mesh.vertices[3].color, value);
        }
        this.mesh.update();
    }

    get sprite() { return this._sprite }
    set sprite(sprite: Sprite | null)
    {
        this._sprite = sprite;

        if (sprite)
        {
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
        else
        {
            this.material.texture = null;
        }
    }

    render(context: RenderContext, data: RenderData)
    {
        this.material.setProp("uMainTex", "tex2d", this.sprite?.texture || null);
        context.renderer.drawMesh(this.mesh, this.localToWorldMatrix, this.material);
    }

    destroy()
    {
        if (this.destroyed)
            return;
        super.destroy();
        this.mesh.destroy();
    }
}