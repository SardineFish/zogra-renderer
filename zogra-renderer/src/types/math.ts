import { Vector3, vec3 } from "./vec3";
import { vec4, Vector4 } from "./vec4";
import { vec2, Vector2 } from "./vec2";
import { Rect } from "./rect";
import { mat4 } from "./mat4";
import { ZograMatrix } from "./generic";

type vec = vec2 | vec3 | vec4;

type Operand = vec2 | vec3 | vec4 | Readonly<vec2> | Readonly<vec3> | Readonly<vec4> | number | ArrayLike<number>;

type Larger<U extends Operand, V extends Operand> =
    U extends vec4 | Readonly<vec4> ? vec4 :
    V extends vec4 | Readonly<vec4> ? vec4 :
    U extends vec3 | Readonly<vec3> ? vec3 :
    V extends vec3 | Readonly<vec3> ? vec3 :
    U extends vec2 | Readonly<vec2> ? vec2 :
    V extends vec2 | Readonly<vec2> ? vec2 :
    V extends ArrayLike<number> ? ArrayLike<number> :
    number;

type ArithmeticType<U extends Operand, V extends Operand> = Larger<U, V>;

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

function allocateOutput<U extends Operand, V extends Operand>(a: U, b: V): ArithmeticType<U, V> & (vec | ArrayLike<number>)
{
    let length = Math.max((a as unknown as number[]).length || 0, (b as unknown as number[]).length || 0);
    switch (length)
    {
        case 2:
            return typeof (a) === "number" ? vec2.fill(a) : vec2.set(a as ArrayLike<number>) as any;
        case 3:
            return typeof (a) === "number" ? vec2.fill(a) : vec3.set(a as ArrayLike<number>) as any;
        case 4:
            return typeof (a) === "number" ? vec2.fill(a) : vec4.set(a as ArrayLike<number>) as any;
        case 16:
            return typeof (a) === "number" ? vec2.fill(a) : mat4.set(a as ArrayLike<number>) as any;
    }
    console.warn(`Unsupported vector length '${length}'`);
    return new Array() as any;
}

export function plus<U extends Operand, V extends Operand>(a: U, b: V, out?: ArithmeticType<U, V> & (vec | ArrayLike<number>)) : ArithmeticType<U, V>
{
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b) as any;
    
    let output = (out || allocateOutput(a, b));
    switch (output.length)
    {
        case 2:
            return vec2.plus(output, output, b) as typeof output;
        case 3:
            return vec3.plus(output, output, b) as typeof output;
        case 4:
            return vec4.plus(output, output, b) as typeof output;
    }

    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4.plus(output, output, b) as typeof output;
}
export function minus<U extends Operand, V extends Operand>(a: U, b: V, out?: ArithmeticType<U, V> & vec): ArithmeticType<U, V>
{
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b) as any;

    let output = (out || allocateOutput(a, b));
    switch (output.length)
    {
        case 2:
            return vec2.minus(output, output, b) as typeof output;
        case 3:
            return vec3.minus(output, output, b) as typeof output;
        case 4:
            return vec4.minus(output, output, b) as typeof output;
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4.minus(output, output, b) as typeof output;
}

export function mul<U extends Operand, V extends Operand>(a: U, b: V, out?: ArithmeticType<U, V> & vec): ArithmeticType<U, V>
{
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b) as any;

    let output = (out || allocateOutput(a, b));
    switch (output.length)
    {
        case 2:
            return vec2.mul(output, output, b) as typeof output;
        case 3:
            return vec3.mul(output, output, b) as typeof output;
        case 4:
            return vec4.mul(output, output, b) as typeof output;
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4.mul(output, output, b) as typeof output;
}
export function div<U extends Operand, V extends Operand>(a: U, b: V, out?: ArithmeticType<U, V> & vec): ArithmeticType<U, V>
{
    if (typeof (a) === "number" && typeof (b) === "number")
        return (a + b) as any;

    let output = (out || allocateOutput(a, b));
    switch (output.length)
    {
        case 2:
            return vec2.div(output, output, b) as typeof output;
        case 3:
            return vec3.div(output, output, b) as typeof output;
        case 4:
            return vec4.div(output, output, b) as typeof output;
    }
    console.warn(`Unsupported vector length '${output.length}'`);
    return vec4.div(output, output, b) as typeof output;
}
export function dot(a: vec3, b: vec3): number
export function dot(a: vec2, b: vec2): number
export function dot(a: vec4, b: vec4): number
export function dot(a: vec3 | vec2 | vec4, b: vec3| vec2 | vec4): number
{
    switch (a.length)
    {
        case 2:
            return a[0] * b[0] + a[1] * b[1];
        case 3:
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        case 4:
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
}
export function cross(a: vec3, b: vec3): vec3
export function cross(a: vec3, b: vec3, out: vec3): vec3
export function cross(a: ArrayLike<number>, b: ArrayLike<number>): vec3
export function cross(a: ArrayLike<number>, b: ArrayLike<number>, out: ArrayLike<number>): ArrayLike<number>
export function cross(a: vec3 | ArrayLike<number>, b: vec3 | ArrayLike<number>, out: vec3 | ArrayLike<number> = vec3.zero())
{
    (out as vec3)[0] = a[1] * b[2] - a[2] * b[1];
    (out as vec3)[1] = a[2] * b[0] - a[0] * b[2];
    (out as vec3)[2] = a[0] * b[1] - a[1] * b[0];
    return out;
}

export function distance<V extends vec>(a: V, b: V): number
{
    return Math.hypot((b[0] - a[0]) || 0, (b[1] - a[1]) || 0, (b[2] - a[2]) || 0, (b[3] - a[3]) || 0);
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