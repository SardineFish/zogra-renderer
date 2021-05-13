
export interface EventDefinitions
{
    [key: string]: EventListener;
}

// export type EventKeys<T> = keyof T;
// export type EventKeys<T> = (keyof T) & ({
//     [key in keyof T]: string extends key ? never : number extends key ? never : key;
// } extends { [_ in keyof T]: infer U } ? U : never);
export type EventKeys<T> = keyof T;// { [key in keyof T]: T[key] extends (...args: any[]) => any ? T[key] : never };

export type EventListener = (...args: any[]) => void;

export interface IEventSource<TEvents>
{
    on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
    off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
}

export class EventEmitter<TEvents extends {[key in keyof TEvents]: (...args: any[]) => any}> implements IEventSource<TEvents>
{
    listeners = new Map<keyof TEvents, TEvents[keyof TEvents][]>();
    // on(event: string, listener: EventListener): void
    // on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void
    on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T])
    {
        if (!this.listeners.has(event))
            this.listeners.set(event, []);
        this.listeners.get(event)?.push(listener);
    }
    // off(event: string, listener: EventListener): void
    // off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void
    off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T])
    {
        if (this.listeners.has(event))
            this.listeners.set(event, this.listeners.get(event)?.filter(f => f !== listener) ?? []);
    }
    // emit(event: string, ...args: any[]): void
    // emit<T extends EventKeys<TEvents>>(event: T, ...args: Parameters<TEvents[T]>): void
    emit<T extends EventKeys<TEvents>>(event: T, ...args: Parameters<TEvents[T]>)
    {
        this.listeners.get(event)?.forEach(f => f(...args));
    }

    with<T extends TEvents>(): EventEmitter<T>
    {
        return this as any;
    }
}