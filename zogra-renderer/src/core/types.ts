import { vec2 } from "../types/vec2";
import { BuiltinAssets } from "../builtin-assets/assets";
import { vec4 } from "../types/vec4";
import { vec3 } from "../types/vec3";
import { Color } from "../types/color";
import { Texture } from "./texture";
import { mat4 } from "../types/mat4";

export interface BindingData
{
    assets: BuiltinAssets;
    gl: WebGL2RenderingContext;
    nextTextureUnit: number;
    size: vec2;
}

export type NumericUnifromTypes = "int" | "float" | "vec4" | "vec3" | "vec2" | "color" | "mat4";
export type NumericUniformArrayTypes = `${NumericUnifromTypes}[]`;
export type TextureUniformTypes = "tex2d";
export type TextureArrayUniformTypes = `${TextureUniformTypes}[]`;

export type UniformType = NumericUnifromTypes | TextureUniformTypes | NumericUniformArrayTypes | TextureArrayUniformTypes;
export type UniformValueType<T extends UniformType> =
    T extends NumericUnifromTypes ? VectorValueType<T>
    : T extends NumericUniformArrayTypes ? UniformArrayType<T>
    : T extends TextureUniformTypes ? TextureValueType<T>
    : T extends TextureArrayUniformTypes ? TextureArrayValueType<T>
    : never;


export type VectorValueType<T extends NumericUnifromTypes> =
    T extends "int" ? number
    : T extends "float" ? number
    : T extends "vec4" ? vec4
    : T extends "vec3" ? vec3
    : T extends "vec2" ? vec2
    : T extends "color" ? Color
    : T extends "mat4" ? mat4
    : never;

export type UniformArrayType<T extends NumericUniformArrayTypes> =
    T extends "int[]" ? number[]
    : T extends "float[]" ? number[]
    : T extends "vec4[]" ? vec4[]
    : T extends "vec3[]" ? vec3[]
    : T extends "vec2[]" ? vec2[]
    : T extends "color[]" ? Color[]
    : T extends "mat4[]" ? mat4[]
    : never;

export type TextureValueType<T extends TextureUniformTypes> =
    T extends "tex2d" ? Texture | null
    : never;
export type TextureArrayValueType<T extends TextureArrayUniformTypes> =
    T extends "tex2d[]" ? Array<Texture | null>
    : never;