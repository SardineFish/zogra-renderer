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
                const loc = gl.getUniformLocation(this._shader.program, this.propertyBlock[key].name);
                this.propertyBlock[key].location = loc as WebGLUniformLocation;
            }
        }
    }

    setup(data: BindingData)
    {
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

    setProp<T extends UniformType>(name: string, type: T, value: UniformValueType<T>)
    {
        if (this.propertyBlock[name])
        {
            this.propertyBlock[name].type = type;
        }
        else
        {
            const loc = this.gl.getUniformLocation(this.shader.program, name);
            if (loc)
            {
                this.propertyBlock[name] = {
                    location: loc,
                    type: type,
                    name: name
                };
            }
        }
        this[name] = value; 
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

export function materialDefine<T extends { new(...arg:any[]): {} }>(constructor: T) : T
{
    return class extends constructor
    {
        constructor(...arg: any[])
        {
            super(...arg);
            const gl = (this as any as Material).gl;
            const shader = (this as any as Material).shader;
            const propertyBlock = (this as any as Material).propertyBlock;
            for (const key in this)
            {
                const prop = getShaderProp(this as any as Material, key);
                if (!prop)
                    continue;
                const loc = gl.getUniformLocation(shader.program, prop?.name);
                if (!loc) continue;
                propertyBlock[key] = {
                    type: prop.type,
                    location: loc,
                    name: prop.name
                };
            }
            (this as any as Material).propertyBlock = propertyBlock;
        }
    }
}