"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let ctx;
exports.setGlobalContext = (_ctx) => ctx = _ctx;
exports.GlobalContext = () => ctx;
exports.GL = () => exports.GlobalContext().gl;
//# sourceMappingURL=global.js.map