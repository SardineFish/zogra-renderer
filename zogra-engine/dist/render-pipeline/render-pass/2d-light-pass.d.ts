import { Color, GLArrayBuffer, Mesh, RenderTexture, Texture, vec4 } from "zogra-renderer";
import { Default2DRenderPipeline } from "../2d-default";
import { RenderData } from "../render-data";
import { RenderPass } from "./render-pass";
import { RenderContext } from "../render-pipeline";
export declare class Light2DPass extends RenderPass {
    lightmap: RenderTexture;
    light2DShadowMaterial: Light2DWithShadow;
    lightComposeMaterial: Light2DCompose;
    lightInstancingMaterial: Light2DSimpleInstancing;
    settings: Default2DRenderPipeline;
    lightInstancingBuffer: GLArrayBuffer<{
        lightPos: "vec3";
        lightParams: "vec4";
        lightColor: "vec4";
    }>;
    simpleLightMesh: Mesh;
    constructor(context: RenderContext, pipelineSettings: Default2DRenderPipeline);
    render(context: RenderContext, data: RenderData): void;
    private drawSimpleLights;
    private drawShadowLights;
}
declare const Light2DWithShadow_base: new (gl?: WebGL2RenderingContext | undefined) => import("zogra-renderer").Material<import("zogra-renderer").DefaultVertexStruct>;
declare class Light2DWithShadow extends Light2DWithShadow_base {
    lightPosList: vec4[];
    lightColorList: Color[];
    lightParamsList: vec4[];
    shadowMapList: Array<Texture | null>;
    lightCount: number;
    cameraParams: vec4;
    ambientLightColor: Color;
}
declare const Light2DCompose_base: new (gl?: WebGL2RenderingContext | undefined) => import("zogra-renderer").Material<import("zogra-renderer").DefaultVertexStruct>;
declare class Light2DCompose extends Light2DCompose_base {
}
declare const Light2DSimpleInstancing_base: new (gl?: WebGL2RenderingContext | undefined) => import("zogra-renderer").Material<{
    lightPos: "vec3";
    lightParams: "vec4";
    lightColor: "vec4";
    vert: "vec3";
    color: "vec4";
    normal: "vec3";
    uv: "vec2";
    uv2: "vec2";
}>;
declare class Light2DSimpleInstancing extends Light2DSimpleInstancing_base {
}
export {};
