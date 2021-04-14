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
    plus(v: Readonly<vec3>): this;
    minus(v: Readonly<vec3>): this;
    mul(v: Readonly<vec3>): this;
    div(v: Readonly<vec3>): this;
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
    clone(out?: Vector3): vec3;
    toVec2(): Vector2;
    equals(v: any): boolean;
    static math<F extends (...args: number[]) => number>(func: F): (...args: VecMathArgs<Parameters<F>, Vector3>) => Vector3;
    __to(type: Function): Vector3 | Vector2 | Vector4;
}
export declare function vec3(x: number): Vector3;
export declare namespace vec3 {
    var from: (src: Iterable<number>) => Vector3;
    var floor: (v: Vector3) => Vector3;
    var zero: typeof Vector3.zero;
    var one: typeof Vector3.one;
    var math: typeof Vector3.math;
}
export declare function vec3(x: number, y: number, z: number): Vector3;
export declare namespace vec3 {
    var from: (src: Iterable<number>) => Vector3;
    var floor: (v: Vector3) => Vector3;
    var zero: typeof Vector3.zero;
    var one: typeof Vector3.one;
    var math: typeof Vector3.math;
}
export {};
