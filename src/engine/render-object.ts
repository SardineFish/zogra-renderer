import { Transform } from "./transform";
import { Mesh } from "../core/mesh";
import { Material } from "../core/core";
import { GlobalContext } from "../core/global";
import { Entity } from "./entity";

export class RenderObject extends Entity
{
    meshes: Mesh[] = [];
    material: Material;
    constructor(ctx = GlobalContext())
    {
        super();
        this.material = ctx.assets.materials.default;
    }
}