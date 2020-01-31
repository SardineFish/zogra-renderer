/// <reference types="gl-matrix" />
import { RenderTexture } from "../core/texture";
import { RenderTarget } from "../core/render-target";
import { GLContext } from "../core/global";
import { Entity } from "./entity";
import { Color } from "../types/color";
export declare enum Projection {
    Perspective = 0,
    Orthographic = 1
}
export declare class Camera extends Entity {
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
    get viewProjectionMatrix(): import("gl-matrix").mat4;
    get projectionMatrix(): import("gl-matrix").mat4;
    constructor(ctx?: GLContext);
}
