import { mat4 as glMat4, vec3 as glVec3, quat as glQuat, vec4 as glVec4, vec2 as glVec2, ReadonlyVec2, ReadonlyVec3, ReadonlyVec4, ReadonlyMat4, mat3 } from "gl-matrix";
import { quat } from "./quat";
import { vec3 } from "./vec3";
import { vec4 } from "./vec4";
import { vec2 } from "./vec2";
import { ZograMatrix } from "./generic";

type MapArrayArgs<T> =
    T extends number ? number
    : T extends ZograMatrix ? ArrayLike<number>
    : T extends number | ZograMatrix ? ArrayLike<number> | number
    : never;

type WrappedFunction<TOut, TArgs extends any[]> = {
    (...args: { [key in keyof TArgs]: Readonly<TArgs[key]> }): TOut,
    (out: TOut, ...args: { [key in keyof TArgs]: Readonly<TArgs[key]> }): TOut,
    (out: ArrayLike<number>, ...args: { [key in keyof TArgs]: MapArrayArgs<TArgs[key]> }): ArrayLike<number>,
    (...args: { [key in keyof TArgs]: MapArrayArgs<TArgs[key]> }): ArrayLike<number>,
};

export function wrapGlMatrix<TOut, TArgs extends any[]>(func: (out: TOut, ...args: TArgs) => TOut, argCount: TArgs["length"], allocator: () => TOut): WrappedFunction<TOut, TArgs>
{
    return ((...args: [TOut, ...TArgs] | TArgs) =>
    {
        if (args.length <= argCount)
        {
            const out = allocator();
            return func(out, ...(args as TArgs));
        }
        else
        {
            const [out, ...rest] = args as [TOut, ...TArgs];
            return func(out, ...rest);
        }
    }) as any;
}

export const MathUtils = {
    lerp(a: number, b: number, t: number)
    {
        return (b - a) * t + a;
    },
    
}