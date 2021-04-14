export interface EventDefinitions {
    [key: string]: EventListener;
}
export declare type EventKeys<T> = keyof T;
export declare type EventListener = (...args: any[]) => void;
export interface IEventSource<TEvents> {
    on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
    off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
}
export declare class EventEmitter<TEvents extends EventDefinitions> implements IEventSource<TEvents> {
    listeners: Map<keyof TEvents, TEvents[keyof TEvents][]>;
    on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
    off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
    emit<T extends EventKeys<TEvents>>(event: T, ...args: Parameters<TEvents[T]>): void;
}
