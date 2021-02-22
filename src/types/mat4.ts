import { mat4 as glMat4, vec3 as glVec3, quat as glQuat, vec4 as glVec4 } from "gl-matrix";
import { quat } from "./quat";
import { vec3 } from "./vec3";
import { vec4 } from "./vec4";
import { vec2 } from "./vec2";

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

Matrix4x4.rts = (rotation: quat, translation: vec3, scale: vec3) =>
{
    const m = mat4.identity();
    glMat4.fromRotationTranslationScale(m, rotation, translation, scale);
    return m;
}
Matrix4x4.translate = (translate: vec3) =>
{
    const m = mat4.identity();
    return glMat4.translate(m, glMat4.identity(m), translate);
}
Matrix4x4.invert = (m: mat4) =>
{
    const out = glMat4.create();
    glMat4.invert(out, m);
    return out;
}
Matrix4x4.getTranslation = (m: mat4) =>
{
    let out = vec3(0, 0, 0);
    glMat4.getTranslation(out as any as glVec3, m);
    return out;
}
Matrix4x4.getRotation = (m: mat4) =>
{
    let out = glQuat.create();
    glMat4.getRotation(out, m);
    return out;
}
Matrix4x4.getScaling = (m: mat4) =>
{
    let out = vec3(0, 0, 0);
    glMat4.getScaling(out as any as glVec3, m);
    return out;
};
Matrix4x4.mulPoint = (m: mat4, p: vec3) =>
{
    let v = vec4(p.x, p.y, p.z, 1);
    let out = vec4.zero();
    glVec4.transformMat4(out as any as glVec4, v, m);
    return vec3(out.x, out.y, out.z);
}
Matrix4x4.mulVector = (m: mat4, v: vec3) =>
{
    let v4 = vec4(v.x, v.y, v.z, 0);
    let out = vec4.zero();
    glVec4.transformMat4(out as any as glVec4, v4, m);
    return vec3(out.x, out.y, out.z);
};
Matrix4x4.mulVec4 = (m: mat4, v: vec4) =>
{
    let out = vec4.zero();
    glVec4.transformMat4(out as any as glVec4, v, m);
    return out;
}
Matrix4x4.perspective = (fov: number, aspect: number, near: number, far: number) =>
{
    const out = glMat4.create();
    return glMat4.perspective(out, fov, aspect, near, far);
};
Matrix4x4.transpose = (m: mat4)=>
{
    return glMat4.transpose(glMat4.create(), m);
}
function simpleOrthogonal(height: number, aspect: number, near: number, far: number)
{
    const out = glMat4.create();
    glMat4.ortho(out, -aspect * height, aspect * height, -height, height, near, far);
    return out;
}

function orthogonal(height: number, aspect: number, near: number, far: number): mat4
function orthogonal(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4
function orthogonal(...args: number[]): mat4
{
    if (args.length === 4)
        return simpleOrthogonal(...(args as [number, number, number, number]));

    const out = glMat4.create();
    glMat4.ortho(...([out, ...args] as Parameters<typeof glMat4.ortho>));
    return out;
    
}
Matrix4x4.ortho = orthogonal;
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
Matrix4x4.rotate = (m: mat4, axis: vec3, rad: number) =>
{
    return glMat4.rotate(glMat4.create(), m, rad, axis);
}
Matrix4x4.scale = (m: mat4, scaling: vec3) =>
{
    return glMat4.scale(glMat4.create(), m, scaling);
};
Matrix4x4.fromRotation = (axis: vec3, rad: number) =>
{
    return glMat4.fromRotation(glMat4.create(), rad, axis);
}
Matrix4x4.fromScaling = (scaling: vec3) =>
{
    return glMat4.fromScaling(glMat4.create(), scaling);
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
