import { quat as glQuat } from "gl-matrix";
export declare type quat = glQuat;
export declare function Quaternion(): import("gl-matrix").mat2;
export declare namespace Quaternion {
    var identity: () => import("gl-matrix").mat2;
    var axis: (axis: import("./vec3").Vector3, rad: number) => import("gl-matrix").mat2;
    var mul: (a: import("gl-matrix").mat2, b: import("gl-matrix").mat2) => import("gl-matrix").mat2;
    var invert: (q: import("gl-matrix").mat2) => import("gl-matrix").mat2;
    var normalize: (q: import("gl-matrix").mat2) => import("gl-matrix").mat2;
    var euler: (q: import("gl-matrix").mat2) => import("./vec3").Vector3;
    var fromEuler: (e: import("./vec3").Vector3) => import("gl-matrix").mat2;
    var rotate: (q: import("gl-matrix").mat2, v: import("./vec3").Vector3) => import("./vec3").Vector3;
}
export declare const quat: typeof Quaternion;
