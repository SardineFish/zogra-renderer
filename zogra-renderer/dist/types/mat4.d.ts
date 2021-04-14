import { quat as glQuat } from "gl-matrix";
import { ZograMatrix } from "./generic";
export declare type mat4 = Matrix4x4;
declare type Mat4Tuple = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
declare const Mat4Constructor: new (...p: Mat4Tuple) => Mat4Tuple;
export declare class Matrix4x4 extends Mat4Constructor implements ZograMatrix {
    constructor(p_0?: number, p_1?: number, p_2?: number, p_3?: number, p_4?: number, p_5?: number, p_6?: number, p_7?: number, p_8?: number, p_9?: number, p_10?: number, p_11?: number, p_12?: number, p_13?: number, p_14?: number, p_15?: number);
    static create(): Matrix4x4;
    set(v: Readonly<mat4>): this;
    set(v: Readonly<number[]>): this;
    setAll(n: number): this;
    clone(out?: mat4): Matrix4x4;
    equals(other: any): boolean;
}
export declare function mat4(p_0?: number, p_1?: number, p_2?: number, p_3?: number, p_4?: number, p_5?: number, p_6?: number, p_7?: number, p_8?: number, p_9?: number, p_10?: number, p_11?: number, p_12?: number, p_13?: number, p_14?: number, p_15?: number): Matrix4x4;
export declare namespace mat4 {
    var create: typeof Matrix4x4.create;
    var identity: {
        (): Matrix4x4;
        (out: Matrix4x4): Matrix4x4;
    };
    var rts: {
        (args_0: Readonly<glQuat>, args_1: Readonly<import("./vec3").Vector3>, args_2: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<glQuat>, args_1: Readonly<import("./vec3").Vector3>, args_2: Readonly<import("./vec3").Vector3>): Matrix4x4;
    };
    var translate: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): Matrix4x4;
    };
    var invert: {
        (args_0: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>): Matrix4x4;
    };
    var getTranslation: {
        (args_0: Readonly<Matrix4x4>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Matrix4x4>): import("./vec3").Vector3;
    };
    var getRotation: {
        (args_0: Readonly<Matrix4x4>): glQuat;
        (out: glQuat, args_0: Readonly<Matrix4x4>): glQuat;
    };
    var getScaling: {
        (args_0: Readonly<Matrix4x4>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Matrix4x4>): import("./vec3").Vector3;
    };
    var mulVec4: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec4").Vector4>): import("./vec4").Vector4;
        (out: import("./vec4").Vector4, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec4").Vector4>): import("./vec4").Vector4;
    };
    var perspective: {
        (args_0: number, args_1: number, args_2: number, args_3: number): Matrix4x4;
        (out: Matrix4x4, args_0: number, args_1: number, args_2: number, args_3: number): Matrix4x4;
    };
    var transpose: {
        (args_0: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>): Matrix4x4;
    };
    var rotate: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>, args_2: number): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>, args_2: number): Matrix4x4;
    };
    var scale: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): Matrix4x4;
    };
    var fromTranslation: {
        (args_0: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<import("./vec3").Vector3>): Matrix4x4;
    };
    var fromRotation: {
        (args_0: Readonly<glQuat>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<glQuat>): Matrix4x4;
    };
    var fromScaling: {
        (args_0: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<import("./vec3").Vector3>): Matrix4x4;
    };
    var mul: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
    };
    var add: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
    };
    var sub: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
    };
    var plus: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
    };
    var minus: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
    };
    var mulVector: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
    };
    var mulPoint: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
    };
    var ortho: typeof orthogonal;
    var equal: (a: any, b: any) => boolean;
}
declare function orthogonal(height: number, aspect: number, near: number, far: number): mat4;
declare function orthogonal(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4;
export {};
