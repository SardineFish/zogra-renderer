import { Asset } from "./asset";
import { mat4 } from "../types/mat4";
import { BufferStructure } from "./array-buffer";
import { DefaultVertexData } from "./mesh";
export declare type AttributeLocations<VertexStruct extends BufferStructure> = {
    [key in keyof VertexStruct]: number;
};
export declare type ShaderAttributeNames<VertexStruct extends BufferStructure> = {
    [key in keyof VertexStruct]: string;
};
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
interface ShaderSettingsOptional<VertexData extends BufferStructure> extends ShaderPipelineStateSettinsOptional {
    name?: string;
    vertexStructure?: VertexData;
    attributes?: Partial<ShaderAttributeNames<VertexData>>;
}
export declare const DefaultShaderAttributeNames: ShaderAttributeNames<typeof DefaultVertexData>;
export declare class Shader<VertexData extends BufferStructure = typeof DefaultVertexData> extends Asset {
    vertexShaderSource: string;
    fragmentShaderSouce: string;
    private vertexStruct;
    private attributeNames;
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
    constructor(vertexShader: string, fragmentShader: string, options?: ShaderSettingsOptional<VertexData>, gl?: WebGL2RenderingContext);
    uniformLocation(name: string): WebGLUniformLocation | null;
    use(): void;
    setupPipelineStates(): void;
    setupBuiltinUniform(params: {
        matM: Readonly<mat4>;
        matVP: Readonly<mat4>;
        matMVP: Readonly<mat4>;
        matM_IT: Readonly<mat4>;
        matMV_IT: Readonly<mat4>;
    }): void;
    setPipelineStates(settings: ShaderPipelineStateSettinsOptional): void;
    private setPipelineStateInternal;
    _internal(): {
        options: ShaderSettingsOptional<VertexData>;
    };
    private tryInit;
    private compile;
}
export {};
