import { Color } from "../types/color";
import { Material } from "./material";
import { Texture } from "./texture";
import { BufferStructure } from "./array-buffer";
import { DefaultVertexData } from "./mesh";
export declare class SimpleTexturedMaterialClass extends Material {
    constructor(gl?: WebGL2RenderingContext);
    texture: Texture | null;
    color: Color;
}
export declare class MaterialType<VertStruct extends BufferStructure = typeof DefaultVertexData> extends Material<VertStruct> {
    constructor(gl?: WebGL2RenderingContext);
}
export declare class DefaultMaterialType extends MaterialType<DefaultMaterialType> {
    color: Color;
}
