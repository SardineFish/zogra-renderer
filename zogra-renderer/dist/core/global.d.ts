import { BuiltinAssets } from "../builtin-assets/assets";
import { DebugProvider } from "./debug";
import { ZograRenderer } from "./renderer";
export declare class GLContext {
    gl: WebGL2RenderingContext;
    width: number;
    height: number;
    assets: BuiltinAssets;
    renderer: ZograRenderer;
}
export declare const setGlobalContext: (_ctx: GLContext) => GLContext;
export declare const GlobalContext: () => GLContext;
export declare const GL: () => WebGL2RenderingContext;
export declare const Debug: (provider?: DebugProvider | undefined) => DebugProvider;
