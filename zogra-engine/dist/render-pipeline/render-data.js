import { RenderObject } from "../engine";
import { mat4 } from "zogra-renderer";
export var RenderOrder;
(function (RenderOrder) {
    RenderOrder[RenderOrder["NearToFar"] = 0] = "NearToFar";
    RenderOrder[RenderOrder["FarToNear"] = 1] = "FarToNear";
})(RenderOrder || (RenderOrder = {}));
export const RenderData = {
    create(camera, scene, output) {
        return {
            camera,
            scene,
            cameraOutput: output,
            visibleObjects: scene.getEntitiesOfType(RenderObject),
            getVisibleObjects(renderOrder = RenderOrder.NearToFar, filter) {
                const viewMat = this.camera.worldToLocalMatrix;
                let objects = this.visibleObjects;
                if (filter)
                    objects = objects.filter(filter);
                let wrap = objects.map(obj => ({ pos: mat4.mulPoint(viewMat, obj.position), obj: obj }));
                if (renderOrder === RenderOrder.NearToFar)
                    wrap = wrap.sort((a, b) => b.pos.z - a.pos.z);
                else
                    wrap = wrap.sort((a, b) => a.pos.z - b.pos.z);
                return wrap.map(t => t.obj);
            },
        };
    }
};
// export class RenderData<Extension = {}> extends RenderDataExtension<Extension>
// {
//     camera: Camera;
//     scene: Scene;
//     cameraOutput: FrameBuffer;
//     private visibleObjects: RenderObject[] = [];
//     private visibleLights: Light[] = [];
//     constructor(camera: Camera, output: FrameBuffer, scene: Scene)
//     {
//         this.camera = camera;
//         this.scene = scene;
//         this.cameraOutput = output;
//         this.visibleLights = scene.getEntitiesOfType(Light);
//         this.visibleObjects = scene.getEntitiesOfType(RenderObject);
//     }
//     getVisibleObjects(renderOrder: RenderOrder = RenderOrder.NearToFar) : ReadonlyArray<RenderObject>
//     {
//         const viewMat = this.camera.worldToLocalMatrix;
//         let wrap = this.visibleObjects.map(obj => ({ pos: mat4.mulPoint(viewMat, obj.position), obj: obj }));
//         if (renderOrder === RenderOrder.NearToFar)
//             wrap = wrap.sort((a, b) => b.pos.z - a.pos.z);
//         else
//             wrap = wrap.sort((a, b) => a.pos.z - b.pos.z);
//         return wrap.map(t => t.obj);
//     }
//     getVisibleLights(): ReadonlyArray<Light>
//     {
//         return this.visibleLights;
//     }
// }
//# sourceMappingURL=render-data.js.map