import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera, Scene } from "../engine";
import { RenderBuffer, TextureFormat } from "zogra-renderer";
import { Material, MSAASamples } from "zogra-renderer";
import { RenderData } from "./render-data";
import { Color } from "zogra-renderer";
import { FrameBuffer } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { DebugLayerRenderer } from "./render-pass/debug-layer";
import { RenderPass } from "./render-pass/render-pass";
import { Light2DPass } from "./render-pass/2d-light-pass";
import { DrawScene } from "./render-pass/draw-scene";
import { PostprocessPass } from "./post-process";
import { FinalBlit } from "./render-pass/final-blit";
import { ClearPass } from "./render-pass/clear-pass";
interface CameraRenderResources {
    outputFBO: FrameBuffer;
    outputBuffer: RenderBuffer;
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
    createRenderPass(context: RenderContext, camera: Camera): (DrawScene | ClearPass | Light2DPass | PostprocessPass | FinalBlit)[];
}
export {};
