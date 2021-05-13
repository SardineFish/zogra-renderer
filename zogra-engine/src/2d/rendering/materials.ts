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
