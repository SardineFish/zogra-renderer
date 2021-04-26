import { Camera } from "../engine/engine";
import { RenderObject } from "../engine/engine";
import { Scene } from "../engine/engine";
import { FrameBuffer } from "zogra-renderer";
export declare enum RenderOrder {
    NearToFar = 0,
    FarToNear = 1
}
export declare type RenderData<Extension = {}> = Extension & {
    camera: Camera;
    scene: Scene;
    cameraOutput: FrameBuffer;
    visibleObjects: RenderObject[];
    getVisibleObjects(renderOrder?: RenderOrder): ReadonlyArray<RenderObject>;
};
export declare const RenderData: {
    create<T = {}>(camera: Camera, scene: Scene, output: FrameBuffer): RenderData<T>;
};
