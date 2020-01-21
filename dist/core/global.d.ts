import { BuiltinAssets } from "../builtin-assets/assets";
export interface GLContext {
    gl: WebGL2RenderingContext;
    width: number;
    height: number;
    assets: BuiltinAssets;
}
export declare const setGlobalContext: (_ctx: GLContext) => GLContext;
export declare const GlobalContext: () => GLContext;
export declare const GL: () => WebGL2RenderingContext;
