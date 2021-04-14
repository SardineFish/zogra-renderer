import "reflect-metadata";
import { Texture } from "../core/texture";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { vec4 } from "../types/vec4";
export declare function panicNull<T>(t: T | null, msg?: string): T;
export declare function panic(msg?: string): never;
export declare function warn(msg: string): never;
declare type DecoratorFunc<T> = (value?: T) => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare type MetadataFunc<T, S> = (target: T, propKey?: string) => S | null;
export declare function decorator<T, TargetT = any, S = T>(name: string, defaultValue?: T | undefined, dataWrapper?: (value?: T) => S | T | undefined): [DecoratorFunc<T>, MetadataFunc<TargetT, S>];
export declare function getUniformsLocation<U extends {
    [key: string]: string;
}>(gl: WebGL2RenderingContext, program: WebGLProgram, uniforms: U): {
    [key in keyof U]: WebGLUniformLocation | null;
};
export declare function fillArray<T>(element: (idx: number) => T, count: number): T[];
export declare function fillArray<T>(element: T, count: number): T[];
export declare type ConstructorType<T> = {
    prototype: T;
} & Function;
export declare class DoubleBuffer<T> {
    private currentIdx;
    private buffers;
    get current(): T;
    set current(value: T);
    get back(): T;
    set back(value: T);
    constructor(init: () => T);
    update(): void;
}
export declare function setImmediate(invoker: () => void): void;
export declare function cloneUniformValue<T extends (number | vec2 | vec3 | vec4 | Color | mat4 | Texture | null)>(value: Readonly<T>): T;
export {};
