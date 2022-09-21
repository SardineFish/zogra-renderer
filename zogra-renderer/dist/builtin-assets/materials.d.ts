import { compileBuiltinShaders } from "./shaders";
import { Material } from "../core/material";
import { Color } from "../types/color";
import { Texture } from "../core/texture";
import { vec2 } from "../types/vec2";
import { BuiltinTextures } from "./textures";
import { BufferStructure } from "../core/array-buffer";
import { DefaultVertexData } from "../core";
export declare function createBuiltinMaterial(gl: WebGL2RenderingContext, types: ReturnType<typeof createBuiltinMaterialTypes>, shaders: ReturnType<typeof compileBuiltinShaders>, textures: BuiltinTextures): {
    error: Material<import("../core").DefaultVertexStruct>;
    default: DefaultMaterialType;
    blitCopy: BlitCopyType;
    ColoredLine: Material<import("../core").DefaultVertexStruct>;
};
export declare function createBuiltinMaterialTypes(gl: WebGL2RenderingContext, builtinTexs: BuiltinTextures, shaders: ReturnType<typeof compileBuiltinShaders>): {
    DefaultMaterial: typeof DefaultMaterialType;
    BlitCopy: typeof BlitCopyType;
    DefaultLit: typeof DefaultLitType;
};
declare class MaterialType<VertStruct extends BufferStructure = typeof DefaultVertexData> extends Material<VertStruct> {
    constructor(gl?: WebGL2RenderingContext);
}
declare class DefaultMaterialType extends MaterialType {
    color: Color;
    mainTexture: Texture;
}
declare class BlitCopyType extends MaterialType {
    flip: vec2;
}
declare class DefaultLitType extends MaterialType {
    color: Color;
    mainTexture: Texture;
    normalTexture: Texture;
    emission: Color;
    specular: Color;
    metiallic: number;
    smoothness: number;
    fresnel: number;
}
export {};
