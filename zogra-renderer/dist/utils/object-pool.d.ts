export declare class ObjectPool<T, AllocArgs extends any[] = any[]> {
    private pool;
    private allocator;
    constructor(allocator: (...args: AllocArgs) => T);
    get(...args: AllocArgs): T;
    release(obj: T): void;
}
