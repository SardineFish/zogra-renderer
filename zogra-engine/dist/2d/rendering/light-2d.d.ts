import { Color, RenderTexture, vec2 } from "zogra-renderer";
import { Entity } from "../../engine/entity";
import { RenderData } from "../../render-pipeline/render-data";
import { RenderContext } from "../../render-pipeline/render-pipeline";
export declare enum ShadowType {
    Soft = "soft",
    Hard = "hard"
}
export declare const Shadow2DVertStruct: {
    p0: "vec2";
    p1: "vec2";
    vert: "vec3";
    color: "vec4";
    normal: "vec3";
    uv: "vec2";
    uv2: "vec2";
};
export declare class Light2D extends Entity {
    shadowType: ShadowType | false;
    volumnRadius: number;
    lightRange: number;
    lightColor: Color;
    intensity: number;
    /** In range [-1..1] */
    attenuation: number;
    private shadowMesh;
    private shadowMap?;
    private shadowMat;
    constructor(shadowType?: ShadowType | false);
    getShadowMap(context: RenderContext, data: RenderData): RenderTexture;
    updateShadowMesh(context: RenderContext, data: RenderData): void;
    private __tempVectors;
    private appendLineShadow;
    private appendVerts;
    destroy(): void;
}
declare const Shadow2DMaterial_base: typeof import("zogra-renderer").MaterialType;
export declare class Shadow2DMaterial extends Shadow2DMaterial_base {
    lightPos: vec2;
    volumnSize: number;
    lightRange: number;
}
export {};
