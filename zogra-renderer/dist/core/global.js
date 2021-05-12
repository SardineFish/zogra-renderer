import { DebugProvider } from "./debug";
export class GLContext {
    constructor() {
        this.gl = null;
        this.width = 0;
        this.height = 0;
        this.assets = null;
        this.renderer = null;
    }
}
let ctx;
let debugProvider = new class EmptyDebugProvider extends DebugProvider {
    drawLine(start, end, color) {
        // console.warn("No debug provider.");
    }
};
export const setGlobalContext = (_ctx) => ctx = _ctx;
export const GlobalContext = () => ctx;
export const GL = () => { var _a; return (_a = GlobalContext()) === null || _a === void 0 ? void 0 : _a.gl; };
export const Debug = (provider) => {
    if (provider)
        debugProvider = provider;
    return debugProvider;
};
//# sourceMappingURL=global.js.map