import { mat4 as glMat4, vec3 as glVec3, quat as glQuat, vec4 as glVec4, vec2 as glVec2, ReadonlyVec2, ReadonlyVec3, ReadonlyVec4, ReadonlyMat4, mat3 } from "gl-matrix";
import { quat } from "./quat";
import { vec3 } from "./vec3";
import { vec4 } from "./vec4";
import { vec2 } from "./vec2";
import { wrapGlMatrix } from "./utils";
import { ZograMatrix } from "./generic";

export type mat4 = Matrix4x4;


type Mat4Tuple = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
const Mat4Constructor: new (...p: Mat4Tuple) => Mat4Tuple = Array as any;
const __vec4_temp = vec4.zero();
export class Matrix4x4 extends Mat4Constructor implements ZograMatrix
{
    constructor(p_0 = 0, p_1 = 0, p_2 = 0, p_3 = 0, p_4 = 0, p_5 = 0, p_6 = 0, p_7 = 0, p_8 = 0, p_9 = 0, p_10 = 0, p_11 = 0, p_12 = 0, p_13 = 0, p_14 = 0, p_15 = 0)
    {
        super(p_0, p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10, p_11, p_12, p_13, p_14, p_15);

    }
    static create()
    {
        return new Matrix4x4();
    }
    asMut() { return this; }
    set(v: Readonly<mat4>): this
    set(v: Readonly<number[]>): this
    set(m: Readonly<number[]> | Readonly<mat4>)
    {
        return glMat4.set(this, ...m as unknown as Mat4Tuple);
    }
    setAll(n: number)
    {
        this[0]
            = this[1]
            = this[2]
            = this[3]
            = this[4]
            = this[5]
            = this[6]
            = this[7]
            = this[8]
            = this[9]
            = this[10]
            = this[11]
            = this[12]
            = this[13]
            = this[14]
            = this[15] = n;
        return this;
    }
    clone(out: mat4 = mat4.create())
    {
        return out.set(this);
    }
    equals(other: any)
    {
        return mat4.equal(this, other);
    }
}

export function mat4(p_0 = 0, p_1 = 0, p_2 = 0, p_3 = 0, p_4 = 0, p_5 = 0, p_6 = 0, p_7 = 0, p_8 = 0, p_9 = 0, p_10 = 0, p_11 = 0, p_12 = 0, p_13 = 0, p_14 = 0, p_15 = 0)
{
    return new Matrix4x4(p_0, p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10, p_11, p_12, p_13, p_14, p_15);
}

