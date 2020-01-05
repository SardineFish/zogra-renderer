/// <reference types="gl-matrix" />
import { DefaultMaterialType } from "./material-type";
import { Mesh } from "./mesh";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
export declare class ZograRenderer {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;
    viewProjectionMatrix: import("gl-matrix").mat4;
    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number);
    use(): void;
    setViewProjection(mat: mat4): void;
    clear(color?: Color, clearDepth?: boolean): void;
    drawMesh(mesh: Mesh, transform: mat4, mateiral: Material): void;
}
