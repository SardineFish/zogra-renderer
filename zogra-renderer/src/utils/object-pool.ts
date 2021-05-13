export class ObjectPool<T, AllocArgs extends any[] = any[]>
{
    private pool: T[] = [];
    private allocator: (...args: AllocArgs) => T;

    constructor(allocator: (...args: AllocArgs) => T)
    {
        this.allocator = allocator;
    }

    get(...args: AllocArgs): T
    {
        if (this.pool.length <= 0)
            return this.allocator(...args);
        return this.pool.pop() as T;
    }

    release(obj: T)
    {
        this.pool.push(obj);
    }
}