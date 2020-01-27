export declare type EventListener = (...args: any[]) => void;
export declare class EventTrigger {
    listeners: Map<string, EventListener[]>;
    on(event: string, listener: EventListener): void;
    off(event: string, listener: EventListener): void;
    emit(event: string, ...args: any[]): void;
}
