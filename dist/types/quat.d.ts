import { quat as glQuat } from "gl-matrix";
export declare type quat = glQuat;
export declare function Quaternion(): any;
export declare namespace Quaternion {
    var identity: () => any;
    var axis: (axis: import("./vec3").Vector3, rad: number) => any;
    var mul: (a: any, b: any) => any;
    var invert: (q: any) => any;
    var normalize: (q: any) => any;
    var euler: (q: any) => import("./vec3").Vector3;
    var fromEuler: (e: import("./vec3").Vector3) => any;
    var rotate: (q: any, v: import("./vec3").Vector3) => import("./vec3").Vector3;
    var equals: (a: any, b: any) => any;
}
export declare const quat: typeof Quaternion;
