export function panicNull<T>(t: T | null, msg?: string): T
{
    if (t === null)
        throw new Error(msg);
    return t;
}