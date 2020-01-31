import { Shader } from "../core/shader";
export declare const BuiltinShaderSources: {
    DefaultVert: string;
    DefaultFrag: string;
    BlitCopyFrag: string;
    FlipTexVert: string;
};
export declare const BuiltinUniforms: {
    matM: string;
    matM_IT: string;
    matMInv: string;
    matVP: string;
    matMVP: string;
    matMV_IT: string;
    flipUV: string;
    mainTex: string;
};
export declare function compileBuiltinShaders(gl: WebGL2RenderingContext): {
    DefaultShader: Shader;
    BlitCopy: Shader;
    FlipTexture: Shader;
    ColoredLine: Shader;
};
