import { Shader } from "./shader";
import { Color } from "../types/color";
import { Material } from "./material";


export declare class MaterialType extends Material
{
    constructor(gl?:WebGL2RenderingContext)
}

export declare class DefaultMaterialType extends MaterialType
{
    color: Color;
}