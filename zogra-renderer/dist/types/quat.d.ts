import { quat as glQuat } from "gl-matrix";
export declare type quat = glQuat;
export declare function Quaternion(): glQuat;
export declare namespace Quaternion {
    var identity: () => glQuat;
    var axis: (axis: import("./vec3").Vector3, rad: number) => glQuat;
    var mul: (a: Readonly<glQuat>, b: Readonly<glQuat>) => glQuat;
    var invert: (q: Readonly<glQuat>) => glQuat;
    var normalize: (q: Readonly<glQuat>) => import("gl-matrix").vec4;
    var euler: (q: glQuat) => import("./vec3").Vector3;
    var fromEuler: (e: import("./vec3").Vector3) => glQuat;
    var rotate: (q: glQuat, v: import("./vec3").Vector3) => import("./vec3").Vector3;
    var equals: (a: any, b: any) => boolean;
}
export declare const quat: typeof Quaternion;
