import { BuiltinAssets } from "../builtin-assets/assets";
import { Color } from "../types/color";
import { Vector3 } from "../types/vec3";
import { DebugProvider } from "./debug";
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
let debugProvider: DebugProvider = new class EmptyDebugProvider extends DebugProvider
{
    drawLine(start: Vector3, end: Vector3, color?: Color): void
    {
        console.warn("No debug provider.");
    }
}

export const setGlobalContext = (_ctx: GLContext) => ctx = _ctx;
export const GlobalContext = () => ctx;
export const GL = () => GlobalContext()?.gl;
export const Debug = (provider?: DebugProvider) =>
{
    if (provider)
        debugProvider = provider;
    return debugProvider;
}