"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
class Singleton {
    constructor() {
        this._current = this;
    }
}
exports.Singleton = Singleton;
Singleton.current = null;
//# sourceMappingURL=singleton.js.map