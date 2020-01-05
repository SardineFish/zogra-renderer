import { quat as glQuat } from "gl-matrix";
export declare type quat = glQuat;
export declare function Quaternion(): glQuat;
export declare namespace Quaternion {
    var identity: () => glQuat;
    var axis: (axis: import("./vec3").Vector3, rad: number) => void;
}
export declare const quat: typeof Quaternion;
