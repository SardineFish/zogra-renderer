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
    get magnitudeSqr(): number;
    get normalized(): Vector2;
    get negative(): Vector2;
    get inversed(): Vector2;
    get isZero(): boolean;
    constructor(x: number, y: number);
    static zero(): Vector2;
    static one(): Vector2;
    static up(): Vector2;
    static down(): Vector2;
    static left(): Vector2;
    static right(): Vector2;
    static distance(u: Vector2, v: Vector2): number;
    static distanceSquared(u: Vector2, v: Vector2): number;
    static math<F extends (...args: number[]) => number>(func: F): (...args: VecMathArgs<Parameters<F>, Readonly<vec2>>) => vec2;
    asMut(): this;
    plus(v: Readonly<Vector2> | number): Vector2;
    minus(v: Readonly<Vector2> | number): Vector2;
    mul(v: Readonly<Vector2> | number): Vector2;
    div(v: Readonly<Vector2> | number): Vector2;
    dot(v: Readonly<Vector2>): number;
    normalize(): Vector2;
    inverse(): this;
    negate(): this;
    equals(v: any): boolean;
    clone(out?: vec2): vec2;
    set(v: Readonly<vec2>): this;
    set(v: Readonly<ArrayLike<number>>): this;
    fill(n: number): this;
    toVec3(z?: number): Vector3;
    __to(type: Function): Vector2 | Vector4 | Vector3;
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
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
    };
    var minus: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
    };
    var mul: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
    };
    var div: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
    };
    var dot: (a: ArrayLike<number> | Vector2, b: ArrayLike<number> | Vector2) => number;
    var cross: (a: ArrayLike<number> | Vector2, b: ArrayLike<number> | Vector2) => number;
    var normalize: {
        (args_0: Readonly<Vector2>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>): Vector2;
    };
    var perpendicular: {
        (args_0: Readonly<Vector2>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>): Vector2;
    };
    var set: {
        (args_0: Readonly<Vector2>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>): Vector2;
    };
    var fill: {
        (args_0: number): Vector2;
        (out: Vector2, args_0: number): Vector2;
        (out: ArrayLike<number>, args_0: number): ArrayLike<number>;
        (out: Vector2, args_0: number): Vector2;
        (args_0: number): Vector2;
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
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
    };
    var minus: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
    };
    var mul: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
    };
    var div: {
        (args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>, args_1: Readonly<number | Vector2 | Vector4 | Vector3>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector2;
    };
    var dot: (a: ArrayLike<number> | Vector2, b: ArrayLike<number> | Vector2) => number;
    var cross: (a: ArrayLike<number> | Vector2, b: ArrayLike<number> | Vector2) => number;
    var normalize: {
        (args_0: Readonly<Vector2>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>): Vector2;
    };
    var perpendicular: {
        (args_0: Readonly<Vector2>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>): Vector2;
    };
    var set: {
        (args_0: Readonly<Vector2>): Vector2;
        (out: Vector2, args_0: Readonly<Vector2>): Vector2;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
        (out: Vector2, args_0: ArrayLike<number>): Vector2;
        (args_0: ArrayLike<number>): Vector2;
    };
    var fill: {
        (args_0: number): Vector2;
        (out: Vector2, args_0: number): Vector2;
        (out: ArrayLike<number>, args_0: number): ArrayLike<number>;
        (out: Vector2, args_0: number): Vector2;
        (args_0: number): Vector2;
    };
}
export {};
