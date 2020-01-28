import { panicNull } from "../utils/util";
import { GL } from "./global";
import { BuiltinShaderSources, BuiltinUniforms } from "../builtin-assets/shaders";
import { getUniformsLocation } from "../utils/util";

export interface AttributeBlock
{
    vert: number;
    color: number;
    uv: number;
    normal: number;
}

export interface ShaderAttributes
{
    [key: string]: string;
    vert: string;
    color: string;
    uv: string;
    normal: string;
}

export enum DepthTest
{
    Disable = -1,
    Always = WebGL2RenderingContext.ALWAYS,
    Never = WebGL2RenderingContext.NEVER,
    Less = WebGL2RenderingContext.LESS,
    Equal = WebGL2RenderingContext.EQUAL,
    LEqual = WebGL2RenderingContext.LEQUAL,
    Greater = WebGL2RenderingContext.GREATER,
    NotEqual = WebGL2RenderingContext.NOTEQUAL,
    GEqual = WebGL2RenderingContext.GEQUAL,
}

export enum Blending
{
    Disable = -1,
    Zero = WebGL2RenderingContext.ZERO,
    One = WebGL2RenderingContext.ONE,
    SrcColor = WebGL2RenderingContext.SRC_COLOR,
    OneMinusSrcColor = WebGL2RenderingContext.ONE_MINUS_SRC_COLOR,
    DstColor = WebGL2RenderingContext.DST_COLOR,
    OneMinusDstColor = WebGL2RenderingContext.ONE_MINUS_DST_COLOR,
    SrcAlpha = WebGL2RenderingContext.SRC_ALPHA,
    OneMinusSrcAlpha = WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA,
    DstAlpha = WebGL2RenderingContext.DST_ALPHA,
    OneMinusDstAlpha = WebGL2RenderingContext.ONE_MINUS_DST_ALPHA,
}

export enum Culling
{
    Disable = -1,
    Back = WebGL2RenderingContext.BACK,
    Front = WebGL2RenderingContext.FRONT,
    Both = WebGL2RenderingContext.FRONT_AND_BACK,
}


export interface StateSettings
{
    depth: DepthTest,
    blend: [Blending, Blending] | Blending;
    zWrite: boolean,
    cull: Culling
}

interface ShaderSettingsOptional
{
    depth?: DepthTest,
    blend?: [Blending, Blending] | Blending;
    cull?: Culling
    zWrite?: boolean;
    attributes?: ShaderAttributes;
}

export const DefaultShaderAttributes: ShaderAttributes =
{
    vert: "aPos",
    color: "aColor",
    uv: "aUV",
    normal: "aNormal",
};

export class Shader
{
    gl: WebGL2RenderingContext;
    program: WebGLProgram;

    vertexShaderSource: string;
    fragmentShaderSouce: string;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;

    readonly settings: Readonly<StateSettings>;

    readonly attributes: Readonly<AttributeBlock>;

    builtinUniformLocations: { [key in keyof typeof BuiltinUniforms]: WebGLUniformLocation | null };

    private _compiled = false;

    get compiled() { return this._compiled; }
    
    constructor(vertexShader: string, fragmentShader: string, options: ShaderSettingsOptional = {}, gl = GL())
    {
        this.gl = gl;
        this.program = panicNull(gl.createProgram(), "Failed to create shader program");
        this.vertexShaderSource = vertexShader;
        this.fragmentShaderSouce = fragmentShader;
        this.vertexShader = panicNull(gl.createShader(gl.VERTEX_SHADER), "Failed to create vertex shader");
        this.fragmentShader = panicNull(gl.createShader(gl.FRAGMENT_SHADER), "Failed to create fragment shader");

        this.compile();

        const attributes = options.attributes || DefaultShaderAttributes;

        this.attributes = {
            vert: this.gl.getAttribLocation(this.program, attributes.vert),
            color: this.gl.getAttribLocation(this.program, attributes.color),
            uv: this.gl.getAttribLocation(this.program, attributes.uv),
            normal: this.gl.getAttribLocation(this.program, attributes.normal)
        };
        this.settings = {
            depth: options.depth || DepthTest.Less,
            blend: options.blend || Blending.Disable,
            zWrite: options.zWrite === false ? false : true,
            cull: options.cull || Culling.Back
        };
        this.builtinUniformLocations = getUniformsLocation(gl, this.program, BuiltinUniforms);
    }

    compile()
    {
        
        this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
        this.gl.compileShader(this.vertexShader);
        if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS))
        {
            //this.gl.deleteShader(this.vertexShader);
            throw new Error("Failed to compile vertex shader:\r\n" + this.gl.getShaderInfoLog(this.vertexShader));
        }
        this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSouce);
        this.gl.compileShader(this.fragmentShader);
        if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS))
        {
            //this.gl.deleteShader(this.fragmentShader);
            throw new Error("Failed to compile fragment shader:\r\n" + this.gl.getShaderInfoLog(this.fragmentShader));
        }

        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
        {
            throw new Error("Failed to link shader program:\r\n" + this.gl.getProgramInfoLog(this.program));    
        }
    }
}
