import { Shader } from "./shader";
import "reflect-metadata";
import { MaterialType } from "./material-type";
import "reflect-metadata";
import { BindingData, UniformValueType } from "./types";
import { UniformType } from "./types";
import { Asset } from "./asset";
export interface PropertyBlock {
    [key: string]: {
        type: UniformType;
        location: WebGLUniformLocation;
        name: string;
    };
}
export declare class Material extends Asset {
    [key: string]: any;
    private _shader;
    propertyBlock: PropertyBlock;
    gl: WebGL2RenderingContext;
    constructor(shader: Shader, gl?: WebGL2RenderingContext);
    get shader(): Shader;
    set shader(value: Shader);
    setup(data: BindingData): void;
    setProp<T extends UniformType>(key: string, uniformName: string, type: T, value: UniformValueType<T>): void;
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
