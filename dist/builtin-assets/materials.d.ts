import { compileBuiltinShaders } from "./shaders";
import { Material } from "../core/material";
import { Color } from "../types/color";
import { MaterialType } from "../core/material-type";
import { Texture } from "../core/texture";
import { vec2 } from "../types/vec2";
export declare function createBuiltinMaterial(gl: WebGL2RenderingContext, types: ReturnType<typeof createBuiltinMaterialTypes>, shaders: ReturnType<typeof compileBuiltinShaders>): {
    default: DefaultMaterialType;
    blitCopy: BlitCopyType;
    ColoredLine: Material;
};
export declare function createBuiltinMaterialTypes(gl: WebGL2RenderingContext, defaultTex: Texture, shaders: ReturnType<typeof compileBuiltinShaders>): {
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
