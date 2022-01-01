import { GLContext } from "./global";
import { Mesh } from "./mesh";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { IFrameBuffer, ColorAttachment, DepthAttachment } from "./frame-buffer";
import { RenderTexture, DepthTexture, Texture } from "./texture";
import { vec2 } from "../types/vec2";
import { BuiltinAssets } from "../builtin-assets/assets";
import { UniformType, UniformValueType } from "./types";
import { Lines } from "./lines";
import { Rect } from "../types/rect";
import { BufferStructure, GLArrayBuffer } from "./array-buffer";
import { RenderBuffer } from "./render-buffer";
import { DepthBuffer } from ".";
export declare class ZograRenderer {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    ctx: GLContext;
    assets: BuiltinAssets;
    private width;
    private height;
    viewProjectionMatrix: import("../types/mat4").Matrix4x4;
    viewMatrix: import("../types/mat4").Matrix4x4;
    projectionMatrix: import("../types/mat4").Matrix4x4;
    private target;
    private shader;
    private scissor;
    private globalUniforms;
    private globalTextures;
    private framebufferPool;
    private blitFramebuffer;
    private helperAssets;
    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number);
    use(): void;
    setSize(width: number, height: number): void;
    get canvasSize(): vec2;
    setViewProjection(view: Readonly<mat4>, projection: Readonly<mat4>): void;
    setFramebuffer(rt: IFrameBuffer): void;
    setFramebuffer(colorAttachments: ColorAttachment, depthAttachment?: DepthAttachment): void;
    setFramebuffer(colorAttachments: ColorAttachment[], depthAttachment?: DepthAttachment): void;
    private detachCurrentFramebuffer;
    private getTempFramebuffer;
    blitCopy(src: RenderBuffer | RenderTexture, dst: RenderBuffer | RenderTexture): void;
    blitCopyDepth(src: DepthBuffer | DepthTexture, dst: RenderTexture): void;
    clear(color?: Color, clearDepth?: boolean): void;
    blit(src: Texture | null, dst: IFrameBuffer | RenderTexture | RenderTexture[], material?: Material, srcRect?: Rect, dstRect?: Rect): void;
    private useShader;
    private setupTransforms;
    private setupGlobalUniforms;
    drawMeshInstance<TMesh extends BufferStructure, TInstance extends BufferStructure, KM extends keyof TMesh, KI extends keyof TInstance, TMat extends Material<Pick<TMesh & TInstance, KM | KI>>>(mesh: Mesh<TMesh>, buffer: GLArrayBuffer<TInstance>, material: TMat, count: number): void;
    drawMeshProceduralInstance<T extends BufferStructure, TMat extends Material<T>>(mesh: Mesh<T>, material: TMat, count: number): void;
    drawMesh<T extends BufferStructure, TMat extends Material<T>>(mesh: Mesh<T>, transform: Readonly<mat4>, material: TMat): void;
    drawLines(lines: Lines, transform: mat4, material: Material): void;
    setGlobalUniform<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void;
    unsetGlobalUniform(name: string): void;
    private setupScissor;
}