mat4.create = Matrix4x4.create;
mat4.identity = wrapGlMatrix<mat4, []>(glMat4.identity as any, 0, mat4.create);
mat4.rts = wrapGlMatrix<mat4, [quat, vec3, vec3]>(glMat4.fromRotationTranslationScale as any, 3, mat4.create);
mat4.translate = wrapGlMatrix<mat4, [mat4, vec3]>(glMat4.translate as any, 2, Matrix4x4.create);
mat4.invert = wrapGlMatrix<Matrix4x4, [Matrix4x4]>(glMat4.invert as any, 1, Matrix4x4.create);
mat4.getTranslation = wrapGlMatrix<vec3, [Matrix4x4]>(glMat4.getTranslation as any, 1, vec3.zero);
mat4.getRotation = wrapGlMatrix<quat, [mat4]>(glMat4.getRotation as any, 1, quat.create);
mat4.getScaling = wrapGlMatrix<vec3, [mat4]>(glMat4.getScaling as any, 1, vec3.zero);
mat4.mulVec4 = wrapGlMatrix<vec4, [mat4, vec4]>((out, m, v) => glVec4.transformMat4(out, v, m) as any, 2, vec4.zero);
mat4.perspective = wrapGlMatrix<mat4, [number, number, number, number]>(glMat4.perspective as any, 4, Matrix4x4.create);
mat4.transpose = wrapGlMatrix<mat4, [mat4]>(glMat4.transpose as any, 1, Matrix4x4.create);
mat4.rotate = wrapGlMatrix<mat4, [mat4, vec3, number]>((out, m, axis, rad) => glMat4.rotate(out, m, rad, axis) as mat4, 3, Matrix4x4.create);
mat4.scale = wrapGlMatrix<mat4, [mat4, vec3]>(glMat4.scale as any, 2, Matrix4x4.create);
mat4.fromTranslation = wrapGlMatrix<mat4, [vec3]>(glMat4.fromTranslation as any, 1, Matrix4x4.create);
mat4.fromRotation = wrapGlMatrix<mat4, [quat]>(glMat4.fromRotation as any, 1, Matrix4x4.create);
mat4.fromScaling = wrapGlMatrix<mat4, [vec3]>(glMat4.fromScaling as any, 1, Matrix4x4.create);
mat4.mul = wrapGlMatrix<mat4, [mat4, mat4]>(glMat4.mul as any, 2, Matrix4x4.create);
mat4.add = wrapGlMatrix<mat4, [mat4, mat4]>(glMat4.add as any, 2, mat4.create);
mat4.sub = wrapGlMatrix<mat4, [mat4, mat4]>(glMat4.sub as any, 2, mat4.create);
mat4.plus = mat4.add;
mat4.minus = mat4.sub;
mat4.mulVector = wrapGlMatrix<vec3, [mat4, vec3]>((out, m, v) =>
{
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = v[2];
    __vec4_temp[3] = 0;
    glVec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    out[2] = __vec4_temp[2];
    return out;
}, 2, vec3.zero);
mat4.mulPoint = wrapGlMatrix<vec3, [mat4, vec3]>((out, m, v) =>
{
    __vec4_temp[0] = v[0];
    __vec4_temp[1] = v[1];
    __vec4_temp[2] = v[2];
    __vec4_temp[3] = 1;
    glVec4.transformMat4(__vec4_temp, __vec4_temp, m);
    out[0] = __vec4_temp[0];
    out[1] = __vec4_temp[1];
    out[2] = __vec4_temp[2];
    return out;
}, 2, vec3.zero);

function simpleOrthogonal(height: number, aspect: number, near: number, far: number): mat4
{
    const out = mat4.create();
    glMat4.ortho(out, -aspect * height, aspect * height, -height, height, near, far);
    return out as mat4;
}

function orthogonal(height: number, aspect: number, near: number, far: number): mat4
function orthogonal(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4
function orthogonal(...args: number[]): mat4
{
    if (args.length === 4)
        return simpleOrthogonal(...(args as [number, number, number, number]));

    const out = mat4.create();
    glMat4.ortho(...([out as glMat4, ...args] as Parameters<typeof glMat4.ortho>));
    return out;
    
}
mat4.ortho = orthogonal;
// (height: number, aspect: number, near: number, far: number) =>
// {
//     const out = glMat4.create();
//     glMat4.ortho(out, -aspect * height, aspect * height, -height, height, near, far);
//     return out;
//     out[0] = 2 / (aspect * height);
//     out[1] = 0;
//     out[2] = 0;
//     out[3] = 0;
//     out[4] = 0;
//     out[5] = 2 / height;
//     out[6] = 0;
//     out[7] = 0;
//     out[8] = 0;
//     out[9] = 0;
//     out[10] = -2 / (far - near);
//     out[11] = -(far + near) / (far - near);
//     out[12] = 0;
//     out[13] = 0;
//     out[14] = 0;
//     out[15] = 1;
//     return out;
// }
mat4.equal = (a: any, b: any) =>
{
    if (a === undefined || b === undefined)
        return false;
    if (!(a instanceof Array || a instanceof Float32Array) || !(b instanceof Array || b instanceof Float32Array))
        return false;
    return glMat4.exactEquals(a as glMat4, b as glMat4);
}

// export const mat4 = Matrix4x4;
