import { Vector4 } from "./vec4";
import { Vector2 } from "./vec2";
export declare type vec3 = Vector3;
export declare class Vector3 extends Array<number> {
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get z(): number;
    set z(z: number);
    get magnitude(): number;
    get normalized(): Vector3;
    constructor(x: number, y: number, z: number);
    static zero(): Vector3;
    static one(): Vector3;
    plus(v: Vector3): this;
    minus(v: Vector3): this;
    mul(v: Vector3): this;
    div(v: Vector3): this;
    dot(v: Vector3): number;
    normalise(): Vector3;
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Vector3): Vector3;
    clone(): Vector3;
    to(type: Function): Vector3 | Vector4 | Vector2;
}
export declare function vec3(x: number, y: number, z: number): Vector3;
export declare namespace vec3 {
    var zero: typeof Vector3.zero;
    var one: typeof Vector3.one;
}
