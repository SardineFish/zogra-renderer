"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapGlMatrix = void 0;
function wrapGlMatrix(func, argCount, allocator) {
    return ((...args) => {
        if (args.length <= argCount) {
            const out = allocator();
            return func(out, ...args);
        }
        else {
            const [out, ...rest] = args;
            return func(out, ...rest);
        }
    });
}
exports.wrapGlMatrix = wrapGlMatrix;
//# sourceMappingURL=utils.js.map