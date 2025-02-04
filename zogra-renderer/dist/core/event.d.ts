export interface EventDefinitions {
    [key: string]: EventListener;
}
export type EventKeys<T> = keyof T;
export type EventListener = (...args: any[]) => void;
export interface IEventSource<TEvents> {
    on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
    off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
}
export declare class EventEmitter<TEvents extends {
    [key in keyof TEvents]: (...args: any[]) => any;
}> implements IEventSource<TEvents> {
    listeners: Map<keyof TEvents, TEvents[keyof TEvents][]>;
    on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
    off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
    emit<T extends EventKeys<TEvents>>(event: T, ...args: Parameters<TEvents[T]>): void;
    with<T extends TEvents>(): EventEmitter<T>;
}
