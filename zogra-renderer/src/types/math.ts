import { Vector3, vec3 } from "./vec3";
import { vec4, Vector, Vector4 } from "./vec4";
import { vec2, Vector2 } from "./vec2";
import { Rect } from "./rect";

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

export function floor2(v: Vector2)
{
    return vec2(Math.floor(v.x), Math.floor(v.y));
}

export function boxRaycast(box: Rect, center: vec2, direction: vec2): [boolean, number, vec2] // [hit, distance, normal]
{
    direction = direction.normalized;
    if (direction.x == 0 && direction.y == 0)
        return [false, 0, vec2.zero()];

    let tMin: vec2 = vec2.zero();
    let tMax: vec2 = vec2.zero();

    if (direction.x == 0)
    {
        tMin.y = (box.yMin - center.y) / direction.y;
        tMax.y = (box.yMax - center.y) / direction.y;
        tMin.x = tMax.x = Number.NEGATIVE_INFINITY;

        if (box.xMin <= center.x && center.x <= box.xMax)
        {
            if (tMin.y < tMax.y)
                return [true, tMin.y, vec2(0, -1)];
            return [true, tMax.y, vec2(0, 1)];
        }
        return [false, 0, vec2.zero()];
    }
    if (direction.y == 0)
    {
        tMin.x = (box.xMin - center.x) / direction.x;
        tMax.x = (box.xMax - center.x) / direction.x;
        tMin.y = tMax.y = Number.NEGATIVE_INFINITY;

        if (box.yMin <= center.y && center.y <= box.yMax)
        {
            if (tMin.x < tMax.x)
                return [true, tMin.x, vec2(-1, 0)];
            return [true, tMax.x, vec2(1, 0)];
        }
        return [false, 0, vec2.zero()];
    }

    tMin = minus(box.min, center).div(direction); // distance to box min lines (X and Y)
    tMax = minus(box.max, center).div(direction); // distance to box max lines (X and Y)

    var minXT = tMin.x; // min distance to vertical line
    var maxXT = tMax.x; // max distance to vertical line
    var minXNormal = vec2(-1, 0); // Vector2.left; // normal of the vertical line which has minimal distance to center
    var minYT = tMin.y;
    var maxYT = tMax.y;
    var minYNormal = vec2(0, -1); // Vector2.down;

    if (tMin.x > tMax.x)
    {
        minXT = tMax.x;
        maxXT = tMin.x;
        minXNormal = vec2(1, 0); // Vector2.right;
    }
    if (tMin.y > tMax.y)
    {
        minYT = tMax.y;
        maxYT = tMin.y;
        minYNormal = vec2(0, 1); // Vector2.up;
    }

    if (minYT > maxXT || minXT > maxYT)
    {
        return [false, 0, vec2.zero()];
    }
    else if (minXT > minYT)
    {
        return [true, minXT, minXNormal];
    }
    return [true, minYT, minYNormal];
}

export const Deg2Rad = Math.PI / 180;
export const Rad2Deg = 180 / Math.PI;