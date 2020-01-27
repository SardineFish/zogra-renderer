import { Camera } from "../engine/camera";
import { RenderObject } from "../engine/render-object";
import { Light } from "../engine/light";
import { Scene } from "../engine/scene";
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
