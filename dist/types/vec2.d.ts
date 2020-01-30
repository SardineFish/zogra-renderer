import { Vector4 } from "./vec4";
import { Vector3 } from "./vec3";
export declare type vec2 = Vector2;
export declare class Vector2 extends Array<number> {
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get magnitude(): number;
    get normalized(): Vector2;
    constructor(x: number, y: number);
    static zero(): Vector2;
    static one(): Vector2;
    plus(v: Vector2): this;
    minus(v: Vector2): this;
    mul(v: Vector2): this;
    div(v: Vector2): this;
    dot(v: Vector2): number;
    normalize(): Vector2;
    inverse(): this;
    negate(): this;
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Vector2): number;
    clone(): Vector2;
    __to(type: Function): Vector3 | Vector4 | Vector2;
}
export declare function vec2(x: number): Vector2;
export declare namespace vec2 {
    var from: (src: Iterable<number>) => Vector2;
    var zero: typeof Vector2.zero;
    var one: typeof Vector2.one;
}
export declare function vec2(x: number, y: number): Vector2;
export declare namespace vec2 {
    var from: (src: Iterable<number>) => Vector2;
    var zero: typeof Vector2.zero;
    var one: typeof Vector2.one;
}
