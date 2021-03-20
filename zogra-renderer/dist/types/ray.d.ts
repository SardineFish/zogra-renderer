import { vec3 } from "./vec3";
export interface ray {
    origin: vec3;
    direction: vec3;
}
export declare function ray(origin: vec3, direction: vec3): ray;
