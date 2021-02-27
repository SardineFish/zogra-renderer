import { Color } from "../types/color";
import { Material } from "./material";
import { Texture } from "./texture";
export declare class SimpleTexturedMaterialClass extends Material {
    constructor(gl?: WebGL2RenderingContext);
    texture: Texture | null;
    color: Color;
}
export declare class MaterialType extends Material {
    constructor(gl?: WebGL2RenderingContext);
}
export declare class DefaultMaterialType extends MaterialType {
    color: Color;
}
