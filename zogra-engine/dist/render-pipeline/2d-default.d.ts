import { ZograRenderPipeline, RenderContext } from "./render-pipeline";
import { Camera, Scene } from "../engine/engine";
import { RenderBuffer, TextureFormat } from "zogra-renderer";
import { Material, MSAASamples } from "zogra-renderer";
import { RenderData } from "./render-data";
import { Color } from "zogra-renderer";
import { FrameBuffer } from "zogra-renderer";
import { ConstructorType } from "../utils/util";
import { DebugLayerRenderer } from "./debug-layer";
import { Light2DCompose } from "../2d";
interface CameraRenderResources {
    outputFBO: FrameBuffer;
    outputBuffer: RenderBuffer;
    postprocessFBOs: [FrameBuffer, FrameBuffer];
}
export declare class Default2DRenderPipeline implements ZograRenderPipeline {
    msaa: MSAASamples;
    renderFormat: TextureFormat;
    debuglayer: DebugLayerRenderer;
    light2DComposeMaterial: Light2DCompose;
    ambientLightColor: Color;
    perCameraResources: Map<Camera, CameraRenderResources>;
    constructor();
    render(context: RenderContext, scene: Scene, cameras: Camera[]): void;
    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void;
    renderCamera(context: RenderContext, data: RenderData): void;
    postprocess(context: RenderContext, data: RenderData): void;
    getCameraResources(context: RenderContext, camera: Camera): CameraRenderResources;
    prepareLights(context: RenderContext, data: RenderData): void;
}
export {};
