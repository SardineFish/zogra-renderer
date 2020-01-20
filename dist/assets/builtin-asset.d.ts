import { GLContext } from "../core/global";
import { DefaultMaterialType } from "../core/material-type";
import { Texture2D } from "../core/texture";
export declare function makeDefaultMateiral(gl: WebGL2RenderingContext): typeof DefaultMaterialType;
export declare function GlobalAssets(ctx?: GLContext): BuiltinAssets | undefined;
export declare function initGlobalAssets(ctx: GLContext): void;
declare class BuiltinAssets {
    gl: WebGL2RenderingContext;
    DefaultMaterial: typeof DefaultMaterialType;
    defaultTexture: Texture2D;
    constructor(gl: WebGL2RenderingContext);
}
export {};
