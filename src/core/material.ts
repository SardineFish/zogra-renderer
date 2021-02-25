import { Shader } from "./shader";
import { Color } from "../types/color";
import { decorator, panic } from "../utils/util";
import "reflect-metadata";
import { GL, GLContext } from "./global";
import { MaterialType } from "./material-type";
import "reflect-metadata";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import {  mat4 } from "gl-matrix";
import { RenderTexture, Texture, Texture2D } from "./texture";
import { BindingData, NumericUnifromTypes, TextureUniformTypes, UniformValueType } from "./types";
import { UniformType } from "./types"
import { Asset } from "./asset";
import { BuiltinUniformNames } from "../builtin-assets/shaders";
import { vec4, Vector } from "../types/vec4";

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
    location: WebGLUniformLocation | null | undefined;
    uploaded: UniformValueType<T>;
};

type TextureProperty<T extends TextureUniformTypes> = PropertyReference<T> &
{
    type: T;
    location: WebGLUniformLocation | null | undefined;
    textureUnit: number;
    uploaded: UniformValueType<T> | null;
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

    setup(data: BindingData)
    {
        this.tryInit(true);

        const gl = data.gl;
        for (const uniformName in this.properties)
        {
            this.setUniform(uniformName);
        }
    }

    // setProp<T extends UniformType>(key: string, uniformName: string, type: T, value: UniformValueType<T>): void
    // setProp<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void
    setProp<T extends UniformType>(uniformName: string, type: T, value: UniformValueType<T>): void
    {
        this.tryInit(true);

        let prop = this.properties[uniformName];
        if (!prop)
        {
            // console.log("set new prop");
            switch (type)
            {
                case "tex2d":
                    this.properties[uniformName] = {
                        type: type as TextureUniformTypes,
                        textureUnit: this.textureCount++,
                        location: undefined,
                        uploaded: null,
                        value: value as Texture
                    };
                    break;
                default:
                    this.properties[uniformName] = {
                        type: type as NumericUnifromTypes,
                        location: undefined,
                        uploaded: null,
                        value: value as any
                    };
            }
            return;
        }
        if (prop.key)
        {
            this[prop.key] = value;
        }
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
        const shader = this.shader;
        const properties = this.properties;
        // shader.use();
        for (const key in this)
        {
            const prop = getShaderProp(this, key);
            if (!prop)
                continue;
            const loc = shader.uniformLocation(prop?.name);
            if (!loc) continue;
            switch (prop.type)
            {
                case "tex2d":
                    properties[prop.name] = {
                        type: prop.type,
                        uploaded: null,
                        key: key,
                        location: loc,
                        textureUnit: this.textureCount++,
                    };
                    break;
                default:
                    properties[prop.name] = {
                        type: prop.type,
                        location: loc,
                        uploaded: null,
                        key: key
                    };
            }
        }
        this.properties = properties;

        this.initialized = true;

        return true;

    }

    private setUniform(uniformName: string)
    {
        const prop = this.properties[uniformName];

        const gl = this.gl;

        if (prop.location === undefined)
        {
            // this.shader.use();
            prop.location = this.shader.uniformLocation(uniformName);   
        }
        if (!prop.location)
            return false;

        let value = (prop.key
            ? this[prop.key]
            : prop.value) as UniformValueType<UniformType>;
        
        let dirty = false;
        if (prop.uploaded == null && value == null)
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

export function SimpleTexturedMaterial(shader: Shader): typeof MaterialType
{
    @materialDefine
    class Mat extends MaterialFromShader(shader)
    {
        @shaderProp(BuiltinUniformNames.mainTex, "tex2d")
        texture: Texture2D | null = null;

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