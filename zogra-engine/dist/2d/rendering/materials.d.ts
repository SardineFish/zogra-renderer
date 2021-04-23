import { Color, Texture, vec2, vec4 } from "zogra-renderer";
declare const Default2DMaterial_base: typeof import("zogra-renderer").MaterialType;
export declare class Default2DMaterial extends Default2DMaterial_base {
    texture: Texture | null;
    color: Color;
}
declare const Shadow2DMaterial_base: typeof import("zogra-renderer").MaterialType;
export declare class Shadow2DMaterial extends Shadow2DMaterial_base {
    lightPos: vec2;
    volumnSize: number;
    lightRange: number;
}
declare const Light2DCompose_base: typeof import("zogra-renderer").MaterialType;
export declare class Light2DCompose extends Light2DCompose_base {
    lightPosList: vec4[];
    lightColorList: Color[];
    lightParamsList: vec4[];
    shadowMapList: Array<Texture | null>;
    lightCount: number;
    cameraParams: vec4;
}
export {};
