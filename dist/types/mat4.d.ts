import { mat4 as glMat4 } from "gl-matrix";
export declare type mat4 = glMat4;
export declare function Matrix4x4(values: number[]): any;
export declare namespace Matrix4x4 {
    var identity: () => any;
    var rts: (rotation: any, translation: import("./vec3").Vector3, scale: import("./vec3").Vector3) => any;
    var translate: (translate: import("./vec3").Vector3) => any;
    var invert: (m: any) => any;
    var getTranslation: (m: any) => import("./vec3").Vector3;
    var getRotation: (m: any) => any;
    var getScaling: (m: any) => import("./vec3").Vector3;
    var mulPoint: (m: any, p: import("./vec3").Vector3) => import("./vec3").Vector3;
    var mulVector: (m: any, v: import("./vec3").Vector3) => import("./vec3").Vector3;
    var mulVec4: (m: any, v: import("./vec4").Vector4) => import("./vec4").Vector4;
    var perspective: (fov: number, aspect: number, near: number, far: number) => any;
    var transpose: (m: any) => any;
    var ortho: typeof orthogonal;
    var rotate: (m: any, axis: import("./vec3").Vector3, rad: number) => any;
    var scale: (m: any, scaling: import("./vec3").Vector3) => any;
    var fromRotation: (axis: import("./vec3").Vector3, rad: number) => any;
    var fromScaling: (scaling: import("./vec3").Vector3) => any;
    var equal: (a: any, b: any) => any;
    var mul: ArithmetricFunction<any>;
}
declare function orthogonal(height: number, aspect: number, near: number, far: number): mat4;
declare function orthogonal(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4;
declare type ArithmetricFunction<T> = {
    (out: T, a: T, b: T): T;
    (a: T, b: T): T;
};
export declare const mat4: typeof Matrix4x4;
export {};
