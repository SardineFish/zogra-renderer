import { Material, Mesh, MeshBuilder, vec2 } from "zogra-renderer";
import { RenderObject } from "../../engine/render-object";
import { Default2DMaterial } from "./materials";
import { Sprite } from "./sprite";

export class SpriteObject extends RenderObject
{
    private mesh: Mesh = MeshBuilder.quad();
    private material: Material = new Default2DMaterial();
    private _sprite: Sprite | null = null;

    constructor()
    {
        super();
        this.meshes[0] = this.mesh;
        this.materials[0] = this.material;
    }

    get sprite() { return this._sprite }
    set sprite(sprite: Sprite | null)
    {
        this._sprite = sprite;

        if (sprite)
        {
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
        else
        {
            this.material.texture = null;
        }
    }

}