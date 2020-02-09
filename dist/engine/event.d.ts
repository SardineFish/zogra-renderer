export interface EventDefinitions {
    [key: string]: EventListener;
}
export declare type EventKeys<T> = (keyof T) & ({
    [key in keyof T]: string extends key ? never : number extends key ? never : key;
} extends {
    [_ in keyof T]: infer U;
} ? U : never);
export declare type EventListener = (...args: any[]) => void;
export interface IEventSource<TEvents extends EventDefinitions> {
    on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
    off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void;
}
export declare class EventTrigger<TEvents extends EventDefinitions = EventDefinitions> implements IEventSource<TEvents> {
    listeners: Map<keyof TEvents, TEvents[keyof TEvents][]>;
    on<T extends keyof TEvents>(event: T, listener: TEvents[T]): void;
    off<T extends keyof TEvents>(event: T, listener: TEvents[T]): void;
    emit<T extends keyof TEvents>(event: T, ...args: Parameters<TEvents[T]>): void;
}
