import { Shader } from "./shader";
import { Color } from "../types/color";
import { decorator, panic } from "../utils/util";
import "reflect-metadata";
import { GL } from "./global";
import { MaterialType } from "./material-type";
import "reflect-metadata";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { vec4, mat4 } from "gl-matrix";

type ShaderPropType = "mat4" | "float" | "vec2" | "vec3" | "vec4" | "color";

export interface PropertyBlock
{
    [key: string]: {
        type: ShaderPropType,
        location: WebGLUniformLocation
    };
}

export class Material
{
    [key: string]: any;
    shader: Shader;
    propertyBlock: PropertyBlock = {};
    gl: WebGL2RenderingContext;
    constructor(shader: Shader, gl = GL())
    {
        this.gl = gl;
        this.shader = shader;
    }

    setup(gl: WebGL2RenderingContext)
    {
        gl.useProgram(this.shader.program);
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
            }
        }
    }
}


const shaderPropMetaKey = Symbol("shaderProp");
export function shaderProp(name: string, type: ShaderPropType)
{
    return Reflect.metadata(shaderPropMetaKey, { name: name, type: type });
}
function getShaderProp(target: Material, propKey: string): { name: string, type: ShaderPropType } | undefined
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

export function materialType<T extends { new(...arg:any[]): {} }>(constructor: T) : T
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
                if (prop)
                    propertyBlock[key] = {
                        type: prop.type,
                        location: gl.getUniformLocation(shader.program, prop.name) ?? panic("Failed to get uniform location.")
                    };
                (this as any as Material).propertyBlock = propertyBlock;
            }
        }
    }
}