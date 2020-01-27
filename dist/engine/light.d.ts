import { Entity } from "./entity";
import { Color } from "../types/color";
export declare enum LightType {
    Directional = 0,
    Point = 1
}
export declare class Light extends Entity {
    intensity: number;
    color: Color;
    type: LightType;
    constructor(type?: LightType);
}
