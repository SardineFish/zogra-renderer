import { Color } from "../types/color";
import { mul } from "../types/math";
import { Rect } from "../types/rect";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
export class DebugProvider {
    drawRay(origin, dir, distance = 1, color = Color.red) {
        this.drawLine(origin, mul(dir, distance).plus(origin), color);
    }
    drawRect(...args) {
        let min, max, color;
        if (args[0] instanceof Rect) {
            min = args[0].min;
            max = args[0].max;
            color = args[1] || Color.red;
        }
        else {
            min = args[0];
            max = args[1];
            color = args[2] || Color.red;
        }
        this.drawLine(vec2(min.x, min.y).toVec3(), vec2(max.x, min.y).toVec3(), color);
        this.drawLine(vec2(max.x, min.y).toVec3(), vec2(max.x, max.y).toVec3(), color);
        this.drawLine(vec2(max.x, max.y).toVec3(), vec2(min.x, max.y).toVec3(), color);
        this.drawLine(vec2(min.x, max.y).toVec3(), vec2(min.x, min.y).toVec3(), color);
    }
    drawLines(points, color = Color.red) {
        for (let i = 0; i < points.length; i++) {
            this.drawLine(points[i], points[(i + 1) % points.length], color);
        }
    }
    drawCircle(center, radius, color = Color.red) {
        const edges = 24;
        for (let i = 0; i < edges; i++) {
            const p0 = vec3(Math.cos(i * 2 * Math.PI / edges), Math.sin(i * 2 * Math.PI / edges), 0);
            const p1 = vec3(Math.cos((i + 1) % edges * 2 * Math.PI / edges), Math.sin((i + 1) % edges * 2 * Math.PI / edges), 0);
            this.drawLine(p0.mul(radius).plus(center), p1.mul(radius).plus(center), color);
        }
    }
}
//# sourceMappingURL=debug.js.map