import { Blending, Culling, DepthTest, Shader, ShaderPipelineStateSettinsOptional, StateSettings } from "./shader";
import { Color } from "../types/color";
import { cloneUniformValue, decorator, panic } from "../utils/util";
import "reflect-metadata";
import { GL, GLContext, GlobalContext } from "./global";
import { MaterialType, SimpleTexturedMaterialClass } from "./material-type";
import "reflect-metadata";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { RenderTexture, Texture, Texture2D } from "./texture";
import { BindingData, NumericUniformArrayTypes, NumericUnifromTypes, TextureArrayUniformTypes, TextureArrayValueType, TextureUniformTypes, UniformValueType } from "./types";
import { UniformType } from "./types"
import { Asset } from "./asset";
import { BuiltinUniformNames } from "../builtin-assets/shaders";
import { vec4 } from "../types/vec4";
import { mat4 } from "../types/mat4";
import { quat } from "../types/quat";

/**
 * Inicate where to get the value from material
 */
enum ValueReference
{
    Field, // defined with @shaderProps
    Dynamic, // set by setProperty()
}

type UniformPropertyStorageType<T extends UniformType> =
    T extends TextureUniformTypes | NumericUnifromTypes ? UniformValueType<T>
    : T extends NumericUniformArrayTypes ? Float32Array
    : never;

interface FieldProperty
{
    key: string,
    value?: never;
}
interface DynamicProperty<T extends UniformType>
{
    key?: never;
    value: UniformValueType<T>;
}
type PropertyReference<T extends UniformType> = FieldProperty | DynamicProperty<T>;

type PropertyBase<T extends UniformType> = PropertyReference<T> & {
    type: T;
    location: WebGLUniformLocation | null;
}

type NumericProperty<T extends NumericUnifromTypes> = PropertyBase<T> &
{
    uploaded?: UniformPropertyStorageType<T>;
};

type VectorArrayProperty<T extends NumericUniformArrayTypes> = PropertyBase<T> & {
    uploaded?: UniformValueType<T>;
    buffer: Float32Array;
}

type TextureProperty<T extends TextureUniformTypes> = PropertyBase<T> &
{
    uploaded?: number;
};
type TextureArrayProperty<T extends TextureArrayUniformTypes> = PropertyBase<T> & {
    uploaded?: number[];
}

type PropertyInfo<T extends UniformType = UniformType> =
    T extends NumericUnifromTypes ? NumericProperty<T>
    : T extends NumericUniformArrayTypes ? VectorArrayProperty<T>
    : T extends TextureUniformTypes ? TextureProperty<T>
    : T extends TextureArrayUniformTypes ? TextureArrayProperty<T>
    : never;

export interface MaterialProperties
{
    [uniformName: string]: PropertyInfo;
}
// export type MaterialProperties = Map<string, NumericProperty<NumericUnifromTypes> | TextureProperty<TextureUniformTypes>>;

export class Material extends Asset
{
    [key: string]: any;
    private _shader: Shader;
    properties: MaterialProperties = {};
    gl: WebGL2RenderingContext;
    pipelineStateOverride: StateSettings;

    private textureCount = 0;
    private boundTextures: Texture[] = [];
    protected initialized = false;

    constructor(shader: Shader, gl = GL())
    {
        super();
        this.name = `Material_${this.assetID}`;
        this.gl = gl;
        this._shader = shader;

        this.pipelineStateOverride = { ...shader.pipelineStates };
    }

    get shader() { return this._shader }
    // set shader(value)
    // {
    //     const gl = this.gl;
    //     if (value != this._shader)
    //     {
    //         this._shader = value;
    //         for (const uniformName in this.properties)
    //         {
    //             const loc = this._shader.uniformLocation(uniformName);
    //             this.properties[uniformName].location = loc;
    //         }
    //     }
    // }

    upload(data: BindingData)
    {
        this.tryInit(true);

        this.setupPipelineStateOverride();

        for (const uniformName in this.properties)
        {
            const prop = this.properties[uniformName];
            const value = prop.key
                ? this[prop.key]
                : prop.value;
            if (value !== undefined)
                this.uploadUniform(prop, value);
        }
    }

    // setProp<T extends UniformType>(key: string, uniformName: string, type: T, value: UniformValueType<T>): void
    // setProp<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void
    setProp<T extends UniformType>(uniformName: string, type: T, value: UniformValueType<T>): void
    {
        this.tryInit(true);

        const prop = this.getOrCreatePropInfo<T>(uniformName, type);

        if (type !== prop.type)
        {
            console.warn("Uniform type missmatch");
            return;
        }

        if (prop.key)
            this[prop.key] = value;
        else
        {
            prop.value = value;
        }
    }

    /**
     * Unbind all render textures from active texture slot due to avoid
     * 'Feedback loop formed between Framebuffer and active Texture' in chrome since version 83
     */
    unbindRenderTextures()
    {
        this.tryInit(true);

        const gl = this.gl;
        for (let unit = 0; unit < this.boundTextures.length; unit++)
        {
            const texture = this.boundTextures[unit]
            if (texture instanceof RenderTexture)
            {
                texture.unbind(unit);
            }
        }
        this.boundTextures.length = 0;
    }

