import { Color } from "../types/color";
import { mul } from "../types/math";
import { Rect } from "../types/rect";
import { vec2 } from "../types/vec2";
import { vec3 } from "../types/vec3";

export abstract class DebugProvider
{
    abstract drawLine(start: vec3, end: vec3, color?: Color): void;
    drawRay(origin: vec3, dir: vec3, distance: number = 1, color: Color = Color.red): void
    {
        this.drawLine(origin, mul(dir, distance).plus(origin), color);
    }
    drawRect(min: vec2, max: vec2, color?: Color): void
    drawRect(rect: Rect, color?: Color): void
    drawRect(...args: [vec2, vec2, Color?] | [Rect, Color?])
    {
        let min: vec2, max: vec2, color: Color;
        if (args[0] instanceof Rect)
        {
            min = args[0].min;
            max = args[0].max;
            color = args[1] as Color || Color.red;
        }
        else
        {
            min = args[0];
            max = args[1] as vec2;
            color = args[2] as Color || Color.red;
        }

        this.drawLine(vec2(min.x, min.y).toVec3(), vec2(max.x, min.y).toVec3(), color);
        this.drawLine(vec2(max.x, min.y).toVec3(), vec2(max.x, max.y).toVec3(), color);
        this.drawLine(vec2(max.x, max.y).toVec3(), vec2(min.x, max.y).toVec3(), color);
        this.drawLine(vec2(min.x, max.y).toVec3(), vec2(min.x, min.y).toVec3(), color);
    }
    drawLines(points: vec3[], color = Color.red)
    {
        for (let i = 0; i < points.length; i++)
        {
            this.drawLine(points[i], points[(i + 1) % points.length], color);
        }
    }
    drawCircle(center: Readonly<vec3>, radius: number, color = Color.red)
    {
        const edges = 24;
        for (let i = 0; i < edges; i++)
        {
            const p0 = vec3(Math.cos(i * 2 * Math.PI / edges), Math.sin(i * 2 * Math.PI / edges), 0);
            const p1 = vec3(Math.cos((i + 1) % edges * 2 * Math.PI / edges), Math.sin((i + 1) % edges * 2 * Math.PI / edges), 0);
            this.drawLine(p0.mul(radius).plus(center), p1.mul(radius).plus(center), color);
        }
    }
}