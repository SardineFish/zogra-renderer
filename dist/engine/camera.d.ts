import { RenderTexture } from "../core/texture";
import { RenderTarget } from "../core/render-target";
import { GLContext } from "../core/global";
import { vec2 } from "../types/vec2";
import { Entity, EntityEvents } from "./entity";
import { Color } from "../types/color";
import { RenderContext } from "../render-pipeline/rp";
import { IEventSource, EventKeys } from "../core/event";
import { vec3 } from "../types/vec3";
import { ray } from "../types/ray";
export declare enum Projection {
    Perspective = 0,
    Orthographic = 1
}
interface CameraEvents extends EntityEvents {
    "prerender": (camera: Camera, context: RenderContext) => void;
    "postrender": (camera: Camera, contect: RenderContext) => void;
}
export declare class Camera extends Entity implements IEventSource<CameraEvents> {
    private ctx;
    output: RenderTexture | RenderTarget;
    FOV: number;
    near: number;
    far: number;
    viewHeight: number;
    projection: Projection;
    clearColor: Color;
    clearDepth: boolean;
    get pixelSize(): import("../types/vec2").Vector2;
    get aspectRatio(): number;
    get viewProjectionMatrix(): any;
    get projectionMatrix(): any;
    constructor(ctx?: GLContext);
    on<T extends EventKeys<CameraEvents>>(event: T, listener: CameraEvents[T]): void;
    off<T extends EventKeys<CameraEvents>>(event: T, listener: CameraEvents[T]): void;
    __preRender(context: RenderContext): void;
    __postRender(contect: RenderContext): void;
    screenToRay(pos: vec2): ray;
    screenToWorld(pos: vec2): vec3;
    screenToViewport(pos: vec2): vec2;
}
export {};
