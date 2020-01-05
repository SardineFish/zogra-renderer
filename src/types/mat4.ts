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

export const mat4 = Matrix4x4;
