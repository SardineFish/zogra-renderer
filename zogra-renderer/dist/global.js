"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GL = exports.GlobalContext = exports.setGlobalContext = void 0;
let ctx;
const setGlobalContext = (_ctx) => ctx = _ctx;
exports.setGlobalContext = setGlobalContext;
const GlobalContext = () => ctx;
exports.GlobalContext = GlobalContext;
const GL = () => { var _a; return (_a = exports.GlobalContext()) === null || _a === void 0 ? void 0 : _a.gl; };
exports.GL = GL;
//# sourceMappingURL=global.js.map