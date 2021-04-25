import { Camera } from "../engine/engine";
import { RenderObject } from "../engine/engine";
import { Light } from "../engine/engine";
import { Scene } from "../engine/engine";
import { FrameBuffer } from "zogra-renderer";
export declare enum RenderOrder {
    NearToFar = 0,
    FarToNear = 1
}
export declare class RenderData {
    camera: Camera;
    scene: Scene;
    cameraOutput: FrameBuffer;
    private visibleObjects;
    private visibleLights;
    constructor(camera: Camera, output: FrameBuffer, scene: Scene);
    getVisibleObjects(renderOrder?: RenderOrder): ReadonlyArray<RenderObject>;
    getVisibleLights(): ReadonlyArray<Light>;
}
