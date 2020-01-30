import { Transform } from "./transform";
import { Mesh } from "../core/mesh";
import { Material } from "../core/core";
import { GlobalContext } from "../core/global";
import { Entity } from "./entity";

export class RenderObject extends Entity
{
    meshes: Mesh[] = [];
    materials: Material[] = [];
    constructor(ctx = GlobalContext())
    {
        super();
        this.materials = [ctx.assets.materials.default];
    }
}