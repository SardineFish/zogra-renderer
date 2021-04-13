"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugProvider = void 0;
const color_1 = require("../types/color");
const math_1 = require("../types/math");
const rect_1 = require("../types/rect");
const vec2_1 = require("../types/vec2");
class DebugProvider {
    drawRay(origin, dir, distance = 1, color = color_1.Color.red) {
        this.drawLine(origin, math_1.mul(dir, distance).plus(origin), color);
    }
    drawRect(...args) {
        let min, max, color;
        if (args[0] instanceof rect_1.Rect) {
            min = args[0].min;
            max = args[0].max;
            color = args[1] || color_1.Color.red;
        }
        else {
            min = args[0];
            max = args[1];
            color = args[2] || color_1.Color.red;
        }
        this.drawLine(vec2_1.vec2(min.x, min.y).toVec3(), vec2_1.vec2(max.x, min.y).toVec3(), color);
        this.drawLine(vec2_1.vec2(max.x, min.y).toVec3(), vec2_1.vec2(max.x, max.y).toVec3(), color);
        this.drawLine(vec2_1.vec2(max.x, max.y).toVec3(), vec2_1.vec2(min.x, max.y).toVec3(), color);
        this.drawLine(vec2_1.vec2(min.x, max.y).toVec3(), vec2_1.vec2(min.x, min.y).toVec3(), color);
    }
}
exports.DebugProvider = DebugProvider;
//# sourceMappingURL=debug.js.map