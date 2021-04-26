"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderData = exports.RenderOrder = void 0;
const engine_1 = require("../engine/engine");
const zogra_renderer_1 = require("zogra-renderer");
var RenderOrder;
(function (RenderOrder) {
    RenderOrder[RenderOrder["NearToFar"] = 0] = "NearToFar";
    RenderOrder[RenderOrder["FarToNear"] = 1] = "FarToNear";
})(RenderOrder = exports.RenderOrder || (exports.RenderOrder = {}));
exports.RenderData = {
    create(camera, scene, output) {
        return {
            camera,
            scene,
            cameraOutput: output,
            visibleObjects: scene.getEntitiesOfType(engine_1.RenderObject),
            getVisibleObjects(renderOrder = RenderOrder.NearToFar) {
                const viewMat = this.camera.worldToLocalMatrix;
                let wrap = this.visibleObjects.map(obj => ({ pos: zogra_renderer_1.mat4.mulPoint(viewMat, obj.position), obj: obj }));
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