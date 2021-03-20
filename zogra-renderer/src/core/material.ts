import { Shader } from "./shader";
import { Color } from "../types/color";
import { decorator, panic } from "../utils/util";
import "reflect-metadata";
import { GL, GLContext, GlobalContext } from "./global";
import { MaterialType, SimpleTexturedMaterialClass } from "./material-type";
import "reflect-metadata";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { RenderTexture, Texture, Texture2D } from "./texture";
import { BindingData, NumericUnifromTypes, TextureUniformTypes, UniformValueType } from "./types";
import { UniformType } from "./types"
import { Asset } from "./asset";
import { BuiltinUniformNames } from "../builtin-assets/shaders";
import { vec4, Vector } from "../types/vec4";
import { mat4 } from "../types/mat4";

/**
 * Inicate where to get the value from material
 */
enum ValueReference
{
    Field, // defined with @shaderProps
    Dynamic, // set by setProperty()
}

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

type NumericProperty<T extends NumericUnifromTypes> = PropertyReference<T> &
{
    type: T;
    location: WebGLUniformLocation | null;
    uploaded?: UniformValueType<T>;
};

type TextureProperty<T extends TextureUniformTypes> = PropertyReference<T> &
{
    type: T;
    location: WebGLUniformLocation | null;
    textureUnit: number;
    uploaded?: UniformValueType<T> | null;
    uniformSet?: true;
};

type PropertyInfo = NumericProperty<NumericUnifromTypes> | TextureProperty<TextureUniformTypes>;

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

    private textureCount = 0;
    protected initialized = false;

    constructor(shader: Shader, gl = GL())
    {
        super();
        this.name = `Material_${this.assetID}`;
        this.gl = gl;
        this._shader = shader;

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

        const prop = this.getOrCreatePropInfo(uniformName, type);

        if (type !== prop.type)
        {
            console.warn("Uniform type missmatch");
            return;
        }

        if (prop.key)
            this[prop.key] = value;
        else
            prop.value = value;
    }

    /**
     * Unbind all render textures from active texture slot due to avoid
     * 'Feedback loop formed between Framebuffer and active Texture' in chrome since version 83
     */
    unbindRenderTextures()
    {
        this.tryInit(true);

        const gl = this.gl;
        for (const uniformName in this.properties)
        {
            const prop = this.properties[uniformName];
            if (prop.uploaded instanceof RenderTexture)
            {
                prop.uploaded.unbind((prop as TextureProperty<TextureUniformTypes>).textureUnit);
                prop.uploaded = null;
            }
        }
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

    private getOrCreatePropInfo<T extends UniformType>(uniformName: string, type: T): PropertyInfo
    {
        let prop = this.properties[uniformName];
        if (prop)
            return prop;
        switch (type)
        {
            case "tex2d":
                prop = {
                    type: type,
                    uploaded: undefined,
                    location: this.shader.uniformLocation(uniformName),
                    textureUnit: this.textureCount++,
                } as any;
                break;
            default:
                prop = {
                    type: type,
                    location: this.shader.uniformLocation(uniformName),
                    uploaded: undefined,
                } as any;
        }
        this.properties[uniformName] = prop;
        return prop;
    }

    private uploadUniform(prop: PropertyInfo, value: UniformValueType<UniformType>)
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
        
        switch (prop.type)
        {
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
            case "tex2d":
                // Update texture to texture unit instead of update uniform1i
                // Due to performance issue mentioned in https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14.10
                value = value || ctx.renderer.assets.textures.default;
                    
                (value as Texture).bind(prop.textureUnit);
                if (!prop.uniformSet)
                {
                    gl.uniform1i(prop.location, prop.textureUnit);
                    prop.uniformSet = true;
                }
                break;
        }

        prop.uploaded = value;
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