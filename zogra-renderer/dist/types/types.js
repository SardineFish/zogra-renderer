"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
gl_matrix_1.glMatrix.setMatrixArrayType(Array);
__exportStar(require("./vec2"), exports);
__exportStar(require("./vec3"), exports);
__exportStar(require("./vec4"), exports);
__exportStar(require("./color"), exports);
__exportStar(require("./math"), exports);
__exportStar(require("./mat4"), exports);
__exportStar(require("./quat"), exports);
__exportStar(require("./ray"), exports);
__exportStar(require("./rect"), exports);
//# sourceMappingURL=types.js.map