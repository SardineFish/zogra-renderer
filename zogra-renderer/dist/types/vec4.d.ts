import { Vector3 } from "./vec3";
import { Vector2 } from "./vec2";
import { Vector, ZograMatrix } from "./generic";
export declare type vec4 = Vector4;
export declare type VecMathArgs<T, U> = T extends number[] ? {
    [key in keyof T]: U;
} : never;
declare const V4Constructor: new (...p: [number, number, number, number]) => [number, number, number, number];
export declare class Vector4 extends V4Constructor implements Vector, ZograMatrix {
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get z(): number;
    set z(z: number);
    get w(): number;
    set w(w: number);
    get magnitude(): number;
    get normalized(): Vector4;
    get negative(): Vector4;
    get inversed(): Vector4;
    constructor(x: number, y: number, z?: number, w?: number);
    static zero(): Vector4;
    static one(): Vector4;
    asMut(): this;
    plus(v: Readonly<vec4>): this;
    minus(v: Readonly<vec4>): this;
    mul(v: Readonly<vec4>): this;
    div(v: Readonly<vec4>): this;
    dot(v: Readonly<vec4>): number;
    normalize(): Vector4;
    inverse(): this;
    negate(): this;
    clone(out?: vec4): vec4;
    equals(v: any): boolean;
    set(v: Readonly<vec4>): this;
    set(v: Readonly<number[]>): this;
    setAll(n: number): this;
    static math<F extends (...args: number[]) => number>(func: F): (...args: VecMathArgs<Parameters<F>, Vector4>) => Vector4;
    __to(type: Function): Vector2 | Vector3 | Vector4;
}
export declare function vec4(x: number): Vector4;
export declare namespace vec4 {
    var from: (src: Iterable<number>) => Vector4;
    var floor: (v: Vector4) => Vector4;
    var zero: typeof Vector4.zero;
    var one: typeof Vector4.one;
    var math: typeof Vector4.math;
    var plus: {
        (args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
        (out: Vector4, args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
    };
    var minus: {
        (args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
        (out: Vector4, args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
    };
    var mul: {
        (args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
        (out: Vector4, args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
    };
    var div: {
        (args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
        (out: Vector4, args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
    };
}
export declare function vec4(x: number, y: number, z: number, w: number): Vector4;
export declare namespace vec4 {
    var from: (src: Iterable<number>) => Vector4;
    var floor: (v: Vector4) => Vector4;
    var zero: typeof Vector4.zero;
    var one: typeof Vector4.one;
    var math: typeof Vector4.math;
    var plus: {
        (args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
        (out: Vector4, args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
    };
    var minus: {
        (args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
        (out: Vector4, args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
    };
    var mul: {
        (args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
        (out: Vector4, args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
    };
    var div: {
        (args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
        (out: Vector4, args_0: Readonly<Vector4>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector4;
    };
}
export {};
