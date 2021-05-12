import { Camera } from "../engine";
import { RenderObject } from "../engine";
import { Scene } from "../engine";
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
    getVisibleObjects<T = RenderObject>(renderOrder?: RenderOrder, filter?: (obj: RenderObject) => boolean): ReadonlyArray<T>;
};
export declare const RenderData: {
    create<T = {}>(camera: Camera, scene: Scene, output: FrameBuffer): RenderData<T>;
};
