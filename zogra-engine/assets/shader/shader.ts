import _2dVert from "./2d-vert.glsl";
import _2dFrag from "./2d-frag.glsl";
import particleVert from "./particle-vert.glsl";
import _2dShadowVert from "./2d-shadow-vert.glsl";
import _2dShadowFrag from "./2d-shadow-frag.glsl";
import _2dLightVert from "./2d-light-vert.glsl";
import _2dLightFrag from "./2d-light-frag.glsl";
import boxBlur from "./box-blur.glsl";
import bloomFilter from "./bloom-filter.glsl";
import blitCopy from "./blit-copy.glsl";
import bloomCompose from "./bloom-compose.glsl";
import _2dLightSimpleVert from "./2d-light-simple-vert.glsl";
import _2dLightSimpleFrag from "./2d-light-simple-frag.glsl";
import tilemapVert from "./2d-tilemap-vert.glsl";
import defaultVert from "./default-vert.glsl";
import litLambert from "./lit-lambert.glsl";

type ShaderPair = [string, string];

export const ShaderSource = {
    default2D: [_2dVert, _2dFrag] as ShaderPair,
    particle2D: [particleVert, _2dFrag] as ShaderPair,
    shadow2D: [_2dShadowVert, _2dShadowFrag] as ShaderPair,
    light2D: [_2dLightVert, _2dLightFrag] as ShaderPair,
    light2DSimple: [_2dLightSimpleVert, _2dLightSimpleFrag] as ShaderPair,
    boxBlur: [_2dVert, boxBlur] as ShaderPair,
    bloomFilter: [_2dVert, bloomFilter] as ShaderPair,
    bloomCompose: [_2dVert, bloomCompose] as ShaderPair,
    blitCopy: [_2dVert, blitCopy] as ShaderPair,
    tilemapInstance: [tilemapVert, _2dFrag] as ShaderPair,
    defaultVert: defaultVert,
    litLambert: litLambert,
};