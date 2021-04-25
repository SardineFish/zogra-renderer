import { Camera } from "../engine/engine";
import { RenderObject } from "../engine/engine";
import { Light } from "../engine/engine";
import { Scene } from "../engine/engine";
import { FrameBuffer, IFrameBuffer, vec3, Vector3 } from "zogra-renderer";
import { dot } from "zogra-renderer";
import { mat4 } from "zogra-renderer";
import { Entity } from "../engine/engine";

export enum RenderOrder
{
    NearToFar,
    FarToNear,
}

export class RenderData
{
    camera: Camera;
    scene: Scene;
    cameraOutput: FrameBuffer;
    private visibleObjects: RenderObject[] = [];
    private visibleLights: Light[] = [];
    constructor(camera: Camera, output: FrameBuffer, scene: Scene)
    {
        this.camera = camera;
        this.scene = scene;
        this.cameraOutput = output;
        this.visibleLights = scene.getEntitiesOfType(Light);
        this.visibleObjects = scene.getEntitiesOfType(RenderObject);
    }
    
    getVisibleObjects(renderOrder: RenderOrder = RenderOrder.NearToFar) : ReadonlyArray<RenderObject>
    {
        const viewMat = this.camera.worldToLocalMatrix;
        let wrap = this.visibleObjects.map(obj => ({ pos: mat4.mulPoint(viewMat, obj.position), obj: obj }));
        if (renderOrder === RenderOrder.NearToFar)
            wrap = wrap.sort((a, b) => b.pos.z - a.pos.z);
        else
            wrap = wrap.sort((a, b) => a.pos.z - b.pos.z);
        return wrap.map(t => t.obj);
    }

    getVisibleLights(): ReadonlyArray<Light>
    {
        return this.visibleLights;
    }
}