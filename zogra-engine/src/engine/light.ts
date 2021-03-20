import { Entity, EntityManager } from "./entity";
import { Color } from "zogra-renderer";

export enum LightType 
{
    Directional,
    Point,
}

export class Light extends Entity
{
    intensity: number = 1;
    color: Color = Color.white;
    type: LightType;
    
    constructor(type = LightType.Directional)
    {
        super();
        this.type = type;
    }
}