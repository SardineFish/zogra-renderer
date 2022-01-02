import { Color } from "../types/color";
import { mul } from "../types/math";
import { Rect } from "../types/rect";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";
export class DebugProvider {
    drawRay(origin, dir, distance = 1, color = Color.red, overlay = false) {
        this.drawLine(origin, mul(dir, distance).plus(origin), color, overlay);
    }
    drawRect(...args) {
        let min, max, color;
        let overlay = false;
        if (args[0] instanceof Rect) {
            min = args[0].min;
            max = args[0].max;
            color = args[1] || Color.red;
            overlay = args[2] || false;
        }
        else {
            min = args[0];
            max = args[1];
            color = args[2] || Color.red;
            overlay = args[3] || false;
        }
        this.drawLine(vec2(min.x, min.y).toVec3(), vec2(max.x, min.y).toVec3(), color, overlay);
        this.drawLine(vec2(max.x, min.y).toVec3(), vec2(max.x, max.y).toVec3(), color, overlay);
        this.drawLine(vec2(max.x, max.y).toVec3(), vec2(min.x, max.y).toVec3(), color, overlay);
        this.drawLine(vec2(min.x, max.y).toVec3(), vec2(min.x, min.y).toVec3(), color, overlay);
    }
    drawLines(points, color = Color.red, overlay = false) {
        for (let i = 0; i < points.length; i++) {
            this.drawLine(points[i], points[(i + 1) % points.length], color, overlay);
        }
    }
    drawCircle(center, radius, color = Color.red, overlay = false) {
        const edges = 24;
        for (let i = 0; i < edges; i++) {
            const p0 = vec3(Math.cos(i * 2 * Math.PI / edges), Math.sin(i * 2 * Math.PI / edges), 0);
            const p1 = vec3(Math.cos((i + 1) % edges * 2 * Math.PI / edges), Math.sin((i + 1) % edges * 2 * Math.PI / edges), 0);
            this.drawLine(p0.mul(radius).plus(center), p1.mul(radius).plus(center), color, overlay);
        }
    }
}
//# sourceMappingURL=debug.js.map