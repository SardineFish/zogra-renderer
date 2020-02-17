import { vec3 } from "./vec3";

export interface ray
{
    origin: vec3;
    direction: vec3;
}

export function ray(origin: vec3, direction: vec3)
{
    return { origin, direction: direction.normalized } as ray;
}