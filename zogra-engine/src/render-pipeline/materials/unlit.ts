import { Blending, DepthTest, MaterialFromShader, Shader } from "zogra-renderer";
import { ShaderSource } from "../../assets";

export class UnlitColor extends MaterialFromShader(new Shader(...ShaderSource.unlitColor, {
    blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha]
})) { }
export class UnlitColorOverlay extends MaterialFromShader(new Shader(...ShaderSource.unlitColor, {
    depth: DepthTest.Disable,
    blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha]
})) {}