import { Transform } from "./transform";
import { RenderTexture } from "../core/texture";
import { RenderTarget } from "../core/render-target";
import { GLContext, GlobalContext } from "../core/global";
import { vec2 } from "../types/vec2";
import { Entity } from "./entity";
import { mat4 } from "../types/mat4";
import { Deg2Rad } from "../types/math";
import { Color } from "../types/color";


export enum Projection
{
    Perspective,
    Orthographic,
}

export class Camera extends Entity
{
    private ctx: GLContext;
    output: RenderTexture | RenderTarget = RenderTarget.CanvasTarget;
    FOV: number = 30;
    near: number = 0.3;
    far: number = 1000;
    viewHeight = 1;
    projection = Projection.Perspective;
    clearColor: Color = Color.black;
    clearDepth = true;

    get pixelSize()
    {
        if (this.output instanceof RenderTexture)
            return vec2(this.output.width, this.output.height);
        else
            return vec2(this.ctx.width, this.ctx.height);
    }
    get aspectRatio() { return this.pixelSize.x / this.pixelSize.y; }
    get viewProjectionMatrix()
    {
        const matView = this.worldToLocalMatrix;
        const matProjection = this.projectionMatrix
        return mat4.mul(matProjection, matView);
    }
    get projectionMatrix()
    {
        return this.projection === Projection.Perspective
            ? mat4.perspective(this.FOV * Deg2Rad, this.aspectRatio, this.near, this.far)
            : mat4.ortho(this.viewHeight, this.aspectRatio, this.near, this.far);
    }
    constructor(ctx = GlobalContext())
    {
        super();
        this.ctx = ctx;
    }
}