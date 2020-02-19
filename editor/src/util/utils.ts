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