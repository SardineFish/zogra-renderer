export * from "zogra-renderer";
export * from "./engine/engine";
export * from "./render-pipeline/rp";
export * from "./2d";
export * from "./utils";
export declare const BuiltinShaders: {
    default2D: [string, string];
    particle2D: [string, string];
    shadow2D: [string, string];
    light2D: [string, string];
    light2DSimple: [string, string];
    boxBlur: [string, string];
    bloomFilter: [string, string];
    bloomCompose: [string, string];
    blitCopy: [string, string];
};
