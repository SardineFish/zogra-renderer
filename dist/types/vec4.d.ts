import { Vector3 } from "./vec3";
import { Vector2 } from "./vec2";
export declare type vec4 = Vector4;
export declare class Vector4 extends Array<number> {
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
    constructor(x: number, y: number, z?: number, w?: number);
    static zero(): Vector4;
    static one(): Vector4;
    plus(v: Vector4): this;
    minus(v: Vector4): this;
    mul(v: Vector4): this;
    div(v: Vector4): this;
    dot(v: Vector4): number;
    normalise(): Vector4;
    clone(): Vector4;
    to(type: Function): Vector3 | Vector4 | Vector2;
}
export declare function vec4(x: number, y: number, z: number, w: number): Vector4;
export declare namespace vec4 {
    var zero: typeof Vector4.zero;
    var one: typeof Vector4.one;
}
