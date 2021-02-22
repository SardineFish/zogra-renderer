interface LazyField<T> {
    initialized: boolean;
    init: (params: T) => void;
}
declare const Lazy: new <T>() => T & LazyField<T>;
