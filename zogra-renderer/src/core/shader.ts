import { panic, panicNull } from "../utils/util";
import { GL, GlobalContext } from "./global";
import { BuiltinUniformNames } from "../builtin-assets/shaders";
import { getUniformsLocation } from "../utils/util";
import { Asset } from "./asset";
import { mat4 } from "../types/mat4";
import { BufferStructure, BufferStructureInfo } from "./array-buffer";
import { DefaultVertexData } from "./mesh";

export type AttributeLocations<VertexStruct extends BufferStructure> =
    {
        [key in keyof VertexStruct]: number
    };

export type ShaderAttributeNames<VertexStruct extends BufferStructure> =
    {
        [key in keyof VertexStruct]: string;
    };

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

export interface ShaderPipelineStateSettinsOptional
{
    depth?: DepthTest,
    blend?: [Blending, Blending] | boolean | Blending;
    blendRGB?: [Blending, Blending];
    blendAlpha?: [Blending, Blending];
    cull?: Culling
    zWrite?: boolean;
}

interface ShaderSettingsOptional<VertexData extends BufferStructure> extends ShaderPipelineStateSettinsOptional
{
    name?: string;
    vertexStructure?: VertexData,
    attributes?: Partial<ShaderAttributeNames<VertexData>>;
}

export const DefaultShaderAttributeNames: ShaderAttributeNames<typeof DefaultVertexData> =
{
    vert: "aPos",
    color: "aColor",
    uv: "aUV",
    uv2: "aUV2",
    normal: "aNormal",
};

export class Shader<VertexData extends BufferStructure = typeof DefaultVertexData> extends Asset
{
    private readonly vertexShaderSource: string;
    private readonly fragmentShaderSouce: string;
    private readonly options: ShaderSettingsOptional<VertexData>;

    // private attributes: AttributeLocations<VertexData> = null as any;
    private vertexStruct: BufferStructureInfo<VertexData>;
    private attributeNames: ShaderAttributeNames<VertexData>;
    
    /** @internal */
    attributes: AttributeLocations<VertexData> = {} as any;

    
    private initialized = false;

    private gl: WebGL2RenderingContext = null as any;
    private program: WebGLProgram = null as any;

    private vertexShader: WebGLShader = null as any;
    private fragmentShader: WebGLShader = null as any;

    pipelineStates: Readonly<StateSettings> = {} as any;

    private builtinUniformLocations: { [key in keyof typeof BuiltinUniformNames]: WebGLUniformLocation | null } = null as any;

    private _compiled = false;

    get compiled() { return this._compiled; }
    
    constructor(vertexShader: string, fragmentShader: string, options: ShaderSettingsOptional<VertexData> = {}, gl = GL())
    {
        super(options.name);
        if (!options.name)
            this.name = `Shader_${this.assetID}`;
        this.vertexShaderSource = vertexShader;
        this.fragmentShaderSouce = fragmentShader;
        this.options = options;
        this.gl = gl;
        this.vertexStruct = BufferStructureInfo.from(this.options.vertexStructure || DefaultVertexData);
        this.attributeNames = { ...DefaultShaderAttributeNames, ...options.attributes } as ShaderAttributeNames<VertexData>;

        this.setPipelineStateInternal(this.options);

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

    setupBuiltinUniform(params: {
        matM: Readonly<mat4>,
        matVP: Readonly<mat4>,
        matMVP: Readonly<mat4>,
        matM_IT: Readonly<mat4>,
        matMV_IT: Readonly<mat4>,
    })
    {
        this.tryInit(true);

        const gl = this.gl;

        // gl.useProgram(this.program);

        // console.log(this.builtinUniformLocations.matMVP);
        this.builtinUniformLocations.matM && gl.uniformMatrix4fv(this.builtinUniformLocations.matM, false, params.matM.asMut());
        this.builtinUniformLocations.matVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matVP, false, params.matVP.asMut());
        this.builtinUniformLocations.matMVP && gl.uniformMatrix4fv(this.builtinUniformLocations.matMVP, false, params.matMVP.asMut());
        this.builtinUniformLocations.matM_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matM_IT, false, params.matM_IT.asMut());
        this.builtinUniformLocations.matMV_IT && gl.uniformMatrix4fv(this.builtinUniformLocations.matMV_IT, false, params.matMV_IT.asMut());
    }

    clone()
    {
        return new Shader(this.vertexShaderSource, this.fragmentShaderSouce, this.options);
    }

    private setPipelineStateInternal(settings: ShaderPipelineStateSettinsOptional)
    {
        let blend = false;
        let blendRGB: [Blending, Blending] = [Blending.One, Blending.Zero];
        let blendAlpha: [Blending, Blending] = [Blending.One, Blending.OneMinusSrcAlpha];
        if (typeof (settings.blend) === "number" && settings.blend !== Blending.Disable)
        {
            blend = true;
            blendRGB = [settings.blend, settings.blend];
            blendAlpha = [settings.blend, settings.blend];
        }
        else if (settings.blend instanceof Array)
        {
            blend = true;
            blendRGB = settings.blend;
        }
        if (settings.blendRGB)
        {
            blend = settings.blend !== false && settings.blend !== Blending.Disable;
            blendRGB = settings.blendRGB;
        }
        if (settings.blendAlpha)
        {
            blend = settings.blend !== false && settings.blend !== Blending.Disable;
            blendAlpha = settings.blendAlpha;
        }

        this.pipelineStates = {
            depth: settings.depth || DepthTest.Less,
            blend,
            blendRGB,
            blendAlpha,
            zWrite: settings.zWrite === false ? false : true,
            cull: settings.cull || Culling.Back
        };
    }

    _internal()
    {
        this.tryInit(true);

        return {
            options: this.options,
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

        // const attributes = this.options.attributes || DefaultShaderAttributes;
        const attributeNames = { ...DefaultShaderAttributeNames, ...this.options.attributes };

        this.attributes = {} as AttributeLocations<VertexData>;

        for (const key in attributeNames)
        {
            this.attributes[key as keyof AttributeLocations<VertexData>] = gl.getAttribLocation(this.program, attributeNames[key] as string);
        }

        
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

        for (const element of this.vertexStruct.elements)
        {
            if (this.attributeNames[element.key])
                this.gl.bindAttribLocation(this.program, element.location, this.attributeNames[element.key]);
        }

        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
        {
            throw new Error("Failed to link shader program:\r\n" + this.gl.getProgramInfoLog(this.program));
        }
    }
}
