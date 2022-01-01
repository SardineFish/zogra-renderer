export * from "zogra-renderer";
export * from "./engine";
export * from "./render-pipeline";
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
    tilemapInstance: [string, string];
    defaultVert: string;
    litLambert: string;
};
