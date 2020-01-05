import { DefaultMaterialType } from "./material-type";
import { Mesh } from "./mesh";
import { mat4 } from "gl-matrix";
import { Material } from "./material";
export declare class ZograRenderer {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;
    viewProjectionMatrix: mat4;
    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number);
    use(): void;
    setViewProjection(mat: mat4): void;
    drawMesh(mesh: Mesh, transform: mat4, mateiral: Material): void;
}
