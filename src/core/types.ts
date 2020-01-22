import { vec2 } from "../types/vec2";
import { BuiltinAssets } from "../builtin-assets/assets";
import { vec4 } from "../types/vec4";
import { vec3 } from "../types/vec3";
import { Color } from "../types/color";
import { Texture } from "./texture";
import { mat4 } from "../types/mat4";

export interface RenderData
{
    assets: BuiltinAssets;
    gl: WebGL2RenderingContext;
    nextTextureUnit: number;
    size: vec2;
}

export type UniformType = "int" | "float" | "vec4" | "vec3" | "vec2" | "tex2d" | "color" | "mat4";
export type UniformValueType<T extends UniformType> = (
    T extends "int" ? number
    : T extends "float" ? number
    : T extends "vec4" ? vec4
    : T extends "vec3" ? vec3
    : T extends "vec2" ? vec2
    : T extends "color" ? Color
    : T extends "mat4" ? mat4
    : Texture);