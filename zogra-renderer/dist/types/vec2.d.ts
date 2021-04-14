import { VecMathArgs, Vector4 } from "./vec4";
import { Vector3 } from "./vec3";
import { Vector, ZograMatrix } from "./generic";
export declare type vec2 = Vector2;
declare const V2Constructor: new (...p: [number, number]) => [number, number];
export declare class Vector2 extends V2Constructor implements Vector, ZograMatrix {
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get magnitude(): number;
    get normalized(): Vector2;
    get negative(): Vector2;
    get inversed(): Vector2;
    constructor(x: number, y: number);
    static zero(): Vector2;
    static one(): Vector2;
    static up(): Vector2;
    static down(): Vector2;
    static left(): Vector2;
    static right(): Vector2;
    static distance(u: Vector2, v: Vector2): number;
    static distanceSquared(u: Vector2, v: Vector2): number;
    static math<F extends (...args: number[]) => number>(func: F): (...args: VecMathArgs<Parameters<F>, Vector2>) => Vector2;
    plus(v: Readonly<Vector2>): this;
    minus(v: Readonly<Vector2>): this;
    mul(v: Readonly<Vector2> | number): this;
    div(v: Readonly<Vector2>): this;
    dot(v: Readonly<Vector2>): number;
    normalize(): Vector2;
    inverse(): this;
    negate(): this;
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Vector2): number;
    equals(v: any): boolean;
    clone(out?: vec2): vec2;
    set(v: Readonly<vec2>): this;
    set(v: Readonly<number[]>): this;
    setAll(n: number): this;
    toVec3(z?: number): Vector3;
    __to(type: Function): Vector2 | Vector3 | Vector4;
}
export declare function vec2(x: number): Vector2;
export declare namespace vec2 {
    var from: (src: Iterable<number>) => Vector2;
    var floor: (v: Vector2) => Vector2;
    var zero: typeof Vector2.zero;
    var one: typeof Vector2.one;
    var left: typeof Vector2.left;
    var right: typeof Vector2.right;
    var down: typeof Vector2.down;
    var up: typeof Vector2.up;
    var math: typeof Vector2.math;
    var plus: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
    };
    var minus: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
    };
    var mul: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
    };
    var div: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
    };
}
export declare function vec2(x: number, y: number): Vector2;
export declare namespace vec2 {
    var from: (src: Iterable<number>) => Vector2;
    var floor: (v: Vector2) => Vector2;
    var zero: typeof Vector2.zero;
    var one: typeof Vector2.one;
    var left: typeof Vector2.left;
    var right: typeof Vector2.right;
    var down: typeof Vector2.down;
    var up: typeof Vector2.up;
    var math: typeof Vector2.math;
    var plus: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
    };
    var minus: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
    };
    var mul: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
    };
    var div: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector3 | Vector4>): Vector2;
    };
}
export {};
