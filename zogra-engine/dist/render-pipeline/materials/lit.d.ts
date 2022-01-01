import { Color, Texture } from "zogra-renderer";
declare const LitLambertian_base: new (gl?: WebGL2RenderingContext | undefined) => import("zogra-renderer").Material<import("zogra-renderer").DefaultVertexStruct>;
export declare class LitLambertian extends LitLambertian_base {
    color: Color;
    texture: Texture | null;
}
export {};
