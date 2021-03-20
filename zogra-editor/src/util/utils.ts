import { EventEmitter, EventDefinitions } from "zogra-renderer";

export class LazyEventEmitter<TEvents extends EventDefinitions>
{
    cachedEvents = new Map<string, any[]>();
    gapFrames = 3;
    private framesCount = 0;
    private eventEmitter: EventEmitter<TEvents>;
    constructor(eventEmitter:EventEmitter<TEvents>, gap: number = 3)
    {
        this.eventEmitter = eventEmitter;
        this.gapFrames = gap;
    }
    emit<T extends keyof TEvents>(event: T, ...args: Parameters<TEvents[T]>)
    {
        this.cachedEvents.set(event as string, args);
    }
    update()
    {
        this.framesCount++;
        if (this.framesCount >= this.gapFrames)
        {
            for (const [event, args] of this.cachedEvents)
            {
                this.eventEmitter.emit(event, ...args as any);
            }
            this.cachedEvents.clear();
            this.framesCount = 0;
        }
    }
}
export class BiMap<TKey, TValue>
{
    private k2v = new Map<TKey, TValue>();
    private v2k = new Map<TValue, TKey>();
    strict = true;
    get size() { return this.k2v.size }
    constructor(strict = true)
    {
        this.strict = strict;
    }
    clear()
    {
        this.k2v.clear();
        this.v2k.clear();
    }
    getValue(key: TKey)
    {
        return this.k2v.get(key);
    }
    getKey(value: TValue)
    {
        return this.v2k.get(value);
    }
    set(key: TKey, value: TValue)
    {
        if (this.strict && this.k2v.has(key) && this.k2v.get(key) !== value)
            throw new Error("Conflict with existed pair.");
        this.k2v.set(key, value);
        this.v2k.set(value, key);
    }
    hasKey(key: TKey)
    {
        return this.k2v.has(key);
    }
    hasValue(value: TValue)
    {
        return this.v2k.has(value);
    }
    deleteKey(key: TKey)
    {
        if (this.k2v.has(key))
        {
            this.v2k.delete(this.k2v.get(key) as TValue);
            this.k2v.delete(key);
        }
    }
    deleteValue(value: TValue)
    {
        if (this.v2k.has(value))
        {
            this.k2v.delete(this.v2k.get(value) as TKey);
            this.v2k.delete(value);
        }
    }
    keys()
    {
        return this.k2v.keys();
    }
    values()
    {
        return this.k2v.values();
    }
    entrys()
    {
        return this.k2v.entries();
    }
    forEeach(callbackfn: (key: TKey, value: TValue, map: BiMap<TKey, TValue>) => void, thisArg?: any)
    {
        return this.k2v.forEach((value, key) => callbackfn(key, value, this), thisArg);
    }
    map<T>(callbackfn: (key: TKey, value: TValue, map: BiMap<TKey, TValue>) => T) : T[]
    {
        return Array.from(this.k2v.keys()).map(key => callbackfn(key, this.k2v.get(key) as TValue, this));
    }

}

export function panic(msg?: string): never
{
    throw new Error(msg);
}