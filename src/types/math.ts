import { Vector3, vec3 } from "./vec3";
import { vec4, Vector4 } from "./vec4";
import { mat4, vec3 as v3, vec4 as v4, vec2 as v2 } from "gl-matrix";
import { vec2, Vector2 } from "./vec2";

type vec = vec2 | vec3 | vec4;

type Larger<U extends vec, V extends vec> =
    U extends vec4 ? vec4 :
    V extends vec4 ? vec4 :
    U extends vec3 ? vec3 :
    V extends vec3 ? vec3 :
    vec2;

type ArithmeticType<U extends vec, V extends vec> = Larger<U, V>

function arithOrder<U extends vec, V extends vec>(a: U, b: V)  : [any, any]
{
    return (b.length > a.length ? [b, a] : [a, b]);
}


export function plus<U extends vec, V extends vec>(a: U, b: V) : ArithmeticType<U, V>
{
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.to(lhs.constructor).plus(lhs);
}
export function minus<U extends vec, V extends vec>(a: U, b: V): ArithmeticType<U, V>
{
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.to(lhs.constructor).minus(lhs);
}

export function mul<U extends vec, V extends vec>(a: U , b: V): ArithmeticType<U, V>
export function mul<V extends vec>(mat: mat4, b: V) : V
export function mul<U extends vec, V extends vec>(a: U | mat4, b: V): ArithmeticType<U, V> | V
{
    if (a instanceof Vector3 || a instanceof Vector4 || a instanceof Vector2)
    {
        const [lhs, rhs] = arithOrder(a, b);
        return rhs.to(lhs.constructor).mul(lhs);
    }
    else
    {
        const out = b.clone() as V;
        switch (b.constructor)
        {
            case Vector2:
                v2.transformMat4(out as any as v2, b, a as any as mat4);
                break;
            case Vector3:
                v3.transformMat4(out as any as v3, b, a as any as mat4);
                break;
            default:
                v4.transformMat4(out as any as v4, b, a as any as mat4);
                break;
        }
        return out;
    }
}
export function div<U extends vec, V extends vec>(a: U, b: V): ArithmeticType<U, V>
{
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.to(lhs.constructor).div(lhs);
}

export function dot(a: vec3, b: vec3)
{
    return a.dot(b);
}
export function cross(a: vec3, b: vec3)
{
    return a.cross(b);
}


export const Deg2Rad = Math.PI / 180;
export const Rad2Deg = 180 / Math.PI;