import { mat4 as glMat4 } from "gl-matrix";

export type mat4 = glMat4;

export function Matrix4x4(values: number[])
{
    const mat = glMat4.clone(values as any as glMat4);
    return mat;
}
Matrix4x4.identity = () =>
{
    const mat = glMat4.create();
    return glMat4.identity(mat);
}

type ArithmetricFunction<T> = {
    (out: T, a: T, b: T): T;
    (a: T, b: T): T;
};

Matrix4x4.mul = ((out: mat4, a: mat4, b: mat4) =>
{
    if (!b)
    {
        b = a;
        a = out;
        out = glMat4.create();
    }
    return glMat4.mul(out, a, b);
}) as ArithmetricFunction<mat4>;

export const mat4 = Matrix4x4;
