import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera, Scene } from "../engine";
import { mat4, MSAASamples } from "zogra-renderer";
import { ZograRenderer, Material, Mesh } from "zogra-renderer";
import { RenderData } from "./render-data";
import { FrameBuffer } from "zogra-renderer";
import { RenderTexture } from "zogra-renderer";
import { Lines } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { DebugLayerRenderer } from "./render-pass/debug-layer";
export declare class PreviewRenderer implements ZograRenderPipeline {
    msaa: MSAASamples;
    renderer: ZograRenderer;
    grid: Lines;
    materialReplaceMap: Map<Function, Material<import("zogra-renderer").DefaultVertexStruct>>;
    debugLayer: DebugLayerRenderer;
    cameraOutputFBOs: Map<Camera, FrameBuffer>;
    cameraOutputTextures: Map<Camera, RenderTexture>;
    constructor(renderer: ZograRenderer);
    render(context: RenderContext, scene: Scene, cameras: Camera[]): void;
    setupLight(context: RenderContext, data: RenderData): void;
    renderCamera(context: RenderContext, data: RenderData): void;
    finalBlit(context: RenderContext, data: RenderData): void;
    renderGrid(context: RenderContext, data: RenderData): void;
    drawWithMaterial(mesh: Mesh, transform: Readonly<mat4>, material: Material): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
    getFramebuffer(context: RenderContext, camera: Camera): FrameBuffer;
}
