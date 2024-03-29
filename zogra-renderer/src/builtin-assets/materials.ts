import { Shader } from "../core/shader";
import { compileBuiltinShaders } from "./shaders";
import { MaterialFromShader, materialDefine, shaderProp, Material } from "../core/material";
import { Color } from "../types/color";
import { Texture } from "../core/texture";
import { vec2 } from "../types/vec2";
import { BuiltinTextures } from "./textures";
import { BufferStructure } from "../core/array-buffer";
import { DefaultVertexData } from "../core";

export function createBuiltinMaterial(gl: WebGL2RenderingContext, types: ReturnType<typeof createBuiltinMaterialTypes>, shaders: ReturnType<typeof compileBuiltinShaders>, textures: BuiltinTextures)
{
    const errorMat = new Material(shaders.ErrorShader, gl);
    errorMat.setProp("uMainTex", "tex2d", textures.error);
    return {
        error: errorMat,
        default: new types.DefaultMaterial(gl),
        blitCopy: new types.BlitCopy(gl),
        ColoredLine: new Material(shaders.ColoredLine, gl),
    };
}

export function createBuiltinMaterialTypes(gl: WebGL2RenderingContext, builtinTexs: BuiltinTextures, shaders: ReturnType<typeof compileBuiltinShaders>)
{
    @materialDefine
    class DefaultMaterial extends MaterialFromShader(shaders.DefaultShader)
    {
        @shaderProp("uColor", "color")
        color: Color = Color.white;
        @shaderProp("uMainTex", "tex2d")
        mainTexture: Texture = builtinTexs.default;
    }

    @materialDefine
    class BlitCopy extends MaterialFromShader(shaders.BlitCopy)
    {
        @shaderProp("uMainTex", "tex2d")
        source: Texture | null = null;
        @shaderProp("uFlip", "vec2")
        flip: vec2 = vec2(0, 0);
    }

    @materialDefine
    class DefaultLit extends MaterialFromShader(shaders.DefaultShader)
    {
        @shaderProp("uColor", "color")
        color: Color = Color.white;
        @shaderProp("uMainTex", "tex2d")
        mainTexture: Texture = builtinTexs.default;
        @shaderProp("uNormalTex", "tex2d")
        normalTexture: Texture = builtinTexs.defaultNormal;
        @shaderProp("uEmission", "color")
        emission: Color = Color.black;
        @shaderProp("uSpecular", "color")
        specular: Color = Color.white;
        @shaderProp("uMetallic", "float")
        metiallic: number = 0.023;
        @shaderProp("uSmoothness", "float")
        smoothness: number = 0.5;
        @shaderProp("uFresnel", "float")
        fresnel: number = 5;
    }

    return {
        DefaultMaterial: DefaultMaterial as typeof DefaultMaterialType,
        BlitCopy: BlitCopy as typeof BlitCopyType,
        DefaultLit: DefaultLit as typeof DefaultLitType,
    };
}

declare class MaterialType<VertStruct extends BufferStructure = typeof DefaultVertexData> extends Material<VertStruct>
{
    constructor(gl?: WebGL2RenderingContext)
}

declare class DefaultMaterialType extends MaterialType
{
    color: Color;
    mainTexture: Texture;
}

declare class BlitCopyType extends MaterialType
{
    flip: vec2;
}

declare class DefaultLitType extends MaterialType
{
    color: Color;
    mainTexture: Texture;
    normalTexture: Texture;
    emission: Color;
    specular: Color;
    metiallic: number;
    smoothness: number;
    fresnel: number;
}