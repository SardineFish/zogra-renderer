interface LazyField<T>
{
    initialized: boolean;
    init: (params: T) => void;
}

const Lazy: new <T>() => T & LazyField<T> = function <T>(this: T & LazyField<T>)
{
    this.initialized = false;
    this.init = (params: T) =>
    {
        for (const key in params)
        {
            (this as T)[key] = params[key];
        }
    }
} as any;