    protected tryInit(required = false): boolean
    {
        if (this.initialized)
            return true;
        
        const gl = this.gl || GL();
        if (!gl)
        {
            if (required)
                throw new Error("Failed to intialize material without global GL context");
            return false;
        }
        this.gl = gl;

        for (const key in this)
        {
            const propInfo = getShaderProp(this, key);
            if (!propInfo)
                continue;
            const prop = this.getOrCreatePropInfo(propInfo.name, propInfo.type);
            prop.key = key;
        }

        this.initialized = true;

        return true;

    }

    public setUniformDirectly<T extends UniformType>(uniformName: string, type: T, value: UniformValueType<T>)
    {
        if (value === undefined)
            throw new Error("")
        this.tryInit(true);

        const prop = this.getOrCreatePropInfo(uniformName, type);
        if (!prop.location)
            return;
        
        this.uploadUniform(prop, value);
    }

    private getOrCreatePropInfo<T extends UniformType>(uniformName: string, type: T): PropertyInfo<T>
    {
        let prop = this.properties[uniformName];
        if (prop)
            return prop as PropertyInfo<T>;
        if (type === "tex2d")
        {
            prop = <TextureProperty<TextureUniformTypes>>{
                type: type,
                value: undefined as any,
                uploaed: undefined,
                location: this.shader.uniformLocation(uniformName),
            };
        }
        else if (type === "tex2d[]")
        {
            prop = <TextureArrayProperty<TextureArrayUniformTypes>>{
                type: type,
                value: undefined as any,
                uploaded: undefined as any,
                location: this.shader.uniformLocation(uniformName),
                buffer: new Array(),
            }
        }
        else if (type.endsWith("[]"))
            prop = <VectorArrayProperty<NumericUniformArrayTypes>>{
                type: type,
                value: undefined as any,
                uploaded: undefined,
                location: this.shader.uniformLocation(uniformName),
                buffer: new Float32Array(),
            } as any;
        else
        {
            prop = <NumericProperty<NumericUnifromTypes>>{
                type: type,
                value: undefined as any,
                uploaded: undefined,
                location: this.shader.uniformLocation(uniformName),
            } as any;
        }

        this.properties[uniformName] = prop;
        return prop as PropertyInfo<T>;
    }

    setPipelineStateOverride(settings: ShaderPipelineStateSettinsOptional)
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

