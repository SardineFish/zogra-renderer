import { BuiltinAssets } from "../builtin-assets/assets";


export interface GLContext
{
    gl: WebGL2RenderingContext;
    width: number;
    height: number;
    assets: BuiltinAssets;
}

let ctx: GLContext;

export const setGlobalContext = (_ctx: GLContext) => ctx = _ctx;
export const GlobalContext = () => ctx;
export const GL = () => GlobalContext().gl;