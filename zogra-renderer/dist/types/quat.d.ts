import { ZograMatrix } from "./generic";
export declare type quat = Quaternion;
declare const V4Constructor: new (...p: [number, number, number, number]) => [number, number, number, number];
export declare class Quaternion extends V4Constructor implements ZograMatrix {
    static create(): Quaternion;
    equals(v: any): boolean;
    clone(out?: Quaternion): Quaternion;
    set(value: Readonly<Quaternion>): this;
    set(value: Readonly<number[]>): this;
    setAll(value: number): this;
}
export declare function quat(v?: number): Quaternion;
export declare namespace quat {
    var create: () => Quaternion;
    var identity: {
        (): Quaternion;
        (out: Quaternion): Quaternion;
    };
    var axisAngle: {
        (args_0: Readonly<import("./vec3").Vector3>, args_1: number): Quaternion;
        (out: Quaternion, args_0: Readonly<import("./vec3").Vector3>, args_1: number): Quaternion;
    };
    var mul: {
        (args_0: Readonly<Quaternion>, args_1: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>, args_1: Readonly<Quaternion>): Quaternion;
    };
    var invert: {
        (args_0: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>): Quaternion;
    };
    var normalize: {
        (args_0: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>): Quaternion;
    };
    var euler: {
        (args_0: Readonly<Quaternion>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Quaternion>): import("./vec3").Vector3;
    };
    var fromEuler: {
        (args_0: Readonly<import("./vec3").Vector3>): Quaternion;
        (out: Quaternion, args_0: Readonly<import("./vec3").Vector3>): Quaternion;
    };
    var rotate: {
        (args_0: Readonly<Quaternion>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Quaternion>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
    };
    var equals: (a: any, b: any) => boolean;
}
export declare function quat(x: number, y: number, z: number, w: number): Quaternion;
export declare namespace quat {
    var create: () => Quaternion;
    var identity: {
        (): Quaternion;
        (out: Quaternion): Quaternion;
    };
    var axisAngle: {
        (args_0: Readonly<import("./vec3").Vector3>, args_1: number): Quaternion;
        (out: Quaternion, args_0: Readonly<import("./vec3").Vector3>, args_1: number): Quaternion;
    };
    var mul: {
        (args_0: Readonly<Quaternion>, args_1: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>, args_1: Readonly<Quaternion>): Quaternion;
    };
    var invert: {
        (args_0: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>): Quaternion;
    };
    var normalize: {
        (args_0: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>): Quaternion;
    };
    var euler: {
        (args_0: Readonly<Quaternion>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Quaternion>): import("./vec3").Vector3;
    };
    var fromEuler: {
        (args_0: Readonly<import("./vec3").Vector3>): Quaternion;
        (out: Quaternion, args_0: Readonly<import("./vec3").Vector3>): Quaternion;
    };
    var rotate: {
        (args_0: Readonly<Quaternion>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Quaternion>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
    };
    var equals: (a: any, b: any) => boolean;
}
export {};
