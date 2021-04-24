import { Blending, Color, Culling, DepthTest, MaterialFromShader, Shader, shaderProp, Texture, vec2, vec4 } from "zogra-renderer"
import { ShaderSource } from "../../assets";
import { Shadow2DVertStruct } from "./light-2d";

export class Default2DMaterial extends MaterialFromShader(new Shader(...ShaderSource.default2D, {
    cull: Culling.Disable,
    depth: DepthTest.Disable,
    zWrite: false,
    blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha],
}))
{
    @shaderProp("uMainTex", "tex2d")
    texture: Texture | null = null;

    @shaderProp("uColor", "color")
    color: Color = Color.white;
}



export class Shadow2DMaterial extends MaterialFromShader(new Shader(...ShaderSource.shadow2D, {
    vertexStructure: Shadow2DVertStruct,
    attributes: {
        p0: "aP0",
        p1: "aP1",
    },
    cull: Culling.Back,
    blend: [Blending.One, Blending.One]
}))
{
    @shaderProp("uLightPos", "vec2")
    lightPos: vec2 = vec2.zero();

    @shaderProp("uVolumnSize", "float")
    volumnSize: number = 1;

    @shaderProp("uLightRange", "float")
    lightRange: number = 10;
}


export class Light2DCompose extends MaterialFromShader(new Shader(...ShaderSource.light2D, {
    blend: [Blending.DstColor, Blending.Zero],
    depth: DepthTest.Disable,
    zWrite: false,
}))
{
    @shaderProp("uLightPosList", "vec4[]")
    lightPosList: vec4[] = [];

    @shaderProp("uLightColorList", "color[]")
    lightColorList: Color[] = [];

    @shaderProp("uLightParamsList", "vec4[]")
    lightParamsList: vec4[] = [];

    @shaderProp("uShadowMapList", "tex2d[]")
    shadowMapList: Array<Texture | null> = [];

    @shaderProp("uLightCount", "int")
    lightCount: number = 0;

    @shaderProp("uCameraParams", "vec4")
    cameraParams: vec4 = vec4.zero();

    @shaderProp("uAmbientLightColor", "color")
    ambientLightColor = Color.white;
}