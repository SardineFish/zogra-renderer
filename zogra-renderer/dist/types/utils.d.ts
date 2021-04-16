import { ZograMatrix } from "./generic";
declare type MapArrayArgs<T> = T extends number ? number : T extends ZograMatrix ? ArrayLike<number> : T extends number | ZograMatrix ? ArrayLike<number> | number : never;
declare type WrappedFunction<TOut, TArgs extends any[]> = {
    (...args: {
        [key in keyof TArgs]: Readonly<TArgs[key]>;
    }): TOut;
    (out: TOut, ...args: {
        [key in keyof TArgs]: Readonly<TArgs[key]>;
    }): TOut;
    (out: ArrayLike<number>, ...args: {
        [key in keyof TArgs]: MapArrayArgs<TArgs[key]>;
    }): ArrayLike<number>;
    (...args: {
        [key in keyof TArgs]: MapArrayArgs<TArgs[key]>;
    }): ArrayLike<number>;
};
export declare function wrapGlMatrix<TOut, TArgs extends any[]>(func: (out: TOut, ...args: TArgs) => TOut, argCount: TArgs["length"], allocator: () => TOut): WrappedFunction<TOut, TArgs>;
export {};
