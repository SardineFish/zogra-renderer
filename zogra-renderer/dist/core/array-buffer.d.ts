import { mat4 } from "../types/mat4";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
import { vec4 } from "../types/vec4";
import { IAsset } from "./asset";
import { GLContext } from "./global";
import { AttributeLocations } from "./shader";
declare type IntTypes = "int" | "ivec2" | "ivec3" | "ivec4";
declare type FloatTypes = "float" | "vec2" | "vec3" | "vec4" | "mat4";
declare type BufferElementType = IntTypes | FloatTypes;
declare type BufferElementViewType<T extends BufferElementType> = T extends IntTypes ? Int32Array : T extends FloatTypes ? Float32Array : never;
export declare type BufferElementView<T extends BufferStructure> = {
    [key in keyof T]: BufferElementViewType<T[key]>;
};
export declare type BufferElementValue<T extends BufferElementType> = T extends "float" ? [number] : T extends "vec2" ? vec2 : T extends "vec3" ? vec3 : T extends "vec4" ? vec4 : T extends "mat4" ? mat4 : never;
export interface BufferStructure {
    [key: string]: BufferElementType;
}
export declare function BufferStructure<T extends BufferStructure>(structure: T): T;
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
export declare class GLArrayBuffer<T extends BufferStructure> extends Array<BufferElementView<T>> implements IAsset {
    static: boolean;
    Data: BufferElementView<T>;
    private structure;
    private innerBuffer;
    private dirty;
    private ctx;
    private initialized;
    private destroyed;
    assetID: number;
    name: string;
    protected glBuf: WebGLBuffer;
    get byteLength(): number;
    constructor(structure: T & BufferStructure, items: number, createElementView?: boolean, ctx?: GLContext);
    resize(length: number, keepContent?: boolean, createElementView?: boolean): void;
    copyFrom(source: GLArrayBuffer<T>, selfElementOffset?: number, sourceElementOffset?: number, sourceElementLength?: number): void;
    private swapBuffer;
    swapVertices(a: number, b: number): void;
    markDirty(): void;
    upload(force?: boolean): boolean;
    bind(): void;
    bindVertexArray<K extends keyof T>(instancing?: boolean, attributes?: AttributeLocations<Pick<T, K>>): void;
    unbindVertexArray<K extends keyof T>(instancing?: boolean, attributes?: AttributeLocations<Pick<T, K>>): void;
    unbind(): void;
    destroy(): void;
    private tryInit;
}
export {};
