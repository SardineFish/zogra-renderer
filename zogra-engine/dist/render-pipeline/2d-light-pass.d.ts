import { Color, RenderTexture, Texture, vec4 } from "zogra-renderer";
import { Default2DRenderPipeline } from "./2d-default";
import { RenderData } from "./render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "./render-pipeline";
export declare class Light2DPass extends RenderPass {
    lightmap: RenderTexture;
    light2DShadowMaterial: Light2DWithShadow;
    lightComposeMaterial: Light2DCompose;
    settings: Default2DRenderPipeline;
    constructor(context: RenderContext, pipelineSettings: Default2DRenderPipeline);
    render(context: RenderContext, data: RenderData): void;
    private drawSimpleLights;
    private drawShadowLights;
}
declare const Light2DWithShadow_base: typeof import("zogra-renderer").MaterialType;
declare class Light2DWithShadow extends Light2DWithShadow_base {
    lightPosList: vec4[];
    lightColorList: Color[];
    lightParamsList: vec4[];
    shadowMapList: Array<Texture | null>;
    lightCount: number;
    cameraParams: vec4;
    ambientLightColor: Color;
}
declare const Light2DCompose_base: typeof import("zogra-renderer").MaterialType;
declare class Light2DCompose extends Light2DCompose_base {
}
export {};
