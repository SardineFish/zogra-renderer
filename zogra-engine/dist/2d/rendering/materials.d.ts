import { Color, Texture } from "zogra-renderer";
declare const Default2DMaterial_base: new (gl?: WebGL2RenderingContext | undefined) => import("zogra-renderer").Material<import("zogra-renderer").DefaultVertexStruct>;
export declare class Default2DMaterial extends Default2DMaterial_base {
    texture: Texture | null;
    color: Color;
}
export {};
