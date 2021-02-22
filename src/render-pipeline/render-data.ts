import { Camera } from "../engine/camera";
import { RenderObject } from "../engine/render-object";
import { Light } from "../engine/light";
import { Scene } from "../engine/scene";
import { vec3, Vector3 } from "../types/vec3";
import { dot } from "../types/math";
import { mat4 } from "../types/mat4";
import { Entity } from "../engine/entity";

export enum RenderOrder
{
    NearToFar,
    FarToNear,
}

export class RenderData
{
    camera: Camera;
    private visibleObjects: RenderObject[] = [];
    private visibleLights: Light[] = [];
    constructor(camera: Camera, scene: Scene)
    {
        this.camera = camera;
        this.visibleLights = scene.getEntitiesOfType(Light);
        this.visibleObjects = scene.getEntitiesOfType(RenderObject);
    }
    
    getVisibleObjects(renderOrder: RenderOrder = RenderOrder.NearToFar) : ReadonlyArray<RenderObject>
    {
        const viewMat = this.camera.worldToLocalMatrix;
        let wrap = this.visibleObjects.map(obj => ({ pos: mat4.mulPoint(viewMat, obj.position), obj: obj }));
        if (renderOrder === RenderOrder.NearToFar)
            wrap = wrap.sort((a, b) => a.pos.z - b.pos.z);
        else
            wrap = wrap.sort((a, b) => b.pos.z - a.pos.z);
        return wrap.map(t => t.obj);
    }

    getVisibleLights(): ReadonlyArray<Light>
    {
        return this.visibleLights;
    }
}