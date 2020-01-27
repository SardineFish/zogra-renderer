import { Shader } from "./shader";
import "reflect-metadata";
import { MaterialType } from "./material-type";
import "reflect-metadata";
import { BindingData, UniformValueType } from "./types";
import { UniformType } from "./types";
export interface PropertyBlock {
    [key: string]: {
        type: UniformType;
        location: WebGLUniformLocation;
    };
}
export declare class Material {
    [key: string]: any;
    shader: Shader;
    propertyBlock: PropertyBlock;
    gl: WebGL2RenderingContext;
    constructor(shader: Shader, gl?: WebGL2RenderingContext);
    setup(data: BindingData): void;
    setProp<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void;
}
export declare function shaderProp(name: string, type: UniformType): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function MaterialFromShader(shader: Shader): typeof MaterialType;
export declare function materialDefine<T extends {
    new (...arg: any[]): {};
}>(constructor: T): T;
