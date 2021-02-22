"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GL = exports.GlobalContext = exports.setGlobalContext = void 0;
let ctx;
exports.setGlobalContext = (_ctx) => ctx = _ctx;
exports.GlobalContext = () => ctx;
exports.GL = () => { var _a; return (_a = exports.GlobalContext()) === null || _a === void 0 ? void 0 : _a.gl; };
//# sourceMappingURL=global.js.map