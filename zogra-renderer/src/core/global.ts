import { BuiltinAssets } from "../builtin-assets/assets";
import { ZograRenderer } from "./renderer";


export interface GLContext
{
    gl: WebGL2RenderingContext;
    width: number;
    height: number;
    assets: BuiltinAssets;
    renderer: ZograRenderer;
}

let ctx: GLContext;

export const setGlobalContext = (_ctx: GLContext) => ctx = _ctx;
export const GlobalContext = () => ctx;
export const GL = () => GlobalContext()?.gl;