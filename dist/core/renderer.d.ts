/// <reference types="gl-matrix" />
import { DefaultMaterialType } from "./material-type";
import { GLContext } from "./global";
import { Mesh } from "./mesh";
import { vec3 } from "../types/vec3";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { RenderTarget } from "./render-target";
import { RenderTexture, DepthTexture, Texture } from "./texture";
import { vec4 } from "../types/vec4";
import { vec2 } from "../types/vec2";
export declare class ZograRenderer {
    canvas: HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;
    ctx: GLContext;
    viewProjectionMatrix: import("gl-matrix").mat4;
    private target;
    private globalUniforms;
    private globalTextures;
    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number);
    use(): void;
    setViewProjection(mat: mat4): void;
    setRenderTarget(rt: RenderTarget): void;
    setRenderTarget(colorAttachments: RenderTexture, depthAttachment?: DepthTexture): void;
    setRenderTarget(colorAttachments: RenderTexture[], depthAttachment?: DepthTexture): void;
    clear(color?: Color, clearDepth?: boolean): void;
    drawMesh(mesh: Mesh, transform: mat4, mateiral: Material): void;
    setGlobalUniform<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void;
    unsetGlobalUniform(name: string): void;
    setGlobalTexture(name: string, texture: Texture): void;
    unsetGlobalTexture(name: string): void;
}
declare type UniformType = "int" | "float" | "vec4" | "vec3" | "vec2" | "tex2d" | "color";
declare type UniformValueType<T extends UniformType> = (T extends "int" ? number : T extends "float" ? number : T extends "vec4" ? vec4 : T extends "vec3" ? vec3 : T extends "vec2" ? vec2 : T extends "color" ? Color : Texture);
export {};