        this.pipelineStateOverride = {
            depth: settings.depth || DepthTest.Less,
            blend,
            blendRGB,
            blendAlpha,
            zWrite: settings.zWrite === false ? false : true,
            cull: settings.cull || Culling.Back
        };
    }

    private setupPipelineStateOverride()
    {
        const gl = this.gl;

        if (this.pipelineStateOverride.depth === DepthTest.Disable)
            gl.disable(gl.DEPTH_TEST);
        else
        {
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(this.pipelineStateOverride.zWrite);
            gl.depthFunc(this.pipelineStateOverride.depth);
        }

        if (!this.pipelineStateOverride.blend)
            gl.disable(gl.BLEND);
        else
        {
            const [srcRGB, dstRGB] = this.pipelineStateOverride.blendRGB;
            const [srcAlpha, dstAlpha] = this.pipelineStateOverride.blendAlpha;
            gl.enable(gl.BLEND);
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
        }

        if (this.pipelineStateOverride.cull === Culling.Disable)
            gl.disable(gl.CULL_FACE);
        else
        {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(this.pipelineStateOverride.cull);
            gl.frontFace(gl.CCW);
        }
    }

    private uploadUniform<T extends UniformType>(prop: PropertyInfo<T>, value: UniformValueType<T>)
    {

        const gl = this.gl;
        const ctx = GlobalContext();

        if (!prop.location)
            return false;
        
        let dirty = false;
        if (prop.uploaded === null && value === null && prop.type !== "tex2d")
            return false;
        
        // switch (prop.type)
        // {
        //     case "tex2d":
        //     case "float":
        //     case "int":
        //         dirty = prop.uploaded !== value;
        //         break;
        //     case "mat4":
        //         dirty = !mat4.exactEquals(prop.uploaded as mat4, value as mat4);
        //         break;
        //     default:
        //         dirty = !(prop.uploaded as Vector).equals(value);
        //         break;
        // }
        // if (!dirty)
        //     return false;
    
        let uploaded: UniformValueType<T> | number | number[] = value;
        
        switch (prop.type)
        {
            case "int":
                gl.uniform1i(prop.location, value as number);
                break;
            case "float":
                gl.uniform1f(prop.location, value as number);
                break;
            case "vec2":
                gl.uniform2fv(prop.location, value as vec2);
                break;
            case "vec3":
                gl.uniform3fv(prop.location, value as vec3);
                break;
            case "vec4":
                gl.uniform4fv(prop.location, value as vec4);
                break;
            case "color":
                gl.uniform4fv(prop.location, value as Color);
                break;
            case "mat4":
                gl.uniformMatrix4fv(prop.location, false, value as mat4);
                break;
            case "int[]":
                (value as number[]).length && gl.uniform1iv(prop.location, value as number[]);
                break;
            case "float[]":
                (value as number[]).length && gl.uniform1fv(prop.location, value as number[]);
                break;
            case "vec2[]": {
                const length = this.setVectorUniformBuffer(prop as PropertyInfo<"vec2[]">, 2, value as vec2[]);
                length && gl.uniform2fv(prop.location, (prop as PropertyInfo<"vec2[]">).buffer, 0, length);
                break;
            }
            case "vec3[]": {
                const length = this.setVectorUniformBuffer(prop as PropertyInfo<"vec3[]">, 3, value as vec3[]);
                length && gl.uniform3fv(prop.location, (prop as PropertyInfo<"vec3[]">).buffer, 0, length);
                break;
            }
            case "color[]":
            case "vec4[]": {
                const length = this.setVectorUniformBuffer(prop as PropertyInfo<"vec4[]">, 4, value as vec4[]);
                length && gl.uniform4fv(prop.location, (prop as PropertyInfo<"vec4[]">).buffer, 0, length);
                break;
            }
            case "mat4[]": {
                const length = this.setVectorUniformBuffer(prop as PropertyInfo<"vec4[]">, 16, value as mat4[]);
                length && gl.uniform4fv(prop.location, (prop as PropertyInfo<"mat4[]">).buffer, 0, length);
                break;
            }
            case "tex2d": {
                // Update texture to texture unit instead of update uniform1i
                // Due to performance issue mentioned in https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14.10

                const texProp = prop as PropertyInfo<TextureUniformTypes>;

                (value as UniformValueType<TextureUniformTypes>) = (value as UniformValueType<TextureUniformTypes>) || ctx.renderer.assets.textures.default;
                let unit = this.bindNextTexture(value as Texture);

                if (texProp.uploaded !== unit)
                {
                    gl.uniform1i(texProp.location, unit);
                    texProp.uploaded = unit;
                }

                uploaded = unit;
                break;
            }
            case "tex2d[]":{
                const texProp = prop as PropertyInfo<TextureArrayUniformTypes>;
                const texArray = value as Array<Texture | null>;

                let shouldUpload = false;
                const uniformValues = texProp.uploaded || [];
                for (let i = 0; i < texArray.length; i++)
                {
                    const tex = texArray[i] || ctx.renderer.assets.textures.default;
                    let unit = this.bindNextTexture(tex);
                    if (texProp.uploaded?.[i] !== unit)
                        shouldUpload = true;
                    uniformValues[i] = unit;
                }

                if (shouldUpload)
                {
                    gl.uniform1iv(texProp.location, uniformValues, 0, texArray.length);
                    texProp.uploaded = uniformValues;
                }
                uploaded = uniformValues;
            }
        }

        prop.uploaded = uploaded as any;
    }

    private bindNextTexture(texture: Texture)
    {
        texture.bind(this.boundTextures.length);
        return this.boundTextures.push(texture) - 1;
    }

    private setVectorUniformBuffer<T extends vec2 | vec3 | vec4 | quat | Color | mat4>(prop: PropertyInfo<NumericUniformArrayTypes>, elementSize: number, valueArray: T[])
    {
        if (prop.buffer.length < elementSize * valueArray.length)
        {
            prop.buffer = new Float32Array(elementSize * valueArray.length);
        }
        for (let i = 0; i < valueArray.length; i++)
        {
            prop.buffer.set(valueArray[i], i * elementSize);
        }
        return elementSize * valueArray.length;
    }
}


const shaderPropMetaKey = Symbol("shaderProp");
export function shaderProp(name: string, type: UniformType)
{
    return Reflect.metadata(shaderPropMetaKey, { name: name, type: type });
}
function getShaderProp(target: Material, propKey: string): { name: string, type: UniformType } | undefined
{
    return Reflect.getMetadata(shaderPropMetaKey, target, propKey);
}


export function MaterialFromShader(shader: Shader): typeof MaterialType
{
    return class Mat extends Material
    {
        constructor(gl = GL())
        {
            super(shader, gl);
        }
    };
}

export function SimpleTexturedMaterial(shader: Shader): typeof SimpleTexturedMaterialClass
{
    class Mat extends MaterialFromShader(shader)
    {
        @shaderProp(BuiltinUniformNames.mainTex, "tex2d")
        texture: Texture | null = null;

        @shaderProp(BuiltinUniformNames.color, "color")
        color: Color = new Color(1, 1, 1, 1);
    }

    return Mat;
}

/**
 * 
 * @deprecated
 */
export function materialDefine<T extends { new (...arg: any[]): Material } >(constructor: T) : T
{
    return class extends constructor
    {
        constructor(...arg: any[])
        {
            super(...arg);
        }
    }
}