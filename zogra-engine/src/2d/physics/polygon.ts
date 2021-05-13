import { Rect, vec2 } from "zogra-renderer";

export class Polygon
{
    points: vec2[];
    bound: Rect = new Rect(vec2.zero(), vec2.zero());

    constructor(capacity = 0)
    {
        this.points = new Array();
    }

    append(vert: vec2)
    {
        this.points.push(vert);
        this.bound.min.x = Math.min(vert.x, this.bound.min.x);
        this.bound.min.y = Math.min(vert.y, this.bound.min.y);
        this.bound.max.x = Math.max(vert.x, this.bound.max.x);
        this.bound.max.y = Math.max(vert.y, this.bound.max.y);
    }
}