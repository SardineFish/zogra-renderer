import { Asset } from "./asset";
import { mat4 } from "../types/mat4";
export interface AttributeLocations {
    [key: string]: number;
    vert: number;
    color: number;
    uv: number;
    uv2: number;
    normal: number;
}
export interface ShaderAttributeNames {
    [key: string]: string;
    vert: string;
    color: string;
    uv: string;
    uv2: string;
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
    blend: boolean;
    blendRGB: [Blending, Blending];
    blendAlpha: [Blending, Blending];
    zWrite: boolean;
    cull: Culling;
}
interface ShaderPipelineStateSettinsOptional {
    depth?: DepthTest;
    blend?: [Blending, Blending] | boolean | Blending;
    blendRGB?: [Blending, Blending];
    blendAlpha?: [Blending, Blending];
    cull?: Culling;
    zWrite?: boolean;
}
interface ShaderSettingsOptional extends ShaderPipelineStateSettinsOptional {
    name?: string;
    attributes?: Partial<ShaderAttributeNames>;
}
export declare const DefaultShaderAttributeNames: ShaderAttributeNames;
export declare class Shader extends Asset {
    vertexShaderSource: string;
    fragmentShaderSouce: string;
    private attributes;
    private options;
    private initialized;
    private gl;
    private program;
    private vertexShader;
    private fragmentShader;
    private pipelineStates;
    private builtinUniformLocations;
    private _compiled;
    get compiled(): boolean;
    constructor(vertexShader: string, fragmentShader: string, options?: ShaderSettingsOptional, gl?: WebGL2RenderingContext);
    uniformLocation(name: string): WebGLUniformLocation | null;
    use(): void;
    setupPipelineStates(): void;
    setupBuiltinUniform(params: {
        matM: mat4;
        matVP: mat4;
        matMVP: mat4;
        matM_IT: mat4;
        matMV_IT: mat4;
    }): void;
    setPipelineStates(settings: ShaderPipelineStateSettinsOptional): void;
    private setPipelineStateInternal;
    _internal(): {
        attributes: AttributeLocations;
        options: ShaderSettingsOptional;
    };
    private tryInit;
    private compile;
}
export {};
