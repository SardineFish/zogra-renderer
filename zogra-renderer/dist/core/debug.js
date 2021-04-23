"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugProvider = void 0;
const color_1 = require("../types/color");
const math_1 = require("../types/math");
const rect_1 = require("../types/rect");
const vec2_1 = require("../types/vec2");
const vec3_1 = require("../types/vec3");
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
    drawLines(points, color = color_1.Color.red) {
        for (let i = 0; i < points.length; i++) {
            this.drawLine(points[i], points[(i + 1) % points.length], color);
        }
    }
    drawCircle(center, radius, color = color_1.Color.red) {
        const edges = 24;
        for (let i = 0; i < edges; i++) {
            const p0 = vec3_1.vec3(Math.cos(i * 2 * Math.PI / edges), Math.sin(i * 2 * Math.PI / edges), 0);
            const p1 = vec3_1.vec3(Math.cos((i + 1) % edges * 2 * Math.PI / edges), Math.sin((i + 1) % edges * 2 * Math.PI / edges), 0);
            this.drawLine(p0.mul(radius).plus(center), p1.mul(radius).plus(center), color);
        }
    }
}
exports.DebugProvider = DebugProvider;
//# sourceMappingURL=debug.js.map