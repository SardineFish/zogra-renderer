export interface Into<T> {
    into<T>(): T;
}
export declare type ConstructorType<T> = new (...args: any[]) => T;
export declare class DoubleBuffer<T> {
    private currentIdx;
    private buffers;
    get current(): T;
    set current(value: T);
    get back(): T;
    set back(value: T);
    constructor(init: () => T);
    update(): void;
}
