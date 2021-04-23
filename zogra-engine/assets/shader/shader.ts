import _2dVert from "./2d-vert.glsl";
import _2dFrag from "./2d-frag.glsl";
import particleVert from "./particle-vert.glsl";
import _2dShadowVert from "./2d-shadow-vert.glsl";
import _2dShadowFrag from "./2d-shadow-frag.glsl";
import _2dLightVert from "./2d-light-vert.glsl";
import _2dLightFrag from "./2d-light-frag.glsl";

type ShaderPair = [string, string];

export const ShaderSource = {
    default2D: [_2dVert, _2dFrag] as ShaderPair,
    particle2D: [particleVert, _2dFrag] as ShaderPair,
    shadow2D: [_2dShadowVert, _2dShadowFrag] as ShaderPair,
    light2D: [_2dLightVert, _2dLightFrag] as ShaderPair,
};