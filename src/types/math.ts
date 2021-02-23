import { Vector3, vec3 } from "./vec3";
import { vec4, Vector, Vector4 } from "./vec4";
import { vec2, Vector2 } from "./vec2";

type vec = number | vec2 | vec3 | vec4;

type Larger<U extends vec, V extends vec> =
    U extends vec4 ? vec4 :
    V extends vec4 ? vec4 :
    U extends vec3 ? vec3 :
    V extends vec3 ? vec3 :
    U extends vec2 ? vec2 :
    V extends vec2 ? vec2 :
    number;

type ArithmeticType<U extends vec, V extends vec> = Larger<U, V> & Vector;

(Number as any).prototype.__to = function (type: Function)
{
    switch (type)
    {
        case Vector4:
            return vec4(this.valueOf(), this.valueOf(), this.valueOf(), this.valueOf());
        case Vector3:
            return vec3(this.valueOf(), this.valueOf(), this.valueOf());
        case Vector2:
            return vec2(this.valueOf(), this.valueOf());
    }
    return this.valueOf();
}

function arithOrder<U extends vec, V extends vec>(a: U, b: V)  : [any, any, boolean]
{
    if (typeof (a) === "number")
        return [b, a, true];
    else if (typeof (b) === "number")
        return [a, b, false];
    return ((b as number[]).length > (a as number[]).length ? [b, a, true] : [a, b, false]);
}


export function plus<U extends vec, V extends vec>(a: U, b: V) : ArithmeticType<U, V>
{
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.__to(lhs.constructor).plus(lhs);
}
export function minus<U extends vec, V extends vec>(a: U, b: V): ArithmeticType<U, V>
{
    const [lhs, rhs, invert] = arithOrder(a, b);
    return invert
        ? rhs.__to(lhs.constructor).minus(lhs)
        : rhs.__to(lhs.constructor).minus(lhs).negate();
}

export function mul<U extends vec, V extends vec>(a: U , b: V): ArithmeticType<U, V>
{
    const [lhs, rhs] = arithOrder(a, b);
    return rhs.__to(lhs.constructor).mul(lhs);
}
export function div<U extends vec, V extends vec>(a: U, b: V): ArithmeticType<U, V>
{
    const [lhs, rhs, invert] = arithOrder(a, b);
    return invert
        ? rhs.__to(lhs.constructor).div(lhs)
        : rhs.__to(lhs.constructor).div(lhs).inversed;
}

export function dot(a: vec3, b: vec3): number
{
    return a.dot(b);
}
export function cross(a: vec3, b: vec3)
{
    return a.cross(b);
}

export function distance<V extends vec>(a: V, b: V): number
{
    return minus(b, a).magnitude;
}


export const Deg2Rad = Math.PI / 180;
export const Rad2Deg = 180 / Math.PI;