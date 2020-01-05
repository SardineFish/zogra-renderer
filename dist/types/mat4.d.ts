import { mat4 as glMat4 } from "gl-matrix";
export declare type mat4 = glMat4;
export declare function Matrix4x4(values: number[]): glMat4;
export declare namespace Matrix4x4 {
    var identity: () => glMat4;
}
export declare const mat4: typeof Matrix4x4;
