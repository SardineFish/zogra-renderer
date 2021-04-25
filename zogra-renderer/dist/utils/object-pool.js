"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectPool = void 0;
class ObjectPool {
    constructor(allocator) {
        this.pool = [];
        this.allocator = allocator;
    }
    get(...args) {
        if (this.pool.length <= 0)
            return this.allocator(...args);
        return this.pool.pop();
    }
    release(obj) {
        this.pool.push(obj);
    }
}
exports.ObjectPool = ObjectPool;
//# sourceMappingURL=object-pool.js.map