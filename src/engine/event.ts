
export interface EventDefinitions
{
    [key: string]: EventListener;
}

export type EventKeys<T> = (keyof T) & ({
    [key in keyof T]: string extends key ? never : number extends key ? never : key;
} extends { [_ in keyof T]: infer U } ? U : never);

export type EventListener = (...args: any[]) => void;

export interface IEventSource<TEvents extends EventDefinitions>
{
    on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
    off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
}

export class EventEmitter<TEvents extends EventDefinitions = EventDefinitions> implements IEventSource<TEvents>
{
    listeners = new Map<keyof TEvents, TEvents[keyof TEvents][]>();
    on<T extends keyof TEvents>(event: T, listener: TEvents[T])
    {
        if (!this.listeners.has(event))
            this.listeners.set(event, []);
        this.listeners.get(event)?.push(listener);
    }
    off<T extends keyof TEvents>(event: T, listener: TEvents[T])
    {
        if (this.listeners.has(event))
            this.listeners.set(event, this.listeners.get(event)?.filter(f => f !== listener) ?? []);
    }
    emit<T extends keyof TEvents>(event: T, ...args: Parameters<TEvents[T]>)
    {
        this.listeners.get(event)?.forEach(f => f(...args));
    }
}