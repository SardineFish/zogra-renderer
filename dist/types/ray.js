"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ray = void 0;
function ray(origin, direction) {
    return { origin, direction: direction.normalized };
}
exports.ray = ray;
//# sourceMappingURL=ray.js.map