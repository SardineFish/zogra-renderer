import _2dVert from "./2d-vert.glsl";
import _2dFrag from "./2d-frag.glsl";

export const ShaderSource: { [key: string]: [string, string] } = {
    default2D: [_2dVert, _2dFrag],

};