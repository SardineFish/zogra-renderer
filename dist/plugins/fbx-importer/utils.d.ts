import { vec3, mat4 } from "gl-matrix";
export declare function mulPoint(out: vec3, m: mat4, v: vec3): vec3;
export declare function mulVector(out: vec3, m: mat4, v: vec3): vec3;
export declare function readBlob(blob: Blob): Promise<ArrayBuffer>;
export declare function readString(buffer: ArrayBuffer, offset: number, length: number): string;
export declare function assert<T extends boolean>(result: T, msg: string): void;
