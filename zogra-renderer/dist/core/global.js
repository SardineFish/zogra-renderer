"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = exports.GL = exports.GlobalContext = exports.setGlobalContext = exports.GLContext = void 0;
const debug_1 = require("./debug");
class GLContext {
    constructor() {
        this.gl = null;
        this.width = 0;
        this.height = 0;
        this.assets = null;
        this.renderer = null;
    }
}
exports.GLContext = GLContext;
let ctx;
let debugProvider = new class EmptyDebugProvider extends debug_1.DebugProvider {
    drawLine(start, end, color) {
        console.warn("No debug provider.");
    }
};
const setGlobalContext = (_ctx) => ctx = _ctx;
exports.setGlobalContext = setGlobalContext;
const GlobalContext = () => ctx;
exports.GlobalContext = GlobalContext;
const GL = () => { var _a; return (_a = exports.GlobalContext()) === null || _a === void 0 ? void 0 : _a.gl; };
exports.GL = GL;
const Debug = (provider) => {
    if (provider)
        debugProvider = provider;
    return debugProvider;
};
exports.Debug = Debug;
//# sourceMappingURL=global.js.map