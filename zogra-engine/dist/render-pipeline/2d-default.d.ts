import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera, Scene } from "../engine/engine";
import { RenderBuffer, TextureFormat } from "zogra-renderer";
import { Material, MSAASamples } from "zogra-renderer";
import { RenderData } from "./render-data";
import { Color } from "zogra-renderer";
import { FrameBuffer } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { DebugLayerRenderer } from "./debug-layer";
import { RenderPass } from "./render-pass";
import { Light2DPass } from "./2d-light-pass";
import { DrawScene } from "./draw-scene";
import { PostprocessPass } from "./post-process";
import { FinalBlit } from "./final-blit";
import { ClearPass } from "./clear-pass";
interface CameraRenderResources {
    outputFBO: FrameBuffer;
    outputBuffer: RenderBuffer;
    postprocessFBOs: [FrameBuffer, FrameBuffer];
    renderPass: RenderPass[];
}
export declare class Default2DRenderPipeline implements ZograRenderPipeline {
    msaa: MSAASamples;
    renderFormat: TextureFormat;
    debuglayer: DebugLayerRenderer;
    ambientLightColor: Color;
    ambientIntensity: number;
    perCameraResources: Map<Camera, CameraRenderResources>;
    constructor();
    render(context: RenderContext, scene: Scene, cameras: Camera[]): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
    renderCamera(context: RenderContext, data: RenderData): void;
    getCameraResources(context: RenderContext, camera: Camera): CameraRenderResources;
    createRenderPass(context: RenderContext, camera: Camera): (ClearPass | DrawScene | Light2DPass | PostprocessPass | FinalBlit)[];
}
export {};
