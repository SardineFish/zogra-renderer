import { BuiltinUniforms } from "../builtin-assets/shaders";
import { Asset } from "./asset";
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
    Disable = -1,
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
    Disable = -1,
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
    Disable = -1,
    Back,
    Front,
    Both
}
export interface StateSettings {
    depth: DepthTest;
    blend: [Blending, Blending] | Blending;
    zWrite: boolean;
    cull: Culling;
}
interface ShaderSettingsOptional {
    name?: string;
    depth?: DepthTest;
    blend?: [Blending, Blending] | Blending;
    cull?: Culling;
    zWrite?: boolean;
    attributes?: ShaderAttributes;
}
export declare const DefaultShaderAttributes: ShaderAttributes;
export declare class Shader extends Asset {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    vertexShaderSource: string;
    fragmentShaderSouce: string;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
    readonly settings: Readonly<StateSettings>;
    readonly attributes: Readonly<AttributeBlock>;
    readonly builtinUniformLocations: {
        [key in keyof typeof BuiltinUniforms]: WebGLUniformLocation | null;
    };
    private _compiled;
    get compiled(): boolean;
    constructor(vertexShader: string, fragmentShader: string, options?: ShaderSettingsOptional, gl?: WebGL2RenderingContext);
    compile(): void;
}
export {};
