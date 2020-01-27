import { quat as glQuat } from "gl-matrix";
export declare type quat = glQuat;
export declare function Quaternion(): glQuat;
export declare namespace Quaternion {
    var identity: () => glQuat;
    var axis: (axis: import("./vec3").Vector3, rad: number) => glQuat;
    var mul: (a: glQuat, b: glQuat) => glQuat;
    var invert: (q: glQuat) => glQuat;
    var normalize: (q: glQuat) => glQuat;
}
export declare const quat: typeof Quaternion;
