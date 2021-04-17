import _2dVert from "./2d-vert.glsl";
import _2dFrag from "./2d-frag.glsl";
import particleVert from "./particle-vert.glsl";

type ShaderPair = [string, string];

export const ShaderSource = {
    default2D: [_2dVert, _2dFrag] as ShaderPair,
    particle2D: [particleVert, _2dFrag] as ShaderPair,
};