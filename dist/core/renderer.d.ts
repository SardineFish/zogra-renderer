/// <reference types="gl-matrix" />
import { DefaultMaterialType } from "./material-type";
import { GLContext } from "./global";
import { Mesh } from "./mesh";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { RenderTarget } from "./render-target";
import { RenderTexture, DepthTexture } from "./texture";
export declare class ZograRenderer {
    canvas: HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;
    ctx: GLContext;
    viewProjectionMatrix: import("gl-matrix").mat4;
    private target;
    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number);
    use(): void;
    setViewProjection(mat: mat4): void;
    setRenderTarget(rt: RenderTarget): void;
    setRenderTarget(colorAttachments: RenderTexture, depthAttachment?: DepthTexture): void;
    setRenderTarget(colorAttachments: RenderTexture[], depthAttachment?: DepthTexture): void;
    clear(color?: Color, clearDepth?: boolean): void;
    drawMesh(mesh: Mesh, transform: mat4, mateiral: Material): void;
}
