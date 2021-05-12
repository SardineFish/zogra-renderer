import { RenderTexture } from "zogra-renderer";
import { GLContext } from "zogra-renderer";
import { vec2 } from "zogra-renderer";
import { Entity, EntityEvents } from "./entity";
import { Color } from "zogra-renderer";
import { PostProcess, RenderContext } from "../render-pipeline";
import { IEventSource, EventKeys } from "zogra-renderer";
import { vec3 } from "zogra-renderer";
import { ray } from "zogra-renderer";
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
    output: RenderTexture | null;
    FOV: number;
    near: number;
    far: number;
    viewHeight: number;
    projection: Projection;
    clearColor: Color;
    clearDepth: boolean;
    postprocess: PostProcess[];
    get pixelSize(): import("zogra-renderer").Vector2;
    get aspectRatio(): number;
    get viewProjectionMatrix(): import("zogra-renderer").Matrix4x4;
    get projectionMatrix(): import("zogra-renderer").Matrix4x4;
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
