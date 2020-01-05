import { mat4 as glMat4 } from "gl-matrix";
export declare type mat4 = glMat4;
export declare function Matrix4x4(values: number[]): glMat4;
export declare namespace Matrix4x4 {
    var identity: () => glMat4;
    var rts: (rotation: import("gl-matrix").quat, translation: import("./vec3").Vector3, scale: import("./vec3").Vector3) => glMat4;
    var mul: ArithmetricFunction<glMat4>;
}
declare type ArithmetricFunction<T> = {
    (out: T, a: T, b: T): T;
    (a: T, b: T): T;
};
export declare const mat4: typeof Matrix4x4;
export {};
