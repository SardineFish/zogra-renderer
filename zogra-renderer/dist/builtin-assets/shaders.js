import { Shader, DepthTest, Blending } from "../core/shader";
import { BuiltinShaderSources } from "./generated";
export const BuiltinUniformNames = {
    matM: "uTransformM",
    matM_IT: "uTransformM_IT",
    matMInv: "uTransformMInv",
    matVP: "uTransformVP",
    matMVP: "uTransformMVP",
    matMV_IT: "uTransformMV_IT",
    flipUV: "uFlipUV",
    mainTex: "uMainTex",
    color: "uColor",
};
export function compileBuiltinShaders(gl) {
    return {
        DefaultShader: new Shader(BuiltinShaderSources.defaultVert, BuiltinShaderSources.defaultFrag, { name: "DefaultShader" }, gl),
        BlitCopy: new Shader(BuiltinShaderSources.defaultVert, BuiltinShaderSources.blitCopy, {
            name: "BlitCopy",
            depth: DepthTest.Always,
            blend: Blending.Disable,
            zWrite: false
        }, gl),
        FlipTexture: new Shader(BuiltinShaderSources.flipVert, BuiltinShaderSources.blitCopy, {}, gl),
        ColoredLine: new Shader(BuiltinShaderSources.colorVert, BuiltinShaderSources.colorFrag, {
            blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha],
            depth: DepthTest.Disable,
            zWrite: false,
        }, gl),
        ErrorShader: new Shader(BuiltinShaderSources.defaultVert, BuiltinShaderSources.texFrag, {
            name: "Error"
        }, gl)
    };
}
export { BuiltinShaderSources };
//# sourceMappingURL=shaders.js.map