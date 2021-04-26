import { Color, Texture } from "zogra-renderer";
declare const Default2DMaterial_base: typeof import("zogra-renderer").MaterialType;
export declare class Default2DMaterial extends Default2DMaterial_base {
    texture: Texture | null;
    color: Color;
}
export {};
