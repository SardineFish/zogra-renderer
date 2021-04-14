import { Transform } from "./transform";
import { IRenderTarget, RenderTexture } from "zogra-renderer";
import { RenderTarget } from "zogra-renderer";
import { GLContext, GlobalContext } from "zogra-renderer";
import { vec2 } from "zogra-renderer";
import { Entity, EntityEvents } from "./entity";
import { mat4 } from "zogra-renderer";
import { Deg2Rad, div, mul, minus } from "zogra-renderer";
import { Color } from "zogra-renderer";
import { RenderContext } from "../render-pipeline/rp";
import { EventEmitter, IEventSource, EventKeys } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { ray } from "zogra-renderer";
import { vec4 } from "zogra-renderer";


export enum Projection
{
    Perspective,
    Orthographic,
}

interface CameraEvents extends EntityEvents
{
    "prerender": (camera: Camera, context: RenderContext) => void;
    "postrender": (camera: Camera, contect: RenderContext) => void;
}

export class Camera extends Entity implements IEventSource<CameraEvents>
{
    private ctx: GLContext;
    output: RenderTexture | IRenderTarget = RenderTarget.CanvasTarget;
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

    on<T extends EventKeys<CameraEvents>>(event: T, listener: CameraEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<CameraEvents>>(event: T, listener: CameraEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    __preRender(context: RenderContext)
    {
        this.eventEmitter.emit("prerender", this, context);
    }
    __postRender(contect: RenderContext)
    {
        this.eventEmitter.emit("postrender", this, contect);
    }
    screenToRay(pos: vec2): ray
    {
        const p = this.screenToWorld(pos);
        return ray(this.position.clone(), minus(vec3(p.x, p.y, p.z), this.position));
    }
    screenToWorld(pos: vec2): vec3
    {
        const w = this.projection == Projection.Perspective
            ? this.near
            : 1;
        const ndcXY = this.screenToViewport(pos).mul(vec2(2, -2)).minus(vec2(1, -1));
        const clip = mul(vec4(ndcXY.x, ndcXY.y, -1, 1), w);
        const matVPInv = mat4.invert(this.viewProjectionMatrix);
        const p = mat4.mulVec4(matVPInv, clip);
        return vec3(p[0], p[1], p[2]);
    }
    screenToViewport(pos: vec2): vec2
    {
        if (this.output === RenderTarget.CanvasTarget)
            return div(pos, vec2(this.ctx.width, this.ctx.height));
        else if (this.output instanceof RenderTexture)
        {
            return div(pos, vec2(this.output.width, this.output.height));
        }
        else
            return vec2.zero();
    }
}