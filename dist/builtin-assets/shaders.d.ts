import { Shader } from "../core/shader";
export declare const BuiltinShaderSources: {
    DefaultVert: string;
    DefaultFrag: string;
    BlitCopyFrag: string;
    FlipTexVert: string;
};
export declare const BuiltinUniforms: {
    matM: string;
    matVP: string;
    matMVP: string;
    flipUV: string;
    mainTex: string;
};
export declare function compileBuiltinShaders(gl: WebGL2RenderingContext): {
    DefaultShader: Shader;
    BlitCopy: Shader;
    FlipTexture: Shader;
};
