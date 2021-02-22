import { Shader } from "./shader";
import { Color } from "../types/color";
import { decorator, panic } from "../utils/util";
import "reflect-metadata";
import { GL, GLContext } from "./global";
import { MaterialType } from "./material-type";
import "reflect-metadata";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { vec4, mat4 } from "gl-matrix";
import { Texture } from "./texture";
import { BindingData, UniformValueType } from "./types";
import { UniformType } from "./types"
import { Asset } from "./asset";

export interface PropertyBlock
{
    [key: string]: {
        type: UniformType,
        location: WebGLUniformLocation,
        name: string,
    };
}

export class Material extends Asset
{
    [key: string]: any;
    private _shader: Shader;
    propertyBlock: PropertyBlock = {};
    gl: WebGL2RenderingContext;

    protected initialized = false;

    constructor(shader: Shader, gl = GL())
    {
        super();
        this.name = `Material_${this.assetID}`;
        this.gl = gl;
        this._shader = shader;
    }

    get shader() { return this._shader }
    set shader(value)
    {
        const gl = this.gl;
        if (value != this._shader)
        {
            this._shader = value;
            for (const key in this.propertyBlock)
            {
                const loc = this._shader.uniformLocation(this.propertyBlock[key].name);
                this.propertyBlock[key].location = loc as WebGLUniformLocation;
            }
        }
    }

    setup(data: BindingData)
    {
        this.tryInit(true);

        const gl = data.gl;
        for (const key in this.propertyBlock)
        {
            const prop = this.propertyBlock[key];
            switch (prop.type)
            {
                case "float":
                    gl.uniform1f(prop.location, this[key] as number);
                    break;
                case "vec2":
                    gl.uniform2fv(prop.location, this[key] as vec2);
                    break;
                case "vec3":
                    gl.uniform3fv(prop.location, this[key] as vec3);
                    break;
                case "vec4":
                    gl.uniform4fv(prop.location, this[key] as vec4);
                    break;
                case "color":
                    gl.uniform4fv(prop.location, this[key] as Color);
                    break;
                case "mat4":
                    gl.uniformMatrix4fv(prop.location, false, this[key] as mat4);
                    break;
                case "tex2d":
                    if (!this[key])
                        data.assets.textures.default.bind(prop.location, data);
                    else
                        (this[key] as Texture || null)?.bind(prop.location, data);
                    break;
                    
            }
        }
    }

    setProp<T extends UniformType>(key: string, uniformName: string, type: T, value: UniformValueType<T>): void
    setProp<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void
    setProp<T extends UniformType>(keyOrName: string, nameOrType: string | T, typeOrValue: T | UniformValueType<T>, valueOrNot?: UniformValueType<T>): void
    {
        let key = keyOrName as string;
        let name = nameOrType as string;
        let type = typeOrValue as T;
        let value = valueOrNot as UniformValueType<T>;
        if (typeof(typeOrValue) !== "string")
        {
            key = name = keyOrName as string;
            type = nameOrType as T;
            value = typeOrValue as UniformValueType<T>;
        }
            
        if (this.propertyBlock[key])
        {
            this.propertyBlock[key].type = type;
        }
        else
        {
            const loc = this.shader.uniformLocation(name);
            if (loc)
            {
                this.propertyBlock[key] = {
                    location: loc,
                    type: type,
                    name: name
                };
            }
        }
        this[key] = value; 
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

        return true;
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

export function materialDefine<T extends { new (...arg: any[]): Material } >(constructor: T) : T
{
    return class extends constructor
    {
        constructor(...arg: any[])
        {
            super(...arg);
            
            this.tryInit(false);
        }

        protected tryInit(required = false): boolean
        {
            if (super.initialized)
                return true;
            if (!super.tryInit(required))
                return false;
            
            const gl = this.gl || GL();
            this.gl = gl;
            const shader = this.shader;
            const propertyBlock = this.propertyBlock;
            for (const key in this)
            {
                const prop = getShaderProp(this, key);
                if (!prop)
                    continue;
                const loc = shader.uniformLocation(prop?.name);
                if (!loc) continue;
                propertyBlock[key] = {
                    type: prop.type,
                    location: loc,
                    name: prop.name
                };
            }
            this.propertyBlock = propertyBlock;
            
            return true;
        }
    }
}