"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = exports.wrapGlMatrix = void 0;
function wrapGlMatrix(func, argCount, allocator) {
    return ((...args) => {
        if (args.length <= argCount) {
            const out = allocator();
            return func(out, ...args);
        }
        else {
            let [out, ...rest] = args;
            if (out === undefined)
                out = allocator();
            return func(out, ...rest);
        }
    });
}
exports.wrapGlMatrix = wrapGlMatrix;
const DAMP_EPSLON = 0.01;
const DAMP_DURATION = -Math.log(DAMP_EPSLON);
exports.MathUtils = {
    lerp(a, b, t) {
        return (b - a) * t + a;
    },
    linstep(a, b, x) {
        return exports.MathUtils.clamp((x - a) / (b - a), 0, 1);
    },
    smoothStep(a, b, x) {
        const t = exports.MathUtils.linstep(a, b, x);
        return t * t * (3.0 - 2.0 * t);
    },
    clamp(x, min, max) {
        return Math.min(Math.max(x, min), max);
    },
    mapClamped(inMin, inMax, outMin, outMax, value) {
        const t = this.linstep(inMin, inMax, value);
        return exports.MathUtils.lerp(outMin, outMax, t);
    },
    damp: damp,
};
function damp(from, to, damping, deltaTime, epslon = DAMP_EPSLON, dampDuration = -Math.log(epslon)) {
    const timeScale = dampDuration / damping;
    const t = Math.exp(-deltaTime * timeScale);
    return exports.MathUtils.lerp(from, to, 1 - t);
}
//# sourceMappingURL=utils.js.map