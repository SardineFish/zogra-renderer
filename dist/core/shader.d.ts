import { BuiltinUniforms } from "../builtin-assets/shaders";
export interface AttributeBlock {
    vert: number;
    color: number;
    uv: number;
    normal: number;
}
export interface ShaderAttributes {
    [key: string]: string;
    vert: string;
    color: string;
    uv: string;
    normal: string;
}
export declare enum DepthTest {
    Always,
    Never,
    Less,
    Equal,
    LEqual,
    Greater,
    NotEqual,
    GEqual
}
export declare enum Blending {
    Zero,
    One,
    SrcColor,
    OneMinusSrcColor,
    DstColor,
    OneMinusDstColor,
    SrcAlpha,
    OneMinusSrcAlpha,
    DstAlpha,
    OneMinusDstAlpha
}
export declare enum Culling {
    Back,
    Front,
    Both
}
export interface StateSettings {
    depth: DepthTest;
    blendSrc: Blending;
    blendDst: Blending;
    zWrite: boolean;
    cull: Culling;
}
interface ShaderSettingsOptional {
    depth?: DepthTest;
    blendSrc?: Blending;
    blendDst?: Blending;
    cull?: Culling;
    zWrite?: boolean;
    attributes?: ShaderAttributes;
}
export declare const DefaultShaderAttributes: ShaderAttributes;
export declare class Shader {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    vertexShaderSource: string;
    fragmentShaderSouce: string;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
    readonly settings: Readonly<StateSettings>;
    readonly attributes: Readonly<AttributeBlock>;
    builtinUniformLocations: {
        [key in keyof typeof BuiltinUniforms]: WebGLUniformLocation | null;
    };
    private _compiled;
    get compiled(): boolean;
    constructor(vertexShader: string, fragmentShader: string, options?: ShaderSettingsOptional, gl?: WebGL2RenderingContext);
    compile(): void;
}
export {};
