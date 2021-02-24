import { panic, panicNull } from "../utils/util";
import { GL, GlobalContext } from "./global";
import { BuiltinShaderSources, BuiltinUniformNames } from "../builtin-assets/shaders";
import { getUniformsLocation } from "../utils/util";
import { Asset } from "./asset";
import { mat4 } from "../types/mat4";

export interface AttributeBlock
{
    vert: number;
    color: number;
    uv: number;
    uv2: number;
    normal: number;
}

export interface ShaderAttributes
{
    [key: string]: string;
    vert: string;
    color: string;
    uv: string;
    uv2: string;
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
    blend: boolean;
    blendRGB: [Blending, Blending];
    blendAlpha: [Blending, Blending];
    zWrite: boolean,
    cull: Culling
}

interface ShaderSettingsOptional
{
    name?: string;
    depth?: DepthTest,
    blend?: [Blending, Blending] | boolean | Blending;
    blendRGB?: [Blending, Blending];
    blendAlpha?: [Blending, Blending];
    cull?: Culling
    zWrite?: boolean;
    attributes?: ShaderAttributes;
}

export const DefaultShaderAttributes: ShaderAttributes =
{
    vert: "aPos",
    color: "aColor",
    uv: "aUV",
    uv2: "aUV2",
    normal: "aNormal",
};

export class Shader extends Asset
{
    vertexShaderSource: string;
    fragmentShaderSouce: string;

    private options: ShaderSettingsOptional;
    
    private initialized = false;

    private gl: WebGL2RenderingContext = null as any;
    private program: WebGLProgram = null as any;

    private vertexShader: WebGLShader = null as any;
    private fragmentShader: WebGLShader = null as any;

    private settings: StateSettings = null as any;

    private attributes: AttributeBlock = null as any;

    private builtinUniformLocations: { [key in keyof typeof BuiltinUniformNames]: WebGLUniformLocation | null } = null as any;

    private _compiled = false;

    get compiled() { return this._compiled; }
    
    constructor(vertexShader: string, fragmentShader: string, options: ShaderSettingsOptional = {}, gl = GL())
    {
        super(options.name);
        if (!options.name)
            this.name = `Shader_${this.assetID}`;
        this.vertexShaderSource = vertexShader;
        this.fragmentShaderSouce = fragmentShader;
        this.options = options;
        this.gl = gl;

        this.tryInit();
    }

    uniformLocation(name: string)
    {
        this.tryInit(true);

        return this.gl.getUniformLocation(this.program, name);
    }

    use()
    {
        this.tryInit(true);

        this.gl.useProgram(this.program);
    }

    setupPipelineStates()
    {
        const gl = this.gl;

        if (this.settings.depth === DepthTest.Disable)
            gl.disable(gl.DEPTH_TEST);
        else
        {
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(this.settings.zWrite);
            gl.depthFunc(this.settings.depth);
        }

        if (!this.settings.blend)
            gl.disable(gl.BLEND);
        else
        {
            const [srcRGB, dstRGB] = this.settings.blendRGB;
            const [srcAlpha, dstAlpha] = this.settings.blendAlpha;
            gl.enable(gl.BLEND);
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
        }

        if (this.settings.cull === Culling.Disable)
            gl.disable(gl.CULL_FACE);
        else
        {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(this.settings.cull);
            gl.frontFace(gl.CCW);
        }
    }

    setupBuiltinUniform(params: {
        matM: mat4,
        matVP: mat4,
        matMVP: mat4,
        matM_IT: mat4,
        matMV_IT: mat4,
    })
    {
        this.tryInit(true);

        const gl = this.gl;

        // gl.useProgram(this.program);

        // console.log(this.builtinUniformLocations.matMVP);
        this.builtinUniformLocations.matM && gl.uniformMatrix4fv(this.builtinUniformLocations.matM, false, params.matM);
        this.builtinUniformLocations.matVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matVP, false, params.matVP);
        this.builtinUniformLocations.matMVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matMVP, false, params.matMVP);
        this.builtinUniformLocations.matM_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matM_IT, false, params.matM_IT);
        this.builtinUniformLocations.matMV_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matMV_IT, false, params.matMV_IT);
    }

    _internal()
    {
        this.tryInit(true);

        return {
            attributes: this.attributes
        };
    }



    private tryInit(required = false)
    {
        if (this.initialized)
            return true;

        const gl = this.gl || GL();
        if (!gl)
        {
            return required
                ? panic("Failed to init shader without a global GL context")
                : false;
        }

        this.gl = gl;
        this.program = panicNull(gl.createProgram(), "Failed to create shader program");
        this.vertexShader = panicNull(gl.createShader(gl.VERTEX_SHADER), "Failed to create vertex shader");
        this.fragmentShader = panicNull(gl.createShader(gl.FRAGMENT_SHADER), "Failed to create fragment shader");

        this.compile();
        gl.useProgram(this.program);

        const attributes = this.options.attributes || DefaultShaderAttributes;

        this.attributes = {
            vert: this.gl.getAttribLocation(this.program, attributes.vert),
            color: this.gl.getAttribLocation(this.program, attributes.color),
            uv: this.gl.getAttribLocation(this.program, attributes.uv),
            uv2: this.gl.getAttribLocation(this.program, attributes.uv2),
            normal: this.gl.getAttribLocation(this.program, attributes.normal)
        };

        let blend = false;
        let blendRGB: [Blending, Blending] = [Blending.One, Blending.Zero];
        let blendAlpha: [Blending, Blending] = [Blending.One, Blending.OneMinusSrcAlpha];
        if (typeof(this.options.blend) === "number" && this.options.blend !== Blending.Disable)
        {
            blend = true;
            blendRGB = [this.options.blend, this.options.blend];
            blendAlpha = [this.options.blend, this.options.blend];
        }
        else if (this.options.blend instanceof Array)
        {
            blend = true;
            blendRGB = this.options.blend;
        }
        if (this.options.blendRGB)
        {
            blend = this.options.blend !== false && this.options.blend !== Blending.Disable;
            blendRGB = this.options.blendRGB;
        }
        if (this.options.blendAlpha)
        {
            blend = this.options.blend !== false && this.options.blend !== Blending.Disable;
            blendAlpha = this.options.blendAlpha;
        }
        
        this.settings = {
            depth: this.options.depth || DepthTest.Less,
            blend,
            blendRGB,
            blendAlpha,
            zWrite: this.options.zWrite === false ? false : true,
            cull: this.options.cull || Culling.Back
        };
        this.builtinUniformLocations = getUniformsLocation(gl, this.program, BuiltinUniformNames);

        this.initialized = true;
        return true;
    }

    private compile()
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
