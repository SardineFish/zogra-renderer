"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinShaderSources = exports.compileBuiltinShaders = exports.BuiltinUniformNames = void 0;
const shader_1 = require("../core/shader");
const generated_1 = require("./generated");
Object.defineProperty(exports, "BuiltinShaderSources", { enumerable: true, get: function () { return generated_1.BuiltinShaderSources; } });
exports.BuiltinUniformNames = {
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
function compileBuiltinShaders(gl) {
    return {
        DefaultShader: new shader_1.Shader(generated_1.BuiltinShaderSources.defaultVert, generated_1.BuiltinShaderSources.defaultFrag, { name: "DefaultShader" }, gl),
        BlitCopy: new shader_1.Shader(generated_1.BuiltinShaderSources.defaultVert, generated_1.BuiltinShaderSources.blitCopy, {
            name: "BlitCopy",
            depth: shader_1.DepthTest.Always,
            blend: shader_1.Blending.Disable,
            zWrite: false
        }, gl),
        FlipTexture: new shader_1.Shader(generated_1.BuiltinShaderSources.flipVert, generated_1.BuiltinShaderSources.blitCopy, {}, gl),
        ColoredLine: new shader_1.Shader(generated_1.BuiltinShaderSources.colorVert, generated_1.BuiltinShaderSources.colorFrag, {
            blend: [shader_1.Blending.SrcAlpha, shader_1.Blending.OneMinusSrcAlpha],
            depth: shader_1.DepthTest.Disable,
            zWrite: false,
        }, gl),
        ErrorShader: new shader_1.Shader(generated_1.BuiltinShaderSources.defaultVert, generated_1.BuiltinShaderSources.texFrag, {
            name: "Error"
        }, gl)
    };
}
exports.compileBuiltinShaders = compileBuiltinShaders;
//# sourceMappingURL=shaders.js.map