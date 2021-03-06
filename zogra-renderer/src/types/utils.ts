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

type WrappedFunction<TOut, TReturn, TArgs extends any[]> = {
    (...args: { [key in keyof TArgs]: Readonly<TArgs[key]> }): TReturn,
    (out: TOut, ...args: { [key in keyof TArgs]: Readonly<TArgs[key]> }): TReturn,
    (out: TOut, ...args: { [key in keyof TArgs]: MapArrayArgs<TArgs[key]> }): TReturn,
    (...args: { [key in keyof TArgs]: MapArrayArgs<TArgs[key]> }): TReturn,
    (out: ArrayLike<number>, ...args: { [key in keyof TArgs]: MapArrayArgs<TArgs[key]> }): null extends TReturn ? ArrayLike<number> | null : ArrayLike<number>,
};


export function wrapGlMatrix<TOut, TReturn, TArgs extends any[]>(func: (out: TOut, ...args: TArgs) => TOut, argCount: TArgs["length"], allocator: () => TOut): WrappedFunction<TOut, TReturn, TArgs>
export function wrapGlMatrix<TOut, TArgs extends any[]>(func: (out: TOut, ...args: TArgs) => TOut, argCount: TArgs["length"], allocator: () => TOut): WrappedFunction<TOut, TOut, TArgs>
export function wrapGlMatrix<TOut, TArgs extends any[]>(func: (out: TOut, ...args: TArgs) => TOut, argCount: TArgs["length"], allocator: () => TOut): WrappedFunction<TOut, TOut, TArgs>
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
            let [out, ...rest] = args as [TOut, ...TArgs];
            if (out === undefined)
                out = allocator();
            return func(out, ...rest);
        }
    }) as any;
}

const DAMP_EPSLON = 0.01;
const DAMP_DURATION = -Math.log(DAMP_EPSLON);

export const MathUtils = {
    lerp(a: number, b: number, t: number)
    {
        return (b - a) * t + a;
    },
    linstep(a: number, b: number, x: number)
    {
        return MathUtils.clamp((x - a) / (b - a), 0, 1);
    },
    smoothStep(a: number, b: number, x: number)
    {
        const t = MathUtils.linstep(a, b, x);
        return t * t * (3.0 - 2.0 * t);
    },
    clamp(x: number, min: number, max: number)
    {
        return Math.min(Math.max(x, min), max);
    },
    mapClamped(inMin: number, inMax: number, outMin: number, outMax: number, value: number)
    {
        const t = this.linstep(inMin, inMax, value);
        return MathUtils.lerp(outMin, outMax, t);
    },
    damp: damp,
}

function damp(from: number, to: number, damping: number, deltaTime: number, epslon?: number): number
function damp(from: number, to: number, damping: number, deltaTime: number, epslon = DAMP_EPSLON, dampDuration = -Math.log(epslon)): number
{
    const timeScale = dampDuration / damping;
    const t = Math.exp(-deltaTime * timeScale);
    return MathUtils.lerp(from, to, 1 - t);
}