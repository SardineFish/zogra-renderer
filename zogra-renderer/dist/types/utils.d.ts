declare type WrappedFunction<TOut, TArgs extends any[]> = {
    (...args: {
        [key in keyof TArgs]: Readonly<TArgs[key]>;
    }): TOut;
    (out: TOut, ...args: {
        [key in keyof TArgs]: Readonly<TArgs[key]>;
    }): TOut;
};
export declare function wrapGlMatrix<TOut, TArgs extends any[]>(func: (out: TOut, ...args: TArgs) => TOut, argCount: TArgs["length"], allocator: () => TOut): WrappedFunction<TOut, TArgs>;
export {};
