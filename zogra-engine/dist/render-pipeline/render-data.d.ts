import { Camera } from "../engine/engine";
import { RenderObject } from "../engine/engine";
import { Light } from "../engine/engine";
import { Scene } from "../engine/engine";
export declare enum RenderOrder {
    NearToFar = 0,
    FarToNear = 1
}
export declare class RenderData {
    camera: Camera;
    private visibleObjects;
    private visibleLights;
    constructor(camera: Camera, scene: Scene);
    getVisibleObjects(renderOrder?: RenderOrder): ReadonlyArray<RenderObject>;
    getVisibleLights(): ReadonlyArray<Light>;
}
