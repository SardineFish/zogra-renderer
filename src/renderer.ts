import { Shader } from "./shader";
import { panicNull } from "./util";

export class ZograRenderer
{
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    gl: WebGL2RenderingContext;

    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number)
    {
        this.canvas = canvasElement;
        this.width = width === undefined ? canvasElement.width : width;
        this.height = height === undefined ? canvasElement.height : height;
        this.gl = panicNull(this.canvas.getContext("webgl2"), "WebGL2 is not support on current device.");
    }

    shader(vertexShader: string, fragmentShader: string)
    {
        return new Shader(this.gl, vertexShader, fragmentShader);
    }
}