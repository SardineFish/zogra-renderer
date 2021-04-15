import { GLContext } from "./global";
import { AttributeLocations } from "./shader";
export declare type BufferElementView<T extends BufferStructure> = {
    [key in keyof T]: Float32Array;
};
declare type BufferElementType = "float" | "vec2" | "vec3" | "vec4" | "mat4";
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
export declare class RenderBuffer<T extends BufferStructure> extends Array<BufferElementView<T>> {
    static: boolean;
    instancing: boolean;
    private structure;
    private buffer;
    private dirty;
    private ctx;
    private initialized;
    protected glBuf: WebGLBuffer;
    get byteLength(): number;
    constructor(structure: T & BufferStructure, items: number, ctx?: GLContext);
    resize(length: number, keepContent?: boolean): void;
    markDirty(): void;
    upload(force?: boolean): boolean;
    bind(): void;
    bindVertexArray(attributes?: AttributeLocations<T>): void;
    unbindVertexArray(attributes?: AttributeLocations<T>): void;
    unbind(): void;
    private tryInit;
}
export {};
