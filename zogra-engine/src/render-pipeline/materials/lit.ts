import { Color, MaterialFromShader, Shader, shaderProp, Texture } from "zogra-renderer";
import { ShaderSource } from "../../assets";


export class LitLambertian extends MaterialFromShader(new Shader(ShaderSource.defaultVert, ShaderSource.litLambert))
{
    @shaderProp("uColor", "color")
    color: Color = Color.white;

    @shaderProp("uMainTex", "tex2d")
    texture: Texture | null = null;
}