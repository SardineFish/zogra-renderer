"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = exports.readString = exports.readBlob = exports.panic = exports.mulVector = exports.mulPoint = void 0;
const gl_matrix_1 = require("gl-matrix");
function mulPoint(out, m, v) {
    let [x, y, z] = v;
    const v4 = gl_matrix_1.vec4.fromValues(x, y, z, 1);
    [x, y, z] = gl_matrix_1.vec4.transformMat4(gl_matrix_1.vec4.create(), v4, m);
    gl_matrix_1.vec3.set(out, x, y, z);
    return out;
}
exports.mulPoint = mulPoint;
function mulVector(out, m, v) {
    let [x, y, z] = v;
    const v4 = gl_matrix_1.vec4.fromValues(x, y, z, 0);
    [x, y, z] = gl_matrix_1.vec4.transformMat4(gl_matrix_1.vec4.create(), v4, m);
    gl_matrix_1.vec3.set(out, x, y, z);
    return out;
}
exports.mulVector = mulVector;
function panic(msg) {
    throw new Error(msg);
}
exports.panic = panic;
async function readBlob(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("loadend", () => {
            resolve(reader.result);
        });
        reader.addEventListener("error", (e) => {
            reject(reader.error);
        });
        reader.readAsArrayBuffer(blob);
    });
}
exports.readBlob = readBlob;
function readString(buffer, offset, length) {
    const slice = buffer.slice(offset, offset + length);
    const decoder = new TextDecoder();
    return decoder.decode(slice);
}
exports.readString = readString;
function assert(result, msg) {
    if (!result)
        throw new Error(msg);
}
exports.assert = assert;
//# sourceMappingURL=utils.js.map