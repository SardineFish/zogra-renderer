import { ZograMatrix } from "./generic";
export declare type quat = Quaternion;
declare const V4Constructor: new (...p: [number, number, number, number]) => [number, number, number, number];
export declare class Quaternion extends V4Constructor implements ZograMatrix {
    static create(): Quaternion;
    asMut(): this;
    equals(v: any): boolean;
    clone(out?: Quaternion): Quaternion;
    set(value: Readonly<Quaternion>): this;
    set(value: Readonly<ArrayLike<number>>): this;
    fill(value: number): this;
}
export declare function quat(v?: number): Quaternion;
export declare namespace quat {
    var create: () => Quaternion;
    var identity: {
        (): Quaternion;
        (out: Quaternion): Quaternion;
        (out: ArrayLike<number>): ArrayLike<number>;
        (): ArrayLike<number>;
    };
    var axisAngle: {
        (args_0: Readonly<import("./vec3").Vector3>, args_1: number): Quaternion;
        (out: Quaternion, args_0: Readonly<import("./vec3").Vector3>, args_1: number): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: number): ArrayLike<number>;
    };
    var mul: {
        (args_0: Readonly<Quaternion>, args_1: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>, args_1: Readonly<Quaternion>): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var invert: {
        (args_0: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var normalize: {
        (args_0: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var euler: {
        (args_0: Readonly<Quaternion>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Quaternion>): import("./vec3").Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var fromEuler: {
        (args_0: Readonly<import("./vec3").Vector3>): Quaternion;
        (out: Quaternion, args_0: Readonly<import("./vec3").Vector3>): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var rotate: {
        (args_0: Readonly<Quaternion>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Quaternion>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var equals: (a: any, b: any) => boolean;
}
export declare function quat(x: number, y: number, z: number, w: number): Quaternion;
export declare namespace quat {
    var create: () => Quaternion;
    var identity: {
        (): Quaternion;
        (out: Quaternion): Quaternion;
        (out: ArrayLike<number>): ArrayLike<number>;
        (): ArrayLike<number>;
    };
    var axisAngle: {
        (args_0: Readonly<import("./vec3").Vector3>, args_1: number): Quaternion;
        (out: Quaternion, args_0: Readonly<import("./vec3").Vector3>, args_1: number): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: number): ArrayLike<number>;
    };
    var mul: {
        (args_0: Readonly<Quaternion>, args_1: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>, args_1: Readonly<Quaternion>): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var invert: {
        (args_0: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var normalize: {
        (args_0: Readonly<Quaternion>): Quaternion;
        (out: Quaternion, args_0: Readonly<Quaternion>): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var euler: {
        (args_0: Readonly<Quaternion>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Quaternion>): import("./vec3").Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var fromEuler: {
        (args_0: Readonly<import("./vec3").Vector3>): Quaternion;
        (out: Quaternion, args_0: Readonly<import("./vec3").Vector3>): Quaternion;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var rotate: {
        (args_0: Readonly<Quaternion>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: import("./vec3").Vector3, args_0: Readonly<Quaternion>, args_1: Readonly<import("./vec3").Vector3>): import("./vec3").Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
        (args_0: ArrayLike<number>, args_1: ArrayLike<number>): ArrayLike<number>;
    };
    var equals: (a: any, b: any) => boolean;
}
export {};
