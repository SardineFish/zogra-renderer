import { ZograMatrix } from "./generic";
export declare type mat4 = Matrix4x4;
declare type Mat4Tuple = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
declare const Mat4Constructor: new (...p: Mat4Tuple) => Mat4Tuple;
export declare class Matrix4x4 extends Mat4Constructor implements ZograMatrix {
    constructor(p_0?: number, p_1?: number, p_2?: number, p_3?: number, p_4?: number, p_5?: number, p_6?: number, p_7?: number, p_8?: number, p_9?: number, p_10?: number, p_11?: number, p_12?: number, p_13?: number, p_14?: number, p_15?: number);
    static create(): Matrix4x4;
    asMut(): this;
    set(v: Readonly<mat4>): this;
    set(v: Readonly<ArrayLike<number>>): this;
    fill(n: number): this;
    clone(out?: mat4): Matrix4x4;
    equals(other: any): boolean;
}
export declare function mat4(p_0?: number, p_1?: number, p_2?: number, p_3?: number, p_4?: number, p_5?: number, p_6?: number, p_7?: number, p_8?: number, p_9?: number, p_10?: number, p_11?: number, p_12?: number, p_13?: number, p_14?: number, p_15?: number): Matrix4x4;
export declare namespace mat4 {
    var create: typeof Matrix4x4.create;
    var identity: {
        (): Matrix4x4;
        (out: Matrix4x4): Matrix4x4;
        (out: ArrayLike<number>): ArrayLike<number>;
        (): ArrayLike<number>;
    };
    var rts: {
        (args_0: Readonly<import("./quat").Quaternion>, args_1: Readonly<import("./vec3").Vector3>, args_2: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<import("./quat").Quaternion>, args_1: Readonly<import("./vec3").Vector3>, args_2: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>, args_2: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>, args_2: ArrayLike<number>): ArrayLike<number>;
    };
    var translate: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var invert: {
        (args_0: Readonly<Matrix4x4>): Matrix4x4 | null;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>): Matrix4x4 | null;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number> | null;
        (args_0: ArrayLike<number>): ArrayLike<number> | null;
    };
    var getTranslation: {
        (args_0: Readonly<Matrix4x4>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Matrix4x4>): import("./vec3").Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var getRotation: {
        (args_0: Readonly<Matrix4x4>): import("./quat").Quaternion;
        (out: import("./quat").Quaternion, args_0: Readonly<Matrix4x4>): import("./quat").Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var getScaling: {
        (args_0: Readonly<Matrix4x4>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Matrix4x4>): import("./vec3").Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var mulVec4: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec4").Vector4>): import("./vec4").Vector4;
        (out: import("./vec4").Vector4, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec4").Vector4>): import("./vec4").Vector4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var perspective: {
        (args_0: number, args_1: number, args_2: number, args_3: number): Matrix4x4;
        (out: Matrix4x4, args_0: number, args_1: number, args_2: number, args_3: number): Matrix4x4;
        (out: ArrayLike<number>, args_0: number, args_1: number, args_2: number, args_3: number): ArrayLike<number>;
        (args_0: number, args_1: number, args_2: number, args_3: number): ArrayLike<number>;
    };
    var transpose: {
        (args_0: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var rotate: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>, args_2: number): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>, args_2: number): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>, args_2: number): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>, args_2: number): ArrayLike<number>;
    };
    var scale: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var fromTranslation: {
        (args_0: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var fromRotation: {
        (args_0: Readonly<import("./quat").Quaternion>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<import("./quat").Quaternion>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var fromScaling: {
        (args_0: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<import("./vec3").Vector3>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var mul: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var add: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var sub: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var plus: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var minus: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>, args_1: Readonly<Matrix4x4>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var mulVector: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var mulPoint: {
        (args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Matrix4x4>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var ortho: typeof orthogonal;
    var equal: (a: any, b: any) => boolean;
    var set: {
        (args_0: Readonly<Matrix4x4>): Matrix4x4;
        (out: Matrix4x4, args_0: Readonly<Matrix4x4>): Matrix4x4;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var fill: {
        (args_0: number): Matrix4x4;
        (out: Matrix4x4, args_0: number): Matrix4x4;
        (out: ArrayLike<number>, args_0: number): ArrayLike<number>;
        (args_0: number): ArrayLike<number>;
    };
}
declare function orthogonal(height: number, aspect: number, near: number, far: number): mat4;
declare function orthogonal(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4;
export {};
