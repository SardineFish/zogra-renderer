import { Shader } from "./shader";
import "reflect-metadata";
import { MaterialType } from "./material-type";
import "reflect-metadata";
declare type ShaderPropType = "mat4" | "float" | "vec2" | "vec3" | "vec4" | "color";
export interface PropertyBlock {
    [key: string]: {
        type: ShaderPropType;
        location: WebGLUniformLocation;
    };
}
export declare class Material {
    [key: string]: any;
    shader: Shader;
    propertyBlock: PropertyBlock;
    constructor(shader: Shader, gl?: WebGL2RenderingContext);
    setup(gl: WebGL2RenderingContext): void;
}
export declare function shaderProp(name: string, type: ShaderPropType): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function MaterialFromShader(shader: Shader): typeof MaterialType;
export {};
