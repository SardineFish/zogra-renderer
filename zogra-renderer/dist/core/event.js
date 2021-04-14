"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    // on(event: string, listener: EventListener): void
    // on<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void
    on(event, listener) {
        var _a;
        if (!this.listeners.has(event))
            this.listeners.set(event, []);
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.push(listener);
    }
    // off(event: string, listener: EventListener): void
    // off<T extends EventKeys<TEvents>>(event: T, listener: TEvents[T]): void
    off(event, listener) {
        var _a, _b;
        if (this.listeners.has(event))
            this.listeners.set(event, (_b = (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.filter(f => f !== listener)) !== null && _b !== void 0 ? _b : []);
    }
    // emit(event: string, ...args: any[]): void
    // emit<T extends EventKeys<TEvents>>(event: T, ...args: Parameters<TEvents[T]>): void
    emit(event, ...args) {
        var _a;
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.forEach(f => f(...args));
    }
    with() {
        return this;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event.js.map