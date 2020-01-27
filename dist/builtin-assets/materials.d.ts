import { Color } from "../types/color";
import { MaterialType } from "../core/material-type";
import { Texture } from "../core/texture";
import { vec2 } from "../types/vec2";
export declare function createBuiltinMaterial(gl: WebGL2RenderingContext, types: ReturnType<typeof createBuiltinMaterialTypes>): {
    default: DefaultMaterialType;
    blitCopy: BlitCopyType;
};
export declare function createBuiltinMaterialTypes(gl: WebGL2RenderingContext, defaultTex: Texture): {
    DefaultMaterial: typeof DefaultMaterialType;
    BlitCopy: typeof BlitCopyType;
};
declare class DefaultMaterialType extends MaterialType {
    color: Color;
    mainTexture: Texture;
}
declare class BlitCopyType extends MaterialType {
    flip: vec2;
}
export {};
