import { GLContext } from "./global";
import { Shader } from "./shader";
export declare type BufferElementView<T extends BufferStructure> = {
    [key in keyof T]: Float32Array;
};
declare type BufferElementType = "float" | "vec2" | "vec3" | "vec4" | "mat4";
export interface BufferStructure {
    [key: string]: BufferElementType;
}
export declare class RenderBuffer<T extends BufferStructure> extends Array<BufferElementView<T>> {
    static: boolean;
    private structure;
    private byteSize;
    private elementByteSize;
    private elementSize;
    private buffer;
    private dirty;
    private ctx;
    private initialized;
    protected glBuf: WebGLBuffer;
    constructor(structure: T & BufferStructure, items: number, ctx?: GLContext);
    private tryInit;
    resize(length: number, keepContent?: boolean): void;
    markDirty(): void;
    upload(force?: boolean): boolean;
    bindInstanceDraw(shader: Shader): void;
    cleanupInstanceDraw(shader: Shader): void;
}
export {};
