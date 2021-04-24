import { VecMathArgs, Vector4 } from "./vec4";
import { Vector2 } from "./vec2";
import { Vector, ZograMatrix } from "./generic";
export declare type vec3 = Vector3;
declare const V3Constructor: new (...p: [number, number, number]) => [number, number, number];
export declare class Vector3 extends V3Constructor implements Vector, ZograMatrix {
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get z(): number;
    set z(z: number);
    get magnitude(): number;
    get normalized(): Vector3;
    get negative(): Vector3;
    get inversed(): Vector3;
    constructor(x: number, y: number, z: number);
    static zero(): Vector3;
    static one(): Vector3;
    asMut(): this;
    plus(v: Readonly<vec3> | number): Vector3;
    minus(v: Readonly<vec3> | number): Vector3;
    mul(v: Readonly<vec3> | number): Vector3;
    div(v: Readonly<vec3> | number): Vector3;
    dot(v: Readonly<vec3>): number;
    normalize(): Vector3;
    inverse(): this;
    negate(): this;
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Readonly<vec3>): Vector3;
    set(v: Readonly<vec3>): this;
    set(v: Readonly<ArrayLike<number>>): this;
    fill(n: number): this;
    clone(out?: Vector3): vec3;
    setX(x: number): this;
    setY(y: number): this;
    setZ(z: number): this;
    toVec2(): Vector2;
    equals(v: any): boolean;
    static math<F extends (...args: number[]) => number>(func: F): (...args: VecMathArgs<Parameters<F>, Readonly<vec3>>) => vec3;
    static mathNonAlloc<F extends (...args: number[]) => number>(func: F, out: vec3, ...args: VecMathArgs<Parameters<F>, Readonly<vec3>>): vec3;
    __to(type: Function): Vector3 | Vector4 | Vector2;
}
export declare function vec3(x: number): Vector3;
export declare namespace vec3 {
    var from: (src: Iterable<number>) => Vector3;
    var zero: typeof Vector3.zero;
    var one: typeof Vector3.one;
    var math: typeof Vector3.math;
    var normalize: {
        (args_0: Readonly<Vector3>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var plus: {
        (args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
    };
    var minus: {
        (args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
    };
    var mul: {
        (args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
    };
    var div: {
        (args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
    };
    var set: {
        (args_0: Readonly<Vector3>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var fill: {
        (args_0: number): Vector3;
        (out: Vector3, args_0: number): Vector3;
        (out: Vector3, args_0: number): Vector3;
        (args_0: number): Vector3;
        (out: ArrayLike<number>, args_0: number): ArrayLike<number>;
    };
}
export declare function vec3(x: number, y: number, z: number): Vector3;
export declare namespace vec3 {
    var from: (src: Iterable<number>) => Vector3;
    var zero: typeof Vector3.zero;
    var one: typeof Vector3.one;
    var math: typeof Vector3.math;
    var normalize: {
        (args_0: Readonly<Vector3>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var plus: {
        (args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
    };
    var minus: {
        (args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
    };
    var mul: {
        (args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
    };
    var div: {
        (args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>, args_1: Readonly<number | Vector3 | Vector4 | Vector2>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>, args_1: number | ArrayLike<number>): ArrayLike<number>;
    };
    var set: {
        (args_0: Readonly<Vector3>): Vector3;
        (out: Vector3, args_0: Readonly<Vector3>): Vector3;
        (out: Vector3, args_0: ArrayLike<number>): Vector3;
        (args_0: ArrayLike<number>): Vector3;
        (out: ArrayLike<number>, args_0: ArrayLike<number>): ArrayLike<number>;
    };
    var fill: {
        (args_0: number): Vector3;
        (out: Vector3, args_0: number): Vector3;
        (out: Vector3, args_0: number): Vector3;
        (args_0: number): Vector3;
        (out: ArrayLike<number>, args_0: number): ArrayLike<number>;
    };
}
export {};
