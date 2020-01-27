import { Mesh } from "../core/mesh";
import { Material } from "../core/core";
import { Entity } from "./entity";
export declare class RenderObject extends Entity {
    meshes: Mesh[];
    material: Material;
    constructor(ctx?: import("../core/global").GLContext);
}
