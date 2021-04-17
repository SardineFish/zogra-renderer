import { ZograMatrix } from "./generic";
declare type MapArrayArgs<T> = T extends number ? number : T extends ZograMatrix ? ArrayLike<number> : T extends number | ZograMatrix ? ArrayLike<number> | number : never;
declare type WrappedFunction<TOut, TReturn, TArgs extends any[]> = {
    (...args: {
        [key in keyof TArgs]: Readonly<TArgs[key]>;
    }): TReturn;
    (out: TOut, ...args: {
        [key in keyof TArgs]: Readonly<TArgs[key]>;
    }): TReturn;
    (out: ArrayLike<number>, ...args: {
        [key in keyof TArgs]: MapArrayArgs<TArgs[key]>;
    }): null extends TReturn ? ArrayLike<number> | null : ArrayLike<number>;
    (...args: {
        [key in keyof TArgs]: MapArrayArgs<TArgs[key]>;
    }): null extends TReturn ? ArrayLike<number> | null : ArrayLike<number>;
};
export declare function wrapGlMatrix<TOut, TReturn, TArgs extends any[]>(func: (out: TOut, ...args: TArgs) => TOut, argCount: TArgs["length"], allocator: () => TOut): WrappedFunction<TOut, TReturn, TArgs>;
export declare function wrapGlMatrix<TOut, TArgs extends any[]>(func: (out: TOut, ...args: TArgs) => TOut, argCount: TArgs["length"], allocator: () => TOut): WrappedFunction<TOut, TOut, TArgs>;
export declare const MathUtils: {
    lerp(a: number, b: number, t: number): number;
};
export {};
