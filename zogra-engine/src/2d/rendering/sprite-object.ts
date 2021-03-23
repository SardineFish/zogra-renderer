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
            this.mesh.uvs = [
                vec2(sprite.uvRect.xMin, sprite.uvRect.yMin),
                vec2(sprite.uvRect.xMax, sprite.uvRect.yMin),
                vec2(sprite.uvRect.xMax, sprite.uvRect.yMax),
                vec2(sprite.uvRect.xMin, sprite.uvRect.yMax),
            ];
            this.mesh.update();
        }
        else
        {
            this.material.texture = null;
        }
    }

}