"use strict";
// export * from "./core/mesh";
// export * from "./core/material";
// export * from "./core/builtin-asset";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalContext = exports.plugins = void 0;
// export * from "./types/vec2";
// export * from "./types/vec3";
// export * from "./types/vec4";
// export * from "./types/color";
// export * from "./types/math";
// export * from "./types/mat4";
// export * from "./core/shader";
__exportStar(require("./types/types"), exports);
__exportStar(require("./core/core"), exports);
__exportStar(require("./engine/engine"), exports);
__exportStar(require("./render-pipeline/rp"), exports);
const pluginsExport = __importStar(require("./plugins/plugins"));
exports.plugins = pluginsExport;
__exportStar(require("./plugins/plugins"), exports);
__exportStar(require("./utils/public-utils"), exports);
var global_1 = require("./core/global");
Object.defineProperty(exports, "GlobalContext", { enumerable: true, get: function () { return global_1.GlobalContext; } });
//# sourceMappingURL=index.js.map