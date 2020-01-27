"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventTrigger {
    constructor() {
        this.listeners = new Map();
    }
    on(event, listener) {
        var _a;
        if (!this.listeners.has(event))
            this.listeners.set(event, []);
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.push(listener);
    }
    off(event, listener) {
        var _a, _b;
        if (this.listeners.has(event))
            this.listeners.set(event, (_b = (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.filter(f => f !== listener), (_b !== null && _b !== void 0 ? _b : [])));
    }
    emit(event, ...args) {
        var _a;
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.forEach(f => f(...args));
    }
}
exports.EventTrigger = EventTrigger;
//# sourceMappingURL=event.js.map