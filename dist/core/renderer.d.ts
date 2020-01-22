/// <reference types="gl-matrix" />
import { GLContext } from "./global";
import { Mesh } from "./mesh";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { RenderTarget } from "./render-target";
import { RenderTexture, DepthTexture, Texture } from "./texture";
import { BuiltinAssets } from "../builtin-assets/assets";
import { UniformType, UniformValueType } from "./types";
export declare class ZograRenderer {
    canvas: HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    gl: WebGL2RenderingContext;
    ctx: GLContext;
    assets: BuiltinAssets;
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
    blit(src: Texture, dst: RenderTarget | RenderTexture | RenderTexture[], material?: Material): void;
    drawMesh(mesh: Mesh, transform: mat4, mateiral: Material): void;
    setGlobalUniform<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void;
    unsetGlobalUniform(name: string): void;
    setGlobalTexture(name: string, texture: Texture): void;
    unsetGlobalTexture(name: string): void;
}
