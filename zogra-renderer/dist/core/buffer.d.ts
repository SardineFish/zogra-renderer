import { mat4 } from "../types/mat4";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { vec4 } from "../types/vec4";
import { GLContext } from "./global";
import { AttributeLocations } from "./shader";
export declare type BufferElementView<T extends BufferStructure> = {
    [key in keyof T]: Float32Array;
};
declare type BufferElementType = "float" | "vec2" | "vec3" | "vec4" | "mat4";
export declare type BufferElementValue<T extends BufferElementType> = T extends "float" ? [number] : T extends "vec2" ? vec2 : T extends "vec3" ? vec3 : T extends "vec4" ? vec4 : T extends "mat4" ? mat4 : never;
export interface BufferStructure {
    [key: string]: BufferElementType;
}
export declare type BufferElementInfo<Structure extends BufferStructure> = {
    key: keyof Structure;
    type: BufferElementType;
    location: number;
    offset: number;
    /** Float length */
    length: number;
    byteOffset: number;
    byteLength: number;
};
export interface BufferStructureInfo<Structure extends BufferStructure> {
    elements: BufferElementInfo<Structure>[];
    /** total count of floats */
    totalSize: number;
    byteSize: number;
}
export declare const BufferStructureInfo: {
    from<T extends BufferStructure>(structure: T): BufferStructureInfo<T>;
};
export declare class ArrayBuffer<T extends BufferStructure> extends Array<BufferElementView<T>> {
    static: boolean;
    Data: BufferElementView<T>;
    private structure;
    private buffer;
    private dirty;
    private ctx;
    private initialized;
    protected glBuf: WebGLBuffer;
    get byteLength(): number;
    constructor(structure: T & BufferStructure, items: number, ctx?: GLContext);
    resize(length: number, keepContent?: boolean): void;
    private swapBuffer;
    swapVertices(a: number, b: number): void;
    markDirty(): void;
    upload(force?: boolean): boolean;
    bind(): void;
    bindVertexArray(instancing?: boolean, attributes?: AttributeLocations<T>): void;
    unbindVertexArray(instancing?: boolean, attributes?: AttributeLocations<T>): void;
    unbind(): void;
    private tryInit;
}
export {};
