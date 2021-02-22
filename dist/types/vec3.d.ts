import { Vector4 } from "./vec4";
import { Vector2 } from "./vec2";
export declare type vec3 = Vector3;
declare const V3Constructor: new (...p: [number, number, number]) => [number, number, number];
export declare class Vector3 extends V3Constructor {
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
    plus(v: Vector3): this;
    minus(v: Vector3): this;
    mul(v: Vector3): this;
    div(v: Vector3): this;
    dot(v: Vector3): number;
    normalize(): Vector3;
    inverse(): this;
    negate(): this;
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Vector3): Vector3;
    clone(): Vector3;
    toVec2(): Vector2;
    __to(type: Function): Vector3 | Vector2 | Vector4;
}
export declare function vec3(x: number): Vector3;
export declare namespace vec3 {
    var from: (src: Iterable<number>) => Vector3;
    var zero: typeof Vector3.zero;
    var one: typeof Vector3.one;
}
export declare function vec3(x: number, y: number, z: number): Vector3;
export declare namespace vec3 {
    var from: (src: Iterable<number>) => Vector3;
    var zero: typeof Vector3.zero;
    var one: typeof Vector3.one;
}
export {};
