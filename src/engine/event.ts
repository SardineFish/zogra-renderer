
export type EventListener = (...args: any[]) => void;

export class EventTrigger
{
    listeners = new Map<string, EventListener[]>();
    on(event: string, listener: EventListener)
    {
        if (!this.listeners.has(event))
            this.listeners.set(event, []);
        this.listeners.get(event)?.push(listener);
    }
    off(event: string, listener: EventListener)
    {
        if (this.listeners.has(event))
            this.listeners.set(event, this.listeners.get(event)?.filter(f => f !== listener) ?? []);
    }
    emit(event: string, ...args: any[])
    {
        this.listeners.get(event)?.forEach(f => f(...args));
    }
}