import { vec2 } from "../types/vec2";
import { BuiltinAssets } from "../builtin-assets/assets";

export interface RenderData
{
    assets: BuiltinAssets;
    gl: WebGL2RenderingContext;
    nextTextureUnit: number;
    size: vec2;
}